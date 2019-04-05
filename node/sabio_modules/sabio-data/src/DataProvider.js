const ConnectionPool = require("tedious-connection-pool");
const config = require("dotenv");
const { TYPES } = require("tedious");
const databaseRequest = require("./databaseRequest");
const debug = require("debug");
const chalk = require("chalk");
/* For Help:
  http://tediousjs.github.io/tedious/parameters.html

  https://github.com/tediousjs/tedious

  TYPES
  http://tediousjs.github.io/tedious/api-datatypes.html
*/

config.config();

const poolErrors = debug("sabio:data:pool");

class DataProvider {
  constructor(connString, opts) {
    this.pool = DataProvider.configurePool(connString, opts);
  }
  executeProc(
    procName,
    inputParamMapper,
    singleRecordMapper,
    returnParameters
  ) {
    const onCompleteCallback = null;

    return new Promise((resolve, reject) => {
      this.pool.acquire(onAcquire);

      function onAcquire(err, targetConnection) {
        if (err) {
          reject(err);
          return;
        }
        databaseRequest(
          resolve,
          reject,
          onCompleteCallback,
          targetConnection,
          procName,
          inputParamMapper,
          singleRecordMapper,
          returnParameters,
          null
        );
      }
    });
  }

  executeNonQuery(
    procName,
    inputParamMapper,
    returnParameters,
    onCompleteCallback
  ) {
    this.pool.acquire(onPoolAcquired);
    // let cmdModifier = null;
    function onPoolAcquired(err, targetConnection) {
      if (err) {
        onCompleteCallback(err, null);
        return;
      }
      databaseRequest(
        null,
        null,
        onCompleteCallback,
        targetConnection,
        procName,
        inputParamMapper,
        null,
        returnParameters,
        null
      );
    }
  }

  executeCmd(
    procName,
    inputParamMapper,
    singleRecordMapper,
    returnParameters,
    onCompleteCallback
  ) {
    this.pool.acquire(onPoolAcquired);
    // let cmdModifier = null;
    function onPoolAcquired(err, targetConnection) {
      if (err) {
        onCompleteCallback(err, null);
        return;
      }
      databaseRequest(
        null,
        null,
        onCompleteCallback,
        targetConnection,
        procName,
        inputParamMapper,
        singleRecordMapper,
        returnParameters,
        null
      );
    }
  }

  static configurePool(connectionString, opts) {
    opts = opts || {};
    const connString = connectionString || process.env.SQL_ConnectionString;
    const poolConfig = {
      min: opts.SQL_POOL_MIN || process.env.SQL_POOL_MIN || 1,
      max: opts.SQL_POOL_MAX || process.env.SQL_POOL_MAX || 2,
      log: true
    };
    const conObject = {};

    connString.split(";").forEach(function(part) {
      const segments = part.split("=");
      conObject[segments[0]] = segments[1];
    });

    const connectionConfig = {
      server: conObject["Data Source"],
      userName: conObject["User ID"],
      password: conObject.Password,
      options: {
        database: conObject["Initial Catalog"],
        instanceName: opts.SQL_INSTANCE_NAME || process.env.SQL_INSTANCE_NAME,
        camelCaseColumns: true
      }
    };
    poolErrors("Using Config");
    poolErrors(chalk.blue(JSON.stringify(connectionConfig, null, 2)));

    const pool = new ConnectionPool(poolConfig, connectionConfig);

    pool.on("error", err => {
      poolErrors("Error in data provider");
      poolErrors(err.message);
    });

    return pool;
  }
}

const dataProvider = new DataProvider();

module.exports = { dataProvider, TYPES };
