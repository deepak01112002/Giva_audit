
let data  = JSON.parse(localStorage.getItem("user"));
let client_code = 'samsungvm' ;



export const GET_FORM_DATA = `/${client_code}/get_config`

export const GET_STORE_DATA = `/${client_code}/getAllStores`
export const GET_ALL_CATEGORY_DATA = `/${client_code}/getAllCategories`
export const GET_ALL_SUB_CATEGORY_DATA = `/${client_code}/getAllSubCategories`

export const SUBMIT_FORM_DATA_API = `/${client_code}/submitTabData`
export const UPLOAD_FILE_API = '/docs/upload'

