import axios from "axios";

window.axios = axios;

window.axios.defaults.baseURL = "http://localhost:5000";

const api_token = "9TECH_api_token";

const setAxiosHeader = (token) => {
  if (token) {
    window.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete window.axios.defaults.headers.common.Authorization;
  }
};

export const setToken = (token) => {
  localStorage.setItem(api_token, token);
  setAxiosHeader(token);
};

export const getToken = () => {
  return localStorage.getItem(api_token);
};

export const removeToken = () => {
  localStorage.removeItem(api_token);
  delete window.axios.defaults.headers.common.Authorization;
};

if (getToken()) {
  window.axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${getToken()}`;
  window.axios.interceptors.response.use(
    (r) => r,
    (error) => {
      if (error.status === 403) {
        removeToken();
        console.log("Token inválido");
      }
      return Promise.reject(error);
    },
  );
}
