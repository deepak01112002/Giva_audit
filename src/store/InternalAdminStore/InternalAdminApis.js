import { axios } from "../../helpers/axios";
import { FETCH_PDF_DATA, FETCH_USER, GET_COMPAIGNS } from "./InternalAdminConstant";

export const fetchUsersApi = (params) => {
  return axios.get(FETCH_USER, { params });
};

export const fetchPdfDataApi = (params) => {
  return axios.get(FETCH_PDF_DATA,{params});
};

export const getCompaignListApi = (params) => {
  return axios.get(GET_COMPAIGNS,{params});
};

