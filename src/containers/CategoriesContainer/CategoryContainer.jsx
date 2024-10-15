import React, { Component } from "react";
import Category from "../../components/Category";
import ResponsiveAppBar from "../../components/Appbar";
import CategoryStore from "./CategoryStore";
import withNavigate from "../../routes/withNavigate";
import { setCookie } from "../../helpers/cookies";

class CategoryContainer extends Component {
  state = {
    selectedCategorary: "",
    selectedCampaign:"",
  };

  componentDidMount() {
    this.props.getAllCategory2();
  }
  handleCampaingChange = (id, name) => {
    let stateValues = this.state;
    stateValues[name] = id;
    this.setState(stateValues);
    setCookie('campaingIds',JSON.stringify(stateValues))
   
    this.props.setSelectedCampaignIds(stateValues);
  };
  handleCategoryChange = (id, name) => {   
    let stateValues = this.state;
    stateValues[name] = id;
    this.setState(stateValues);
    setCookie('categoryIds',JSON.stringify(stateValues))
    this.props.getCompaign({
      category_id: id,
    });
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
            selectedCampaign:this.state.selectedCampaign,
            handleOnChane: this.handleCategoryChange,
            handleCampaingChange:this.handleCampaingChange,
            onSubmit: this.onSubmit,
            getAllCampaign:this.props.compaignList?.data,
            setSelectedCampaignName:this.props.setSelectedCampaignName
          }}
        />
      </div>
    );
  }
}

export default withNavigate(CategoryStore(CategoryContainer));
