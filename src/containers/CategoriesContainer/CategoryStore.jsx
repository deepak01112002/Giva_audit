import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { getAllCategory, getAllSubCategory,  setSelectedCampaignIds,  setSelectedCategoriesIds } from "../../store/FormStore/formSlice";
import { getCompaign } from "../../store/InternalAdminStore/InternalAdminSlice";


const mapStateToProps = (state) => {
  return {
    storeAllCategory: state.formData.category_data,
    categoryLoading: state.formData.category_loading,
    storeAllSubCategory: state.formData.sub_category_data,
    compaignList: state.internalAdmin.compaignList,
    selectedCampaignIds: state.formData.selectedCampaignIds



  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getAllCategory2: getAllCategory, getAllSubCategory: getAllSubCategory, setSelectedCategoriesIds : setSelectedCategoriesIds , getCompaign : getCompaign,setSelectedCampaignIds:setSelectedCampaignIds
  }, dispatch);

const CategoryStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);

export default CategoryStore;
