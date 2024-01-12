import * as coreAxios from "axios";
import { getCookie, signout } from "./cookies";
import { baseUrl } from "./constants";
import { setSnackBar } from "../store/common/commonSlice";

export const axios = coreAxios.default.create({
  baseURL: baseUrl,
  headers: {
   common: {
      Authorization: `BEARER ${getCookie("token")}`,
    },
   
  },
});

const axiosInterceptor = (dispatch) => {
  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
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
    
      if (method !== "get") {
        if(response.config.url === "/organization/verify" || response.config.url === "/developer/npi" ) {

          dispatch(
            setSnackBar({
              open: true,
              message: response?.data?.message || "success",
              severity: "info",
            })
          );

        }
        else if(response.config.url === "/organization/get" ) {

         

        }
        else{

          dispatch(
            setSnackBar({
              open: true,
              message: response?.data?.message || "success",
              severity: "success",
            })
          );

        }
       
      }
      return response.data;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response erro
      // console.log(error);
      // alert(error?.response?.data?.message || error.message);
      dispatch(
        setSnackBar({
          open: true,
          message: error?.response?.data?.message || error.message,
          severity: "error",
        })
      );

      if (error.response?.status === 403) {
        const refreshToken = async () => {
          try {
            signout(() => window.location.reload());
          } catch (error) {
            dispatch(
              setSnackBar({
                open: true,
                message: "Failed to Logout the user.",
                severity: "error",
              })
            );
          }
        };
        refreshToken();
      }

      return Promise.reject(error);
      // return false;
    }
  );
};

export default axiosInterceptor;
