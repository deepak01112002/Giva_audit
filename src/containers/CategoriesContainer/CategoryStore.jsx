import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { getAllCategory, getAllSubCategory, setSelectedCategoriesIds } from "../../store/FormStore/formSlice";


const mapStateToProps = (state) => {
  return {
    storeAllCategory: state.formData.category_data,
    categoryLoading: state.formData.category_loading,
    storeAllSubCategory: state.formData.sub_category_data,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getAllCategory2: getAllCategory, getAllSubCategory: getAllSubCategory, setSelectedCategoriesIds : setSelectedCategoriesIds }, dispatch);

const CategoryStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);

export default CategoryStore;
