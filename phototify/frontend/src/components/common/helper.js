import store from "../../Redux/store";

export const getDate = date_time => {
  return date_time.split("T")[0];
};

export const getConfigHeader = () => {
  const config = {
    headers: {
      "content-type": "application/json"
    }
  };
  if (!store.getState().auth) {
    return config;
  }
  let token = store.getState().auth.token;
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};

export const getConfigHeaderToken = () => {
  const config = {
    headers: {
      "content-type": "application/json"
    }
  };
  let token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};
