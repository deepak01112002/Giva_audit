import { axios } from "../../helpers/axios";
import {APPROVE_SAMSUNG, DELETE_AUDIT, FETCH_PDF_DATA, FETCH_USER, GET_COMPAIGNS ,GET_REGIONS,GET_STATES,GET_CITIES} from "./InternalAdminConstant";

export const fetchUsersApi = (params) => {
  return axios.get(FETCH_USER, { params });
};

export const fetchPdfDataApi = (params) => {
  return axios.get(FETCH_PDF_DATA,{params});
};

export const getCompaignListApi = (params) => {
  return axios.get(GET_COMPAIGNS,{params});
};
export const getRegionsListApi = (params) => {
  return axios.get(GET_REGIONS,{params});
};
export const getStatesListApi = (params) => {
  return axios.get(GET_STATES,{params});
};
export const getCitiesListApi = (params) => {
  return axios.get(GET_CITIES,{params});
};

export const deleteAuditApi = (params) => {
  // console.log('delete_auditapi = ', FETCH_DELETE_AUDIT, params)
  return axios.post(`${DELETE_AUDIT}${params}`);
};

export const approveSamsungApi =(params)=> {

  return axios.post(`${APPROVE_SAMSUNG}${params}`)
}