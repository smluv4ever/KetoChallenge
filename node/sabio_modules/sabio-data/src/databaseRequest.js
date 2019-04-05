const { Request } = require("tedious");
const { ERRORS } = require("./dataHelpers");
const camelCase = require("camelcase");
const debug = require("debug");

const debugReq = debug("sabio:data:request");

module.exports = function databaseRequest(
  resolve,
  reject,
  onCompleteCallback,
  conn,
  procName,
  inputParamMapper,
  singleRecordMapper,
  returnParameters,
  cmdModifier
) {
  let setIndex = -1; // incremented within onRecordSetReceived
  const validResultSets = {};
  let globalError = false;
  let errMessage = null;
  const isPromiseBased = resolve && reject;
  const response = { resultSetCount: 0 };

  debugReq(`DatabaseRequest called for ${procName}`);

  const request = new Request(procName, onRequestCompleted);

  if (cmdModifier) {
    cmdModifier();
  }

  if (inputParamMapper) {
    inputParamMapper(request);
  }

  if (singleRecordMapper) {
    request.on("row", onRowReceived);
  }
  request.on("returnValue", onReturnParamValueReceived);
  request.on("columnMetadata", onRecordSetReceived);
  request.on("doneProc", onStoredProcDone);

  conn.callProcedure(request);

  function onRowReceived(columns) {
    debugReq("onRowReceived", columns);
    if (globalError) {
      return;
    }
    const isGoodRecord =
      typeof validResultSets[setIndex.toString()] === "undefined"
        ? verifyRecord(columns)
        : validResultSets[setIndex.toString()];

    validResultSets[setIndex.toString()] = isGoodRecord;

    if (!isGoodRecord) {
      globalError = true;

      if (reject) {
        reject(`${ERRORS.DUPNAMES} in set ${setIndex}`);
      } else {
        errMessage = errMessage || "";
        errMessage += ` ${ERRORS.DUPNAMES} in set ${setIndex} `;
      }
      return;
    }
    response.resultSets = response.resultSets || [];
    response.resultSets[setIndex] = response.resultSets[setIndex] || [];

    const row = {};
    columns.map((column, ordina) => mapColumnsToRow(column, ordina, row));
    response.resultSets[setIndex].push(row);

    if (singleRecordMapper) {
      singleRecordMapper(row, setIndex);
    }
  }

  function mapColumnsToRow(column, ordinal, row) {
    const colName = column.metadata.colName ? column.metadata.colName : ordinal;

    if (typeof row[colName] !== "undefined") {
      return;
    }
    if (column.value === null) {
      row[colName] = null;
    } else {
      row[colName] = column.value;
    }
  }

  function onReturnParamValueReceived(paramName, value, metadata) {
    debugReq(`onReturnParamValueReceived ${paramName} = ${value}`);

    const name = camelCase(paramName);
    response.outputParameters = response.outputParameters || {};
    response.outputParametersMetaData = response.outputParametersMetaData || {};

    response.outputParameters[name] = value;
    response.outputParametersMetaData[name] = metadata;
  }

  function onRequestCompleted(err, rowcount) {
    conn.release();
    response.totolRecords = rowcount;
    // for promises
    if (isPromiseBased) {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
      return;
    }

    // if we have not encounterd an error AND we can pass back outputParameters
    if (!globalError && returnParameters && response.outputParameters) {
      returnParameters(response.outputParameters);
    }

    if (globalError && !err) {
      onCompleteCallback(
        "Error an ecountered during the processing of the request:" +
          errMessage,
        rowcount
      );
    } else {
      // callbacks will be invoked as expected in env: err first
      onCompleteCallback(err, response);
    }
  }
  function onStoredProcDone(rowCount, more, returnStatus, rows) {
    response.returnStatus = returnStatus;
    response.storedProcDoneData = {
      rowCount,
      more,
      rows
    };
  }
  function onRecordSetReceived() {
    response.resultSetCount++;
    setIndex++;
  }
  function verifyRecord(columns) {
    let isGood = true;
    const names = {};
    for (let index = 0; index < columns.length; index++) {
      const column = columns[index];
      const colName = column.metadata.colName ? column.metadata.colName : index;
      if (names[colName]) {
        // this flag to keep the singleRecordMapper from being called
        isGood = false;
        break;
      }
      names[colName] = true;
    }
    return isGood;
  }
};
