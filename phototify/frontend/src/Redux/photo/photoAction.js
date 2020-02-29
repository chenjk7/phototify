import {
  GET_HOMEFEED,
  LOADING_HOMEFEED,
  LOADING_COMMENTS,
  GET_COMMENTS,
  UPLOAD_PHOTO,
  GET_MORE_HOMEFEED,
  GET_HOMEFEED_USER,
  PHOTO_SEARCHTEXT
} from "./photoType";
import axios from "axios";
import { setConfig } from "../auth/authAction";

export const getHomefeed = fetchUrl => (dispatch, getState) => {
  dispatch({
    type: LOADING_HOMEFEED
  });
  const config = setConfig(getState);
  console.log("homefeed ", config);

  axios
    .get(fetchUrl, config)
    .then(res => {
      console.log(res.data);

      dispatch({
        type: GET_HOMEFEED,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const getHomefeedUser = username => (dispatch, getState) => {
  const config = setConfig(getState);
  axios
    .get(`/api/auth/getUserByUsername?username=${username}`, config)
    .then(res => {
      dispatch({
        type: GET_HOMEFEED_USER,
        payload: res.data
      });
    });
};
export const getMoreHomefeed = fetchUrl => (dispatch, getState) => {
  dispatch({
    type: LOADING_HOMEFEED
  });
  const config = setConfig(getState);
  console.log("homefeed ", config);

  axios
    .get(fetchUrl, config)
    .then(res => {
      console.log(res.data);

      dispatch({
        type: GET_MORE_HOMEFEED,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const getPhotoComments = photoId => (dispatch, getState) => {
  dispatch({
    type: LOADING_COMMENTS
  });
  const config = setConfig(getState);

  axios
    .get(`api/photo/${photoId}/getPhotoCommentlists/`, config)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_COMMENTS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const uploadPhotos = (photos, photoInfo) => (dispatch, getState) => {
  const config = setConfig(getState, "Img_file");
  Array.from(photos).forEach((photo, index) => {
    let title = "",
      description = "";
    if (typeof photoInfo[index] !== "undefined" || photoInfo[index] != null) {
      console.log(" array from");

      ({ title, description } = photoInfo[index]);
      console.log("data ", title, description);
      title = title == "undefined" ? title : "";
      description = typeof description == "undefined" ? description : "";
      ({ title, description } = photoInfo[index]);
    }
    console.log(photo);

    // const body = {
    //   name: title,
    //   description: description,
    //   photo: photo
    // };

    // axios
    //   .post(`/api/photo/`, body, config)
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(err => {
    //     console.log(err.response.data);
    //   });

    var xhr = new XMLHttpRequest();
    xhr.open("GET", photo, true);
    xhr.responseType = "blob";
    xhr.send();
    xhr.onload = function(e) {
      if (this.status == 200) {
        var myBlob = this.response;
        // myBlob is now the blob that the object URL pointed to.
        // let fileReader = new FileReader();

        // fileReader.readAsArrayBuffer(myBlob);

        // fileReader.onload = function(event) {
        //   let arrayBuffer = fileReader.result;
        console.log(myBlob);
        let file = new File([myBlob], "file_name.jpg", {
          lastModified: 1534584790000,
          type: "image/jpeg"
        });
        console.log("file ->", file);
        // let fileReader = new FileReader();

        // fileReader.readAsArrayBuffer(myBlob);

        // fileReader.onload = function(event) {
        //   let arrayBuffer = fileReader.result;
        //   console.log(arrayBuffer);

        // const body = {
        //   name: title,
        //   description: description,
        //   photo: file
        // };
        let formData = new FormData();

        formData.append("name", title);
        formData.append("description", description);
        formData.append("photo", file);
        console.log("formData ", formData.get("name"));

        axios
          .post(`/api/photo/`, formData, config)
          .then(res => {
            console.log("upload-> ", res.data);
            dispatch({
              type: UPLOAD_PHOTO,
              payload: res.data
            });
          })
          .catch(err => {
            console.log(err.response);
          });
      }
    };
  });
};

export const updateSearchText = text => dispatch => {
  dispatch({
    type: PHOTO_SEARCHTEXT,
    payload: text
  });
};
