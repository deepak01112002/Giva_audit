import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import {
  getFormData,
  submitFormData,
  updateFormData,
  uploadFile,
} from "../../store/FormStore/formSlice";
import {
  fetchSubmitData,
  getCompaign,
  setFormCreds,
} from "../../store/InternalAdminStore/InternalAdminSlice";

const mapStateToProps = (state) => {
  console.log('state statestate', state)
  return {
    form_data: state.formData.form_data,
    formDataLoading: state.formData.form_data_loading,
    fetchSubmitDataLoading: state.internalAdmin.submitDataLoading,
    fetchSubmitData: state.internalAdmin.submitData,
    userID: state.internalAdmin.userID,
    formID: state.internalAdmin.formID,
    defaultFormDataLoading: state.internalAdmin.submitDataLoading,
    storeCreds: state.formData.storeCreds,
    updateFormDataLoading: state.formData.update_form_data_isLoading,
    submitFormDataIsLoading: state.formData.submit_form_data_isLoading,
    uploadedFileData: state.formData.uploaded_file_data,
    fileUploadLoading: state.formData.file_upload_loading,
    extraValues: state.formData.extraValues,
    selectedCategoriesIds: state.formData.selectedCategoriesIds,
    compaignList: state.internalAdmin.compaignList,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getFormData: getFormData,
      submitFormData: submitFormData,
      getSubmitData: fetchSubmitData,
      setFormCreds: setFormCreds,
      updateFormData: updateFormData,
      uploadFile: uploadFile,
      getCompaign : getCompaign, 
    },
    dispatch
  );

const FormStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);

export default FormStore;
