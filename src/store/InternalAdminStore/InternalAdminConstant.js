

//let client_code = data?.data?.client_code ? data?.data?.client_code : 'sleep' ;

let client_code = 'samsungvm';

// export const FETCH_USER = '/titan/fetchUsers'
export const FETCH_USER =`/${client_code}/fetchUsers`

export const FETCH_SUBMITTED_DATA =`/${client_code}/fetchSubmittedData`

// export const FETCH_PDF_DATA = '/titan/generatepdf'
export const FETCH_PDF_DATA = `/${client_code}/generatepdf`

//export const UPDATE_AUDIT_DATA = '/titan/updateAuditData'
export const UPDATE_AUDIT_DATA = `/${client_code}/updateAuditData`

//export const SUBMIT_AUDIT_DATA = '/titan/submitTabData'
export const SUBMIT_AUDIT_DATA = `/${client_code}/submitTabData`


// delete audit endpoint
export const DELETE_AUDIT = `/${client_code}/deleteAudit/`

//approve samsung endpoint 
export const APPROVE_SAMSUNG= `/${client_code}/approveAudit/`

//export const GET_COMPAIGNS = '/titan/getCampaigns'
export const GET_COMPAIGNS = `/${client_code}/getCampaigns`


//export const GET_STATES = '/samsungvm/getStates'
export const GET_STATES = `/${client_code}/getStates`

//export const GET_REGIONS = '/samsungvm/getRegions'
export const GET_REGIONS = `/${client_code}/getRegions`

//export const GET_CITIES = '/samsungvm/getCities'
export const GET_CITIES = `/${client_code}/getCities`


