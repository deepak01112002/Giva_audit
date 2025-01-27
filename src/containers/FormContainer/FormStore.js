import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import {
  fetchSubmittedData,
  getFormData,
  submitFormData,
  updateFormData,
  uploadFile,
} from "../../store/FormStore/formSlice";
import {
  fetchSubmitData,
  setFormCreds,
} from "../../store/InternalAdminStore/InternalAdminSlice";

const mapStateToProps = (state) => {
  
  return {
    form_data: state.formData.form_data,
    tabSubmitdata: state.formData.tabSubmitdata,
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
    selectedCampaignIds: state.formData.selectedCampaignIds,
    selectedCampaignName: state.formData.selectedCampaignName,
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
      fetchSubmittedData: fetchSubmittedData,
      // getCompaign : getCompaign, 
    },
    dispatch
  );

const FormStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);

export default FormStore;
