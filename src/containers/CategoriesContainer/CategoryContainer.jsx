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

  normalizeSelectedStore = (store) => {
    if (!store) return null;

    const storeData = this.props.storeData ?? [];
    const storeCode = (store.store_code ?? store.storeCode ?? '').trim();
    if (!storeCode) return null;

    const matched =
      storeData.find(
        (item) => (item.store_code ?? item.storeCode ?? '').trim() === storeCode
      ) ?? store;

    const storeName = (matched.store_name ?? matched.storeName ?? '').trim();
    if (!storeName) return null;

    return {
      ...matched,
      store_code: storeCode,
      store_name: storeName,
    };
  };

  handleCampaingChange = (value, campaign) => {
    // value can be index (number) or _id (string) from MenuItem
    const campaignData = this.props.compaignList?.data ?? [];
    const item = typeof value === 'number' ? campaignData[value] : campaignData.find((c) => c._id === value);
    if (!item) return;
    const { name, _id } = item;

    let stateValues = { ...this.state, selectedStore: null };
    stateValues[campaign] = { name, id: _id };
    this.setState(stateValues);
    setCookie('campaingIds', JSON.stringify({ campaign_name: name, campaign_id: _id }));
    this.props.setSelectedCampaignIds({ campaign_name: name, campaign_id: _id });
  };

  handleStoreSelection = (store) => {
    const normalizedStore = this.normalizeSelectedStore(store);
    this.setState({ selectedStore: normalizedStore });

    if (normalizedStore) {
      this.props.setStoreCreds({
        storeName: normalizedStore.store_name,
        storeCode: normalizedStore.store_code,
      });
    }
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
    const { selectedStore, selectedCampaign } = this.state;
    const normalizedStore = this.normalizeSelectedStore(selectedStore);
    if (!normalizedStore?.store_code || !normalizedStore?.store_name) {
      return;
    }
    if (!selectedCampaign?.id) {
      return;
    }

    this.props.setStoreCreds({
      storeName: normalizedStore.store_name,
      storeCode: normalizedStore.store_code,
    });

    this.props.navigate(`/dashboard`, {
      state: {
        store_code: normalizedStore.store_code,
        store_name: normalizedStore.store_name,
        ...normalizedStore,
      },
    });
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
