import React, { Component } from "react";
import Category from "../../components/Category";
import ResponsiveAppBar from "../../components/Appbar";
import CategoryStore from "./CategoryStore";
import withNavigate from "../../routes/withNavigate";
import { setCookie } from "../../helpers/cookies";

class CategoryContainer extends Component {
  state = {
    selectedCategorary: "",
    selectedSubCategory: "",
  };

  componentDidMount() {
    this.props.getAllCategory2();
  }
  handleCategoryChange = (id, name) => {
    let stateValues = this.state;
    stateValues[name] = id;
    this.setState(stateValues);
    setCookie('categoryIds',JSON.stringify(stateValues))
    if (name === "selectedCategorary") {
      this.props.getAllSubCategory({
        category_id: id,
      });
    }
    this.props.setSelectedCategoriesIds(stateValues);
  };

  onSubmit = () => {
    this.props.navigate(`/dashboard`);
  };
  render() {
    if (this.props.categoryLoading) {
      return null;
    }

    return (
      <div>
        <ResponsiveAppBar />
        <Category
          data={{
            getAllCategory: this.props.storeAllCategory,
            getAllSubCategory: this.props.storeAllSubCategory,
            selectedCategorary: this.state.selectedCategorary,
            handleOnChane: this.handleCategoryChange,
            selectedSubCategory: this.state.selectedSubCategory,
            onSubmit: this.onSubmit,
          }}
        />
      </div>
    );
  }
}

export default withNavigate(CategoryStore(CategoryContainer));
