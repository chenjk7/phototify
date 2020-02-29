import React, { Component } from "react";
import PropTypes from "prop-types";
import { applyMiddleware } from "redux";
import { Link, Redirect } from "react-router-dom";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { uploadPhotos } from "../../Redux/photo/photoAction";

class PhotoUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: [],
      initPanel: true,
      redirect: false,
      imgInfo: [],
      title: "",
      description: "",
      index: 0,
      photoCardClass: "btn photo-upload-img-container"
    };
  }
  onFileChosen = event => {
    let img = [];
    let URL = window.URL || window.webkitURL;

    console.log(event.target.files);
    if (event.target.files) {
      Array.from(event.target.files).forEach(element => {
        img.push(URL.createObjectURL(element));
      });

      this.setState({ img: [...this.state.img, ...img] });
      if (this.state.initPanel) {
        this.setState({ initPanel: false });
      }
    }
  };
  onUploadCancel = () => {
    // location.href = "/manage/upload";
    // this.props.history.push("/manage/upload");
    this.setState({
      img: [],
      initPanel: true,
      title: "",
      description: "",
      index: 0
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/manage/upload" />;
    }
  };
  removeUploadedFile = index => {
    const img = [...this.state.img];
    img.splice(index, 1);
    const imgInfo = [...this.state.imgInfo];
    imgInfo.splice(index, 1);

    console.log(index, img.length, this.state.index);

    this.setState(
      {
        img: img,
        imgInfo: imgInfo
      },
      () => {
        console.log(index, img.length, this.state.index);
        if (index === img.length && index === this.state.index) {
          console.log("last index");
          this.setState({ index: img.length - 1 });
          this.onPhotoClick(img.length - 1);
        } else {
          this.onPhotoClick(this.state.index);
        }
        // this.setState({
        //   title: "",
        //   description: ""
        // });
      }
    );
  };
  onPhotoClick = index => {
    console.log("onPhotoClick-> ", index);
    let photoinfo = this.state.imgInfo[index];
    this.setState({ index: index });

    if (photoinfo) {
      this.setState({
        title: photoinfo.title,
        description: photoinfo.description
      });
    } else {
      this.setState({
        title: "",
        description: "",
        index: index
      });
    }
  };
  onDescriptionChange = e => {};
  onPhotoInfoChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value }, () => {
      let imgInfo = this.state.imgInfo;
      imgInfo[this.state.index] = {
        title: this.state.title,
        description: this.state.description
      };
      this.setState({ imgInfo: imgInfo });
    });
  };
  addMorePhotos = () => {
    this.fileInput.click();
  };
  onUploadSubmit = async e => {
    const { user } = this.props;
    e.preventDefault();
    console.log(" photos uploading ");
    // await this.props.uploadPhotos(this.state.img, this.state.imgInfo);
    // window.location.href = `/#/${user.user.username}`;
    await this.props.uploadPhotos(this.state.img, this.state.imgInfo);
    window.location.href = `/#/${user.user.username}`;

    // let p = new Promise((resolve, reject) => {
    //   this.props.uploadPhotos(this.state.img, this.state.imgInfo);
    // });
    // p.then((window.location.href = `/#/${user.user.username}`));
  };
  async uploadFiles() {}
  render() {
    let photo_upload_input = "photo-upload-input";
    let Photo_upload_container = "";
    if (!this.state.initPanel) {
      photo_upload_input = "photo-upload-input-hidden";
      Photo_upload_container = (
        <div className="photo-upload-box">
          <div className="photo-upload-pgrid">
            <button
              onClick={this.addMorePhotos}
              className="btn btn-secondary photo-upload-img-add"
            >
              +
            </button>
            {this.state.img.map((img, index) => {
              let photoCardClass = "btn photo-upload-img-container";
              if (this.state.index === index) {
                photoCardClass = "btn photo-upload-img-container-select";
              }
              return (
                <button
                  className={
                    this.state.index == index
                      ? "btn photo-upload-img-container-select"
                      : "btn photo-upload-img-container"
                  }
                  key={index}
                >
                  <img
                    onClick={() => this.onPhotoClick(index)}
                    className="photo-upload-img"
                    src={img}
                    alt=""
                  />
                  <div className="photo-upload-img-close">
                    <i
                      onClick={() => this.removeUploadedFile(index)}
                      className="fas fa-times fa-2x"
                    ></i>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="photo-upload-pinfo">
            <h4>Photo selected</h4>
            <div className="photo-upload-license-headers">
              <i className="far fa-image fa-1x"></i>
              <span>License this photo</span>
              <div>
                <small>Upload for my photos with Phototify Licensing</small>
              </div>
            </div>
            <div className="form-group photo-upload-infoform">
              <label className="col-form-label" htmlFor="inputDefault">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Photo title e.g. Amazing photo taken"
                id="title"
                name="title"
                onChange={this.onPhotoInfoChange}
                value={this.state.title}
              />
              <label className="col-form-label" htmlFor="inputDefault">
                Description
              </label>
              <textarea
                type="text"
                className="form-control"
                placeholder="e.g. Great landscape photo taken during vacation, beautiful views"
                id="description"
                name="description"
                onChange={this.onPhotoInfoChange}
                value={this.state.description}
              />
            </div>

            <div className="photo-upload-infoform-btn">
              <button
                onClick={this.onUploadCancel}
                type="button"
                className="btn btn-outline-danger PhotoComments-comment-action-cancel"
              >
                Cancel
              </button>
              <button
                onClick={this.onUploadSubmit}
                type="button"
                className="btn btn-primary ml-2 "
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="photo-upload-container">
        <div className="photo-upload-banner">
          <h4>Upload</h4>
        </div>
        {Photo_upload_container}
        <div className={photo_upload_input}>
          <div className="alert alert-light photo-upload-header">
            <button type="button" className="close" data-dismiss="alert">
              &times;
            </button>
            <strong>Attention!</strong> Click "Select photos to upload"
          </div>
          <br />
          <div>
            <i className="fas fa-arrow-up fa-2x"></i>
          </div>
          <input
            style={{ display: "none" }}
            onChange={this.onFileChosen}
            type="file"
            multiple="multiple"
            name="img"
            id="img"
            accept="image/*"
            ref={fileInput => (this.fileInput = fileInput)}
          />

          <h6>Upload photos</h6>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => this.fileInput.click()}
          >
            Select photos
          </button>
        </div>
      </div>
    );
  }
}

PhotoUpload.propTypes = {};
const mapDispatchToProps = dispatch => {
  return {
    uploadPhotos: (photos, photoInfo) =>
      dispatch(uploadPhotos(photos, photoInfo))
  };
};
const mapStateToProp = state => {
  return {
    user: state.auth.user
  };
};
export default connect(mapStateToProp, mapDispatchToProps)(PhotoUpload);
