import React, { Component } from "react";
import Category from "../../components/Category";
import ResponsiveAppBar from "../../components/Appbar";
import CategoryStore from "./CategoryStore";
import withNavigate from "../../routes/withNavigate";
import { setCookie } from "../../helpers/cookies";

class CategoryContainer extends Component {
  state = {
    selectedCategorary: "",
  };

  componentDidMount() {
    this.props.getAllCategory2();
  }
  handleCategoryChange = (id, name) => {
    let stateValues = this.state;
    stateValues[name] = id;
    this.setState(stateValues);
    setCookie('categoryIds',JSON.stringify(stateValues))
    
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
            selectedCategorary: this.state.selectedCategorary,
            handleOnChane: this.handleCategoryChange,
            onSubmit: this.onSubmit,
          }}
        />
      </div>
    );
  }
}

export default withNavigate(CategoryStore(CategoryContainer));
