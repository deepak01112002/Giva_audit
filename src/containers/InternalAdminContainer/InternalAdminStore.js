import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import {approve_samsung, delete_audit, fetchPdfData, fetchUsers, getCompaign, setActiveFormId, setFormCreds ,getRegions, getCities, getStates} from "../../store/InternalAdminStore/InternalAdminSlice";
import { setSelectedCategoriesIds } from "../../store/FormStore/formSlice";


const mapStateToProps = (state) => {
  
  return {
    usersDataList: state.internalAdmin.user_data_list,
    userDataLoading: state.internalAdmin.user_data_loading,
    compaignList: state.internalAdmin.compaignList,
    regionsList:state.internalAdmin.regionList,
    citiesList:state.internalAdmin.citiesList,
    statesList:state.internalAdmin.statesList,
    
  };
}; 

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchUsers: fetchUsers, setActiveFormId: setActiveFormId, fetchPdfData: fetchPdfData, setFormCreds:setFormCreds, getCompaign : getCompaign, setSelectedCategoriesIds : setSelectedCategoriesIds, delete_audit : delete_audit ,approve_samsung:approve_samsung , getRegions:getRegions, getCities:getCities, getStates:getStates}, dispatch);

const InternalAdminStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);

export default InternalAdminStore;