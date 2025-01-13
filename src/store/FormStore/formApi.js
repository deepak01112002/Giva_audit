import { axios, axiosFile } from "../../helpers/axios";
import { getCookie } from "../../helpers/cookies";
import {
  SUBMIT_AUDIT_DATA,
  UPDATE_AUDIT_DATA,
} from "../InternalAdminStore/InternalAdminConstant";
// import axios from "axios";
import {
  GET_ALL_CATEGORY_DATA,
  GET_ALL_SUB_CATEGORY_DATA,
  GET_FORM_DATA,
  GET_STORE_DATA,
  UPLOAD_FILE_API,
  FETCH_SUBMITTED_DATA,
} from "./formConstant";

export const getFormDataApi = async (params) => {
  return axios.get(GET_FORM_DATA, { params });
};

export const fetchSubmittedDataApi = async (params) => {
  return axios.get(FETCH_SUBMITTED_DATA, { params });
}

export const getStoreDataApi = async () => {
  return axios.get(GET_STORE_DATA);
};
export const getAllCategoryApi = async () => {
  return axios.get(GET_ALL_CATEGORY_DATA);
};
export const getAllSubCategoryApi = async (params) => {
  return axios.get(GET_ALL_SUB_CATEGORY_DATA, { params });
};

export const submitFormDataApi = async (payload) => {
  return axios.post(SUBMIT_AUDIT_DATA, payload);
};

export const updateAuditData = (payload) => {
  return axios.post(UPDATE_AUDIT_DATA, payload);
};

export const uploadFileApi = (payload) => {
  return axiosFile.post(UPLOAD_FILE_API, payload);
};

export const getOptions = async (payload) => {
  let categoryIds = getCookie('categoryIds');
		let categoryIdsParsed =JSON.parse(categoryIds);
   let params= {
      category_id : categoryIdsParsed.selectedCategorary,
    }
  
  if (payload && payload.host) {
    let res = await  axios.get("https://product.infield.co.in:8092" + payload.path,{params});
    return {res : res, api : payload.path}
  } else {
    return;
  }
};
