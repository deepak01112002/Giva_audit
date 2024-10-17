import React, { Component } from "react";
import ResponsiveAppBar from "../../components/Appbar";
import InternalAdminTable from "../../components/internalAdmin/InternalAdminTable";
import { isAuth, setCookie } from "../../helpers/cookies";
import { axios } from "../../helpers/axios";
import { FETCH_USER } from "../../store/InternalAdminStore/InternalAdminConstant";
export default class InternalAdminContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDates: {
        sdate: "",
        edate: "",
        campaign_id: "",
        region:"",
        city:"",
        state :"",
      },
      csvData: "",
    };
  }

  componentDidMount() {
    this.props.fetchUsers({ project_code: "gmr" });
    this.props.getCompaign();
    this.props.getRegions();
    this.props.getStates();
    this.props.getCities();
  }

  handleOnViewClick = async (payload) => {
    await this.props.setFormCreds(payload);
    this.props.navigate("/admin/result");
    // ReactDOM.render(<Result />, document.getElementById('root'));
  };

  handleOnDownlodClick = async (payload) => {
    await this.props.setFormCreds(payload);
    // window.open('/admin/result?view=1', '_blank');
    this.props.navigate("/admin/result?view=1");
    // ReactDOM.render(<Result />, document.getElementById('root'));
  };


  handleOnDeleteClick = async (payload) => {
    // console.log('handleOnDeleteClick payload',  this.props)
    if (window.confirm('Are you sure you want to Delete this audit?')) {
      await this.props.delete_audit(payload)
      this.props.fetchUsers({ project_code: "audit" });
    };
  };

  handleApproveOnClick = async (payload) => {
    // console.log('handleOnDeleteClick payload',  this.props)
    if (window.confirm('Are you sure you want to Approve this audit?')) {
      await this.props.approve_samsung(payload)
      this.props.fetchUsers({ project_code: "audit" });
    };
  };



  onEditClick = async (payload) => {
    await this.props.setFormCreds({
      formID: payload.formID,
      userID: payload.userID,
    });
    setCookie('categoryIds', JSON.stringify({
      selectedCategorary: payload.selectedCategorary,
      selectedSubCategory: payload.selectedSubCategory,

    }))
    setCookie('campaingIds',JSON.stringify({ campaign_name: payload.name, campaign_id: payload.campaign_id}))
   
    this.props.setSelectedCampaignIds({ campaign_name: payload.name, campaign_id: payload.campaign_id });

    this.props.setSelectedCategoriesIds({
      selectedCategorary: payload.selectedCategorary,
      selectedSubCategory: payload.selectedSubCategory,
    });
    this.props.navigate(`/admin/dashboard`);
  };

  handleSelectDate = (val, name) => {
    let dates = this.state.selectedDates;
    let date = new Date(val);
    date = date.toISOString();
    dates[name] = date;
    this.setState({
      selectedDates: dates,
    });
  };

  handleFilter = () => {
    this.props.fetchUsers({
      ...this.state.selectedDates,
      project_code: "audit",
    });
  };

  handleCampaignChange = (value) => {
    let dates = this.state.selectedDates;
    dates.campaign_id = value;
    this.setState({
      selectedDates: dates,
    });
  };
  handleRegionChange = (value) => {
    let dates = this.state.selectedDates;
    dates.region = value;
    this.setState({
      selectedDates: dates,
    });
  };
  handleCitiesChange = (value) => {
    let dates = this.state.selectedDates;
    dates.city = value;
    this.setState({
      selectedDates: dates,
    });
  };
  handleStatesChange = (value) => {
    let dates = this.state.selectedDates;
    dates.state = value;
    this.setState({
      selectedDates: dates,
    });
  };


  downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType });

    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  handleCsvClick = async (event, done) => {
    let res = await axios.get(FETCH_USER, {
      params: {
        ...this.state.selectedDates,
        project_code: "audit",
        mode: "export",
      },
    });

    if (res.status === 200) {
      this.downloadFile({
        data: res.data,
        fileName: "users.csv",
        fileType: "text/csv",
      });

      // done();
    }
  };

  render() {
    const { navigate, usersDataList } = this.props;
    const user = isAuth();
 
    
    

    return (
      <>
        <ResponsiveAppBar />
        <InternalAdminTable
          handleCampaignChange={this.handleCampaignChange}
          handleRegionChange={this.handleRegionChange}
          handleStatesChange={this.handleStatesChange}
          handleCitiesChange={this.handleCitiesChange}
          compaignList={this?.props?.compaignList?.data ?? []}
          regionList={this?.props?.regionsList?.data ?? []}
          statesList={this?.props?.statesList?.data ?? []}
          citiesList={this?.props?.citiesList?.data ?? []}
          tableData={usersDataList}
          navigate={navigate}
          onEditClick={this.onEditClick}
          handleOnViewClick={(val) => this.handleOnViewClick(val)}
          handleOnDownlodClick={this.handleOnDownlodClick}
          handleOnDeleteClick={this.handleOnDeleteClick}
          role={user.data.user_type}
          handleSelectDate={this.handleSelectDate}
          handleFilter={this.handleFilter}
          userDataLoading={this.props.userDataLoading}
          selectedDates={this.state.selectedDates}
          handleCsvClick={this.handleCsvClick}
          handleApproveOnClick={this.handleApproveOnClick}
        />
      </>
    );
  }
}
