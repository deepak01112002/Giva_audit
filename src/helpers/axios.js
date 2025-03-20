import * as coreAxios from 'axios';
import { baseURL } from './constants';
// import { getCookie, signout } from "./cookies";

export const axios = coreAxios.default.create({
  baseURL: baseURL,
});

export const axiosFile = coreAxios.default.create({
  baseURL: baseURL,
  headers: {
    'content-type': 'multipart/form-data',
    // Authorization: `BEARER ${getCookie("token")}`,
  },
});

// const axiosInterceptor = (dispatch) => {
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    let user = JSON.parse(localStorage.getItem('user'));
    let usernme = user?.data?.username;
    if (usernme) {
      config.params = { ...config.params, username: usernme };
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
axiosFile.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    let user = JSON.parse(localStorage.getItem('user'));
    let usernme = user?.data?.username;
    if (usernme) {
      config.params = { ...config.params, username: usernme };
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    const { method } = response.config;
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response erro
    // console.log(error);
    // alert(error?.response?.data?.message || error.message);

    return Promise.reject(error);
    // return false;
  }
);
axiosFile.interceptors.response.use(
  function (response) {
    const { method } = response.config;
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response erro
    // console.log(error);
    // alert(error?.response?.data?.message || error.message);

    return Promise.reject(error);
    // return false;
  }
);

// };

// export default axiosInterceptor;
