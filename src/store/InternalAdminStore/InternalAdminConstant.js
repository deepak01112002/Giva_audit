

let data  = JSON.parse(localStorage.getItem("user"));
//let client_code = data?.data?.client_code ? data?.data?.client_code : 'sleep' ;

let client_code = 'samsungvm';

// export const FETCH_USER = '/titan/fetchUsers'
export const FETCH_USER =`/${client_code}/fetchUsers`

// export const FETCH_PDF_DATA = '/titan/generatepdf'
export const FETCH_PDF_DATA = `/${client_code}/generatepdf`

//export const UPDATE_AUDIT_DATA = '/titan/updateAuditData'
export const UPDATE_AUDIT_DATA = `/${client_code}/updateAuditData`

//export const SUBMIT_AUDIT_DATA = '/titan/submitTabData'
export const SUBMIT_AUDIT_DATA = `/${client_code}/submitTabData`


// delete audit endpoint
export const DELETE_AUDIT = `/${client_code}/deleteAudit/`

//approve samsung endpoint 
export const APPROVE_SAMSUNG= `/${client_code}/`

//export const GET_COMPAIGNS = '/titan/getCampaigns'
export const GET_COMPAIGNS = `/${client_code}/getCampaigns`


