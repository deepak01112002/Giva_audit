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
      },
      csvData: "",
    };
  }

  componentDidMount() {
    this.props.fetchUsers({ project_code: "gmr" });
    this.props.getCompaign();
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

  onEditClick = async (payload) => {
    await this.props.setFormCreds({
      formID: payload.formID,
      userID: payload.userID,
    });
    setCookie('categoryIds',JSON.stringify({
      selectedCategorary: payload.selectedCategorary,
      selectedSubCategory: payload.selectedSubCategory,
    }))

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
          compaignList={this?.props?.compaignList?.data ?? []}
          tableData={usersDataList}
          navigate={navigate}
          onEditClick={this.onEditClick}
          handleOnViewClick={(val) => this.handleOnViewClick(val)}
          handleOnDownlodClick={this.handleOnDownlodClick}
          role={user.data.user_type}
          handleSelectDate={this.handleSelectDate}
          handleFilter={this.handleFilter}
          userDataLoading={this.props.userDataLoading}
          selectedDates={this.state.selectedDates}
          handleCsvClick={this.handleCsvClick}
        />
      </>
    );
  }
}
