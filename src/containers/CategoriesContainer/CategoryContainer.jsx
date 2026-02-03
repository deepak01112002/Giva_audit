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
    selectedStore:null,
  };

  componentDidMount() {
    this.props.getCompaign();
    this.props.getStoreData();
  }

  componentDidUpdate(prevProps) {
    // When campaign list first loads, set default filter to the last option
    const campaignData = this.props.compaignList?.data;
    const hasCampaigns = campaignData?.length > 0;
    const hadNoCampaigns = !prevProps.compaignList?.data?.length;
    if (hasCampaigns && hadNoCampaigns) {
      const lastIndex = campaignData.length - 1;
      this.handleCampaingChange(lastIndex, 'selectedCampaign');
    }
  }

  handleCampaingChange = (value, campaign) => {
    // value can be index (number) or _id (string) from MenuItem
    const campaignData = this.props.compaignList?.data ?? [];
    const item = typeof value === 'number' ? campaignData[value] : campaignData.find((c) => c._id === value);
    if (!item) return;
    const { name, _id } = item;

    let stateValues = { ...this.state };
    stateValues[campaign] = { name, id: _id };
    this.setState(stateValues);
    setCookie('campaingIds', JSON.stringify({ campaign_name: name, campaign_id: _id }));
    this.props.setSelectedCampaignIds({ campaign_name: name, campaign_id: _id });
  };
  handleStoreSelection = (store) => {
    this.setState({selectedStore:store})
  };
  handleCategoryChange = (id, name) => {   
    let stateValues = this.state;
    stateValues[name] = id;
    this.setState(stateValues);
    setCookie('categoryIds',JSON.stringify(stateValues))
    this.props.getCompaign({
      category_id: id,
    });
    this.props.getStoreData({
      category_id: id,
    });

    this.props.setSelectedCategoriesIds(stateValues);
  };

  onSubmit = () => {
    this.props.navigate(`/dashboard`,{ state: this.state.selectedStore });
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
            setSelectedCampaignName:this.props.setSelectedCampaignName,
            storeData:this.props.storeData ?? [],
            handleStoreSelection:this.handleStoreSelection,
            selectedStore:this.state.selectedStore
          }}
        />
      </div>
    );
  }
}

export default withNavigate(CategoryStore(CategoryContainer));
