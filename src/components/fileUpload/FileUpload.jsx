import React from "react";
import * as FileUploadService from "../../services/FileUploadService";
import swal from "sweetalert";
import Dropzone from "react-dropzone";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  base64StringtoFile,
  downloadBase64File,
  image64toCanvasRef,
  extractImageFileExtensionFromBase64
} from "./ReusableUtilities";

const imageMaxSize = 1000000000; //currently about 1gb
const acceptedFileTypes =
  "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
const acceptedFileTypesTypesArray = acceptedFileTypes.split(",").map(item => {
  return item.trim();
});

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.imagePreviewCanvasRef = React.createRef();
    this.state = {
      files: [],
      imgSrc: null,
      imgSrcExt: null,
      currentFile: null,
      croppedFile: false,
      crop: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      btnDisplay: true,
      imageDisplay: false,
      isImage: false,
      disableDrop: false,
      isLoading: "Please wait while we upload your file"
    };
  }

  verifyFile = files => {
    if (files && files.length > 0) {
      const currentFile = files[0];
      const currentFileType = currentFile.type;
      const currentFileSize = currentFile.size;
      if (currentFileSize > imageMaxSize) {
        swal(
          "oops",
          "This file is not allowed. " +
            currentFileSize +
            " bytes is too large",
          "error"
        );
        return false;
      }

      if (acceptedFileTypesTypesArray.includes(currentFileType)) {
        this.setState({ isImage: true });
      }
      return true;
    }
  };

  handleOnDrop = (files, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      this.verifyFile(rejectedFiles);
    }
    if (files && files.length > 0) {
      const isVerified = this.verifyFile(files);
      const currentFile = files[0];
      if (isVerified && this.state.isImage) {
        // imageBase64Data
        const myFileItemReader = new FileReader();
        myFileItemReader.addEventListener(
          "load",
          () => {
            this.setState({
              currentFile: currentFile,
              imgSrc: myFileItemReader.result,
              imgSrcExt: extractImageFileExtensionFromBase64(
                myFileItemReader.result
              )
            });
          },
          false
        );
        myFileItemReader.readAsDataURL(currentFile);
      } else {
        this.setState({ currentFile: currentFile });
      }
    }
  };

  handleOnCropChange = crop => {
    this.setState({ crop: crop });
  };

  handleOnCropComplete = (crop, pixelCrop) => {
    const canvasRef = this.imagePreviewCanvasRef.current;
    const { imgSrc } = this.state;
    image64toCanvasRef(canvasRef, imgSrc, pixelCrop);
    this.setState({ imgSrc: imgSrc, croppedFile: true, btnDisplay: false });
  };

  handleDownloadClick = event => {
    event.preventDefault();
    const { imgSrc } = this.state;
    if (imgSrc) {
      const canvasRef = this.imagePreviewCanvasRef.current;
      const { imgSrcExt } = this.state;
      const imageData64 = canvasRef.toDataURL("image/" + imgSrcExt);
      const myFileName = "previewFile." + imgSrcExt;
      downloadBase64File(imageData64, myFileName);
    }
  };

  handleUploadClick = () => {
    const { currentFile } = this.state;
    const { imgSrc } = this.state;
    const data = new FormData();

    if (imgSrc) {
      const { croppedFile } = this.state;
      const { imgSrcExt } = this.state;
      const canvasRef = this.imagePreviewCanvasRef.current;
      const imageData64 = canvasRef.toDataURL("image/" + imgSrcExt);
      const newFile = base64StringtoFile(imageData64, currentFile.name);
      if (croppedFile) {
        data.append("files", newFile);
      } else {
        data.append("image", currentFile);
      }
    } else {
      data.append("image", currentFile);
    }
    this.setState({
      disableDrop: true
    });
    FileUploadService.PostFile(data)
      .then(this.uploadSuccess)
      .catch(this.onError);
    this.handleClearToDefault();
  };

  uploadSuccess = () => {
    swal({
      title: "File Uploaded",
      icon: "success",
      timer: 1425,
      buttons: false,
      className: "swal-footer"
    });
    this.setState({
      disableDrop: false
    });
  };

  onError = error => {
    swal({
      title: "File was not uploaded",
      icon: "error",
      timer: 1425,
      buttons: false,
      className: "swal-footer"
    });
    console.error(error);
    this.setState({
      disableDrop: false
    });
  };

  handleDisplayImage = () => {
    this.setState({ imageDisplay: true });
  };

  handleClearToDefault = () => {
    if (this.state.imgSrc) {
      const canvas = this.imagePreviewCanvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    this.setState({
      files: [],
      imgSrc: null,
      imgSrcExt: null,
      currentFile: null,
      croppedFile: false,
      crop: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      btnDisplay: true,
      imageDisplay: false,
      isImage: false,
      disabledDrop: false
    });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Upload File</h1>
        {this.state.currentFile !== null ? (
          <div>
            <p>{this.state.currentFile.name}</p>
            {this.state.isImage && (
              <div>
                <ReactCrop
                  src={this.state.imgSrc}
                  crop={this.state.crop}
                  onComplete={this.handleOnCropComplete}
                  onChange={this.handleOnCropChange}
                />
                <br />
                <p>Click on image to crop</p>
                <p>Preview Canvas Crop</p>
                <canvas
                  ref={this.imagePreviewCanvasRef}
                  className="cropped-image"
                />
              </div>
            )}
            <br />
            <button onClick={this.handleUploadClick} className="btn tg-btn m-1">
              Upload to Server
            </button>
            <button
              onClick={this.handleDownloadClick}
              className="btn tg-btn m-1"
              hidden={this.state.btnDisplay}
            >
              Download Cropped Image
            </button>
            <button
              onClick={this.handleClearToDefault}
              className="tg-btn-red m-1"
            >
              Clear
            </button>
          </div>
        ) : (
          <Dropzone
            onDrop={this.handleOnDrop}
            multiple={false}
            maxSize={imageMaxSize}
            disabled={this.state.disableDrop}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                Click Here{" "}
                <span>
                  <i className="fa fa-download icon-cog" aria-hidden="true" />{" "}
                </span>
                to Select File or Drag & Drop Here
                <div>
                  {this.state.disableDrop && <p>{this.state.isLoading}</p>}
                </div>
              </div>
            )}
          </Dropzone>
        )}
      </React.Fragment>
    );
  }
}

export default FileUpload;
