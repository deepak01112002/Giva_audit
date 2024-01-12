import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { fetchPdfData, fetchUsers, getCompaign, setActiveFormId, setFormCreds } from "../../store/InternalAdminStore/InternalAdminSlice";


const mapStateToProps = (state) => {
  
  return {
    usersDataList: state.internalAdmin.user_data_list,
    userDataLoading: state.internalAdmin.user_data_loading,
    compaignList: state.internalAdmin.compaignList,


    
  };
}; 

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchUsers: fetchUsers, setActiveFormId: setActiveFormId, fetchPdfData: fetchPdfData, setFormCreds:setFormCreds, getCompaign : getCompaign }, dispatch);

const InternalAdminStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);

export default InternalAdminStore;