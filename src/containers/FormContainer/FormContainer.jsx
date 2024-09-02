import React, { Component } from "react";
import Form from "../../components/Form";
import ResponsiveAppBar from "../../components/Appbar";
import Box from "../../common/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Alert, CircularProgress, Tab, Tabs } from "@mui/material";
import { TabContext } from "@mui/lab";
import { getCookie, isAuth } from "../../helpers/cookies";
import withNavigate from "../../routes/withNavigate";
import AppStyle from "../../utils/colors";
import Role from "../../utils/roles";
import BackdropProgress from "../../common/BackdropProgress";
import Snackbar from "../../common/Snackbar";

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFormId: "",
      activeFormIndex: 0,
      submitFormData: {},
      snackBarOpen: false,
      formDataSubmitting: false,
      snackbarMsg: "Something went wrong",
      images: [],
      extradata: {},
      seleceStoreIndex: false,
      storeName:'',
      StoreCode:'',
      regionform:'',
      city:'',
      state:'',
      address:'' 
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getFormDataApiCall = this.getFormDataApiCall.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnPrev = this.handleOnPrev.bind(this);
  }

  async componentDidMount() {
    await this.getFormDataApiCall();
    await this.handleInitialSubmitFormData();

  }

  async getFormDataApiCall() {
    const user = await isAuth();
    const userData = user["data"];
    let categoryIds = getCookie("categoryIds");
    let categoryIdsParsed = JSON.parse(categoryIds);
    if (userData) {
      await this.props.getFormData({
        // username: userData['user_type'] == Role.user ? userData.username : this.props.userID ?? '',
        category_id: categoryIdsParsed?.selectedCategorary,
        // sub_category_id: categoryIdsParsed.selectedSubCategory,
      });
      const { form_data } = this.props;
      const { tabs } = form_data;



      if (
        this.props.formID !== undefined &&
        this.props.formID != "" &&
        userData["user_type"] != Role.user
      ) {
        await this.props.getSubmitData({
          form_id: this.props.formID,
          username: this.props.userID,
        });
      }
      if (tabs.length > 0 && this.state.activeFormId == "") {
        this.setState({
          activeFormId: tabs[0].id,
          submitFormData:
            this.props.formID !== undefined && this.props.formID != ""
              ? this.props.fetchSubmitData
              : this.props.form_data.answerContent,
        });
      }
    }
  }

  async handleInitialSubmitFormData() {
    const { form_data } = this.props;
    const { extraStore } = form_data;

    if (!this.props.formID) {
      let submitFormData = JSON.parse(
        JSON.stringify(this.props.form_data.answerContent)
      );
      const dynamicKey = Object.keys(submitFormData)[0];
      // console.error('city',form_data);
      // submitFormData[dynamicKey]['city']['answer'] = extraStore[0].city;
      // submitFormData[dynamicKey]['region']['answer'] = extraStore[0].region;
      // submitFormData[dynamicKey]['state']['answer'] = extraStore[0].state;
      // submitFormData[dynamicKey]['address']['answer'] = extraStore[0].address;
      this.setState({
        submitFormData: submitFormData,
      });
    }
  }

  handleOnChange = async (val, name, type, event) =>  {
    if(name==='store_code'){

      this.setState({StoreCode:val})
    }
    if(name=== 'store_name'){
      this.setState({storeName:val})

    }
    if(name==='region'){
      this.setState({regionform:val})
    }
    if(name==='address'){
      this.setState({address:val})
    }
    if(name==='state'){
      this.setState({state:val})
    }
    if(name==='city'){
      this.setState({city:val})
    }
    
    

    try {
      let currentFormData = this.state.submitFormData;
      let extradatatemp = this.state.extradata;
      

      let imageData = this.state.images;
      let empty =
        currentFormData && // 👈 null and undefined check
        Object.keys(currentFormData).length === 0 &&
        Object.getPrototypeOf(currentFormData) === Object.prototype;
      if (empty) {
        currentFormData = this.props.form_data.answerContent;
      }
      let buildFormData = JSON.parse(JSON.stringify(currentFormData));
      if (type === "image") {
        // buildFormData[this.state.activeFormId][name]["answer"] = "image";
        buildFormData[this.state.activeFormId][name]["imageData"] = URL.createObjectURL(new Blob([val[0]]));
        let formData = new FormData();

        formData.append("file", val[0]);
        const imageResponse = await this.props.uploadFile(formData);
        buildFormData[this.state.activeFormId][name]["answer"] = imageResponse.payload.data.data.result.file.filename;
        // if (imageData.length > 0) {
        //   imageData.map((item, i) => {
        //     if (item.name === name && item.formId === this.state.activeFormId) {
        //       imageData[i] = {
        //         image: val,
        //         formId: this.state.activeFormId,
        //         name: name,
        //         path: "",
        //       };
        //     } else {
        //       imageData.push({
        //         image: val,
        //         formId: this.state.activeFormId,
        //         name: name,
        //         path: "",
        //       });
        //     }
        //   });
        // } else {
        //   imageData.push({
        //     image: val,
        //     formId: this.state.activeFormId,
        //     name: name,
        //     path: "",
        //   });
        // }

        // this.setState({
        //   images: imageData,
        // });
      } else {
        if (name == 'store_name') {
        	if (type && type.length > 0) {
        	      let optionIndex = event?.target?.dataset?.optionIndex ;
        		  this.setState({
        			seleceStoreIndex: event?.target?.dataset?.optionIndex
        		  })
        		  extradatatemp = type[optionIndex];
        		  Object.keys(type[optionIndex]).map((key) => {
        			if (
        			  key != "store_name" &&
        			  key in buildFormData[this.state.activeFormId]
        			) {
        			  buildFormData[this.state.activeFormId][key]["answer"] =
        				type[optionIndex][key];
        			}
        			// this.handleOnChange(type[index][key], key)
        		  });

        	  }
        }
        if (name in buildFormData[this.state.activeFormId]) {
          buildFormData[this.state.activeFormId][name]["answer"] = val;
        } else {
          buildFormData[this.state.activeFormId][name] = {
            answer: val,
          };
        }
      }
      this.setState({
        extraData: extradatatemp,
      });
      this.setState({
        submitFormData: buildFormData,
      });
    } catch (e) {

    }
  };

  handleChange = (event, newValue) => {
    this.setState({ activeFormId: newValue });
  };

  getQuestinaire(mergedData, formData) {
    let questionaire = [];
    for (let a in mergedData) {
      let data = { ...formData[a], ...mergedData[a] }


      let answerData = {
        question: data["question"],
        answer: data["answer"].toString(),
        label_key: a,
        question_no: data["question_no"],
      };
      if (!data.non_scoring && Array.isArray(data["answer"])) {
        if (!data["answer"].includes("None of the above")) {
          answerData["marks"] = data["answer"].length ?? 0;
        } else {
          // answerData["marks"] = 0;
          answerData["answer"] = "None of the above";
        }
        // answerData["max_marks"] = data["options"]?.length ?? 0;
      } else if (data.non_scoring === true && data?.type == "checkbox") {
        answerData["marks"] = !data.non_scoring?.marks ?? 0;
        answerData["max_marks"] = !data.non_scoring?.max_marks ?? 0;
      }


      let tostr = data["answer"].toString();
      let rawMarks = tostr.toLowerCase();
      if (
        rawMarks == "yes" ||
        rawMarks == "no" ||
        rawMarks == "N/A" ||
        rawMarks == "NA"
      ) {
        let marks = rawMarks == "yes" ? 1 : 0;
        answerData["marks"] = marks;
        answerData["max_marks"] = 1;
      }
      if (!data.non_scoring) {



        /* Note :  Uncomment it in future project */

        // if(data["options"]?.length > 0){
        //   answerData["marks"] = data["answer"]?.toLowerCase == "no" ? 0 : 1;
        //   answerData["max_marks"] = 1;
        // }

        if (
          data["question"]?.includes("0 to 5") ||
          data["question"]?.includes("1 to 5")
        ) {
          let scoreScale = "1 to 5".trim().replace(".", "").split("to");
          answerData["marks"] = data["answer"];
          answerData["max_marks"] = 5;
        }
        if (data["question"]?.includes("0(lowest) to 5 (highest)")) {
          // let scoreScale = "1(lowest) to 5 (highest)".trim().replace(".", "");
          answerData["marks"] = data["answer"];
          answerData["max_marks"] = 5;
        }
        if (data.type === "date") {
          if (answerData["answer"] === "") {
            const currentDate = new Date().toISOString().split("T")[0];
            answerData["answer"] = currentDate;
          }
        }
      }
      questionaire.push(answerData);
    }
    const sortedArray = questionaire.sort(
      (a, b) => a.question_no - b.question_no
    );
    return sortedArray;
  }

  getAnswerSheet = (data) => {
    let answerSheet = [];
 

    for (let category in data) {
      let answerElement = {
        category: category,
        questionnarie: this.getQuestinaire(data[category], this.props.form_data.answerContent[category]),
      };
      answerSheet.push(answerElement);
    }
    return answerSheet;
  };

  handleOnSubmit = async (e) => {
    e.preventDefault();

    const { tabs } = this.props.form_data;

    //TO CHECK BEFORE DEPLOY
    if (tabs.length - 1 > this.state.activeFormIndex) {
      this.setState({
        activeFormId: tabs[this.state.activeFormIndex + 1]?.id,
        activeFormIndex: this.state.activeFormIndex + 1,
      });
    } else {
      this.setState({
        formDataSubmitting: true,
      });
      let user = isAuth();

      if (user) {
        //file upload section
        var ourData = this.state.submitFormData;
        // await Promise.all(
        //   this.state.images.map(async (val, i) => {
        //     let formData = new FormData();
        //     formData.append("file", val.image[0]);
        //     const imageResponse = await this.props.uploadFile(formData);
        //     ourData[val.formId][val.name]["answer"] =
        //       imageResponse.payload.data.data.result.file.filename;
        //     return;
        //   })
        // );
        let submitFormData = JSON.parse(
          JSON.stringify(this.props.form_data.answerContent)
        );
        
        let firstPositionForm = this.props.form_data.tabs[0].id
        let audit_detail = ourData[firstPositionForm];

        let auditAlldetail = {};
        let allStores = this.props.form_data.extraStore;
        // let allCampaign = this?.props?.compaignList?.data ?? [];
        let allCampaign = this.props.form_data.extraCampaign;
        let campaignAlldetail = {};

        if (this.state.seleceStoreIndex) {
          // let index = this.state.seleceStoreIndex;
          
          let cIndex = allCampaign.findIndex(
            (item) => item.name == audit_detail?.campaign_name.answer
          );
          let index = allStores.findIndex(
            (item) => item.store_name == audit_detail?.store_name?.answer
          );
          if (index != -1) {
            auditAlldetail = allStores[index];
          }

          if (cIndex != -1) {
            campaignAlldetail = allCampaign[cIndex];
          }
        } else {
 
          let index = allStores.findIndex(
            (item) => item.store_name?.trim()?.toLowerCase() == audit_detail.store_name.answer?.trim()?.toLowerCase()
          );

          let cIndex = allCampaign.findIndex(
            (item) => item.name == audit_detail.campaign_name.answer
          );

          if (index == -1) {
            let parts = audit_detail.store_name.answer.split("-");

            var desired_value = parts.slice(0, -1).join("-").trim();

            index = allStores.findIndex(
              (item) => item.store_name == desired_value
            );
          }

          if (index != -1) {
            auditAlldetail = allStores[index];
          }

          if (cIndex != -1) {
            campaignAlldetail = allCampaign[cIndex];
          }
        }
        let categoryIds = getCookie("categoryIds");
        let categoryIdsParsed = JSON.parse(categoryIds);


        user = user["data"];
        let builderData = {};
        if (user["user_type"] !== Role.user) {
          // builderData["updated_by"] = user["username"];
          // builderData["form_id"] = this.props.formID;
          // builderData["multitab_data"] = this.getAnswerSheet(ourData);
          // builderData["campaign_id"] = this.props?.form_data?.campaign_id;
          // builderData["store_code"] = this.state.StoreCode??this.state.submitFormData[this.state.activeFormId]?.store_code?.answer;;
          // builderData["region"] = this.state.regionform ??  this.state.submitFormData[this.state.activeFormId]?.region?.answer;
          // builderData["store_name"] = this.state.storeName??  this.state.submitFormData[this.state.activeFormId]?.store_name?.answer;
          // builderData["campaign_id"] = campaignAlldetail?._id ?? "";
          // builderData["campaign_name"] = campaignAlldetail?.name ?? "";
          // builderData["category_id"] =
          //   categoryIdsParsed?.selectedCategorary ?? "";
          // builderData["sub_category_id"] =
          //   categoryIdsParsed?.selectedSubCategory;
          builderData = {
            // sub_category_id: categoryIdsParsed.selectedSubCategory,
            updated_by: user.username,
            form_id: this.props.formID,
            username: user.name,
            // module_code: this.props.module_code,
            multitab_data: this.getAnswerSheet(ourData),
            store_code: this.state.StoreCode??this.state.submitFormData[this.state.activeFormId]?.store_code?.answer,
            region : this.state.regionform ??  this.state.submitFormData[this.state.activeFormId]?.region?.answer,
            store_name :this.state.storeName??  this.state.submitFormData[this.state.activeFormId]?.store_name?.answer,
            campaign_id: campaignAlldetail?._id ?? "",
            campaign_name: campaignAlldetail?.name ?? "",
            category_id: categoryIdsParsed.selectedCategorary,
          };
        } else {
          builderData = {
            // sub_category_id: categoryIdsParsed.selectedSubCategory,
            loginid: user.username,
            project_code: user.project_code,
            username: user.name,
            module_code: this.props.module_code,
            multitab_data: this.getAnswerSheet(ourData),
            store_name: this.state.storeName?? "",
            store_code: this.state.StoreCode?? "",
            region: this.state.regionform   ?? "",
            campaign_id: campaignAlldetail?._id ?? "",
            campaign_name: campaignAlldetail?.name ?? "",
            category_id: categoryIdsParsed.selectedCategorary,
          };
        }

        var response = "";
        
        if (user["user_type"] === Role.user) {
         response = await this.props.submitFormData(builderData);
          if (response?.payload?.status === 200) {
            this.setState({
              snackBarOpen: true,
              snackbarMsg: "Form submitted successfully",
            });
            setTimeout(() => {
              this.setState({
                formDataSubmitting: false,
              });
              this.props.navigate("/store");
            }, 3000);
          } else {
            this.setState({
              formDataSubmitting: false,
              snackBarOpen: true,
              snackbarMsg: "Something went wrong",
            });
          }
        } else {
          
          response = await this.props.updateFormData(builderData);
          if (response.payload.status === 200) {
            this.setState({
              snackBarOpen: true,
              snackbarMsg: "Form submitted successfully",
            });
            setTimeout(() => {
              this.setState({
                formDataSubmitting: false,
              });
              this.props.navigate("/admin");
            }, 3000);
          } else {
            this.setState({
              formDataSubmitting: false,
              snackBarOpen: true,
              snackbarMsg: "Something went wrong",
            });
          }
        }
      }
    }

    return false;
  };
  handleOnPrev = () => {
    const { tabs } = this.props.form_data;
    if (this.state.activeFormIndex > 0) {
      this.setState({
        activeFormId: tabs[this.state.activeFormIndex - 1].id,
        activeFormIndex: this.state.activeFormIndex - 1,
      });
    }
  };

  render() {
    
    
    const { activeFormId, activeFormIndex } = this.state;
    const {
      formDataLoading,
      form_data,
      fetchSubmitDataLoading,
      defaultFormDataLoading,
    } = this.props;
    const { tabs, formContent, campaign_id } = form_data;
    const { submitFormData } = this.state;
  

    if (formDataLoading) {
      return (
        <>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%" }}
          >
            <CircularProgress />
          </Stack>
        </>
      );
    }
 
    return (
  
      
      <>
        <Stack>
          <ResponsiveAppBar />

          <>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={this.state.activeFormId}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={this.state.activeFormId}
                    index={this.state.activeFormIndex}
                    onChange={this.handleChange}
                    aria-label="wrapped label tabs example"
                    textColor="primary"
                    indicatorColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                      color: AppStyle.primaryBG,
                      backgroundColor: "#F5F5F5",
                    }}
                  >
                    {tabs?.map((item, i) => {
                      return (
                        <Tab
                          value={item?.id}
                          label={item?.label}
                          wrapped
                          key={i}
                          disabled={item?.id != this.state.activeFormId}
                        />
                      );
                    })}
                  </Tabs>
                </Box>
              </TabContext>
            </Box>
            <Container>
              {activeFormId ? (
                <Form
                  activeFormId={activeFormId}
                  handleOnSubmit={this.handleOnSubmit}
                  handleOnPrev={this.handleOnPrev}
                  handleOnChange={this.handleOnChange}
                  formContent={formContent[activeFormId]}
                  formData={submitFormData[activeFormId] ?? {}}
                  isNextValid={
                    this.state.activeFormIndex <
                    this.props.form_data.tabs.length - 1
                  }
                />
              ) : null}
            </Container>
          </>
        </Stack>
        <BackdropProgress
          open={
            this.state.formDataSubmitting ||
            fetchSubmitDataLoading ||
            defaultFormDataLoading
          }
        />
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.snackBarOpen}
          autoHideDuration={3000}
          onClose={() => {
            this.setState({
              snackBarOpen: false,
            });
          }}
        >
          <Alert
            onClose={() => {
              this.setState({
                snackBarOpen: false,
              });
            }}
            severity="success"
            sx={{ width: "100%" }}
          >
            {this.state.snackbarMsg}
          </Alert>
        </Snackbar>
      </>
    );
  }
}

export default withNavigate(FormContainer);
