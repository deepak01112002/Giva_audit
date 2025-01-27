import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { fetchPdfData } from "../../store/InternalAdminStore/InternalAdminSlice";


const mapStateToProps = (state) => {
  return {
    pdfData: state.internalAdmin.pdfData,
    pdfDataLoading: state.internalAdmin.pdfDataLoading,
    userID: state.internalAdmin.userID,
    formID: state.internalAdmin.formID
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({fetchPdfData:fetchPdfData}, dispatch);

const ResultStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);

export default ResultStore;
