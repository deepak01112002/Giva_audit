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
      activeSubTab:"",
      activeSubIndex:0,
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
      address:'' ,
      _id: null,
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
    
    let campaignIds = getCookie("campaingIds");
    // let campaignIds = getCookie("campaingIds");
 

    
    let campaignIdsParsed = JSON.parse(campaignIds);
    // let campaignIdsParsed = JSON.parse(campaignIds);
    // let campaignIdsParsed = JSON.parse(campaignIds);

    if (userData) {
      await this.props.getFormData({
        // username: userData['user_type'] == Role.user ? userData.username : this.props.userID ?? '',
        campaign_id: campaignIdsParsed?.campaign_id,
        // sub_category_id: categoryIdsParsed.selectedSubCategory,
      });
      // await this.props.fetchSubmittedData({
      //   category_id: categoryIdsParsed?.selectedCategorary,
      //   username: this.props.userID,
      // });
      const { form_data } = this.props;
      const { tabs } = form_data;



      if (
        this.props.formID !== undefined &&
        this.props.formID != "" &&
        userData["user_type"] != Role.user
      ) {
        // await this.props.getSubmitData({
        //   form_id: this.props.formID,
        //   username: this.props.userID,
        // });
      }
      if (tabs?.length > 0 && this.state.activeFormId == "") {
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
      const { tabs,subtab } = form_data;
    const { extraStore } = form_data;
    const { location } = this.props;
try {
  // if (!this.props.formID) {
    let submitFormData = JSON.parse(
      JSON.stringify(this.props.form_data.answerContent)
    );
    const dynamicKey = Object.keys(submitFormData)[0];
    // console.error('city',form_data);
    // submitFormData[dynamicKey]['city']['answer'] = extraStore[0].city;
    // submitFormData[dynamicKey]['region']['answer'] = extraStore[0].region;
    // submitFormData[dynamicKey]['state']['answer'] = extraStore[0].state;
    submitFormData[dynamicKey]['store_name']['answer'] = location.state?.store_name;
    submitFormData[dynamicKey]['store_code']['answer'] = location.state?.store_code;
    this.setState({
      submitFormData: submitFormData,
      StoreCode:location.state.store_code,
      storeName:location.state.store_name,
      activeSubTab:subtab?.[0]?.[0]
    });
  // }
  let campaignIds = getCookie("campaingIds");
  let campaignIdsParsed = JSON.parse(campaignIds);

  await this.props.fetchSubmittedData({campaign_id:campaignIdsParsed?.campaign_id,store_code:location.state.store_code});

  if(this.props?.tabSubmitdata?.last_tab_index)this.setState({
            activeFormIndex: this.props?.tabSubmitdata?.last_tab_index + 1,
            activeFormId: tabs[this.props?.tabSubmitdata?.last_tab_index + 1]?.id ??tabs[0]?.id ,
            _id : this.props?.tabSubmitdata?._id
        });
} catch (error) {
  console.error('errorerror', error)
}
    
  }

  componentDidUpdate(prevProps) {
    const { form_data } = this.props;
    const { tabs,subtab } = form_data;
    if (prevProps.tabSubmitdata !==this.props.tabSubmitdata) {
      let index  = isNaN(this.props?.tabSubmitdata?.last_tab_index + 1)? 0:this.props?.tabSubmitdata?.last_tab_index + 1;
      if(index>=subtab.length)index=0;
    this.setState({
        activeFormIndex: index,
        activeFormId: index<tabs.length?tabs[index]?.id : tabs[0]?.id,
        _id : this.props?.tabSubmitdata?._id,
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
  handleSubTabChange = (event, newValue) => {
    this.setState({ activeSubTab: newValue });
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
        sub_tab:data['sub_tab']
      };
      if (!data.non_scoring && Array.isArray(data["answer"])) {
        if (!data["answer"].includes("None of the above")) {
          answerData["marks"] = data["answer"].length ?? 0;
        } else {
          // answerData["marks"] = 0;
          answerData["answer"] = "None of the above";
        }
        // answerData["max_marks"] = data["options"]?.length ?? 0;
      }
       else if (data.non_scoring === true && data?.type == "dropdown") {
        delete answerData["marks"] 
        delete answerData["max_marks"]
      }
      else if ( data?.type == "image" ) {
        delete answerData["marks"];
        delete answerData["max_marks"];
      } else if ( data?.type == "edittext"  ) {
        delete answerData["marks"];
        delete answerData["max_marks"];
      }


      let tostr = data["answer"].toString();
      let rawMarks = tostr.toLowerCase();
      if (data.non_scoring === false   && data?.type != "image" && data?.type != "edittext"
        // rawMarks == "yes" ||
        // rawMarks == "no" ||
        // rawMarks == "N/A" ||
        // rawMarks == "NA"
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
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
    const { tabs,subtab } = this.props.form_data;
    if(subtab && subtab[this.state.activeFormIndex]?.length>0){
      const index = subtab[this.state.activeFormIndex].indexOf(this.state.activeSubTab)
      if( index!== subtab[this.state.activeFormIndex].length-1){
       this.setState({activeSubTab:subtab[this.state.activeFormIndex][index+1]})
       return;
      }
    }
    this.setState({activeSubTab:subtab?.[this.state.activeFormIndex]?.[0]})

    //TO CHECK BEFORE DEPLOY
    // if (tabs.length - 1 > this.state.activeFormIndex) {

      this.setState({
        activeFormId: tabs[this.state.activeFormIndex + 1]?.id,
        activeFormIndex: this.state.activeFormIndex + 1,
      });
    // } else {
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

        let campaignIds = getCookie("campaingIds");
        let campaignIdsParsed = JSON.parse(campaignIds);


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
            store_code: this.state.StoreCode?.length > 0 ? this.state.StoreCode  : this.state.submitFormData[this.state.activeFormId]?.store_code?.answer,
            region : this.state.regionform?.length   > 0 ? this.state.regionform :  this.state.submitFormData[this.state.activeFormId]?.region?.answer,
            store_name :this.state.storeName?.length > 0 ? this.state.storeName : this.state.submitFormData[this.state.activeFormId]?.store_name?.answer,
            city:this.state.city?.length > 0 ? this.state.city : this.state.submitFormData[this.state.activeFormId]?.city?.answer,
            state:this.state.state.length > 0 ? this.state.state : this.state.submitFormData[this.state.activeFormId]?.state?.answer,
            // campaign_id: campaignIdsParsed.selectedCampaign,
            campaign_id: campaignIdsParsed?.campaign_id,
            campaign_name: campaignIdsParsed?.campaign_name,
            all_tabs_submitted: tabs.length - 1 > this.state.activeFormIndex ? false : true,
            last_tab_submitted: this.state.activeFormId,
            last_tab_index: this.state.activeFormIndex
          };
          // _id exist then update
          if (this.state._id) {
            builderData["_id"] = this.state._id;
          }
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
            city:this.state.city??"",
            state:this.state.state??"",
            // campaign_id: campaignAlldetail?._id ?? "",
            // campaign_name: campaingNameParsed,
            campaign_id: campaignIdsParsed?.campaign_id,
            campaign_name: campaignIdsParsed?.campaign_name,
            all_tabs_submitted: tabs.length - 1 > this.state.activeFormIndex ? false : true,
            last_tab_submitted: this.state.activeFormId,
            last_tab_index: this.state.activeFormIndex

          };
          if (this.state._id) {
            builderData["_id"] = this.state._id;
          }
        }

        var response = "";
        
        if (user["user_type"] === Role.user) {
         response = await this.props.submitFormData(builderData);
          if (response?.payload?.status === 200) {
            // this.setState({
            //   snackBarOpen: true,
            //   snackbarMsg: "Form submitted successfully",
            // });

            // only for first time
            if(response?.payload?.data?.data?._id){
              this.setState({ 
                _id: response?.payload?.data?.data?._id
              })
            }
          
              

      
          setTimeout(() => {
              this.setState({
                formDataSubmitting: false,
              });
              if(!(tabs.length > this.state.activeFormIndex)) {  this.props.navigate("/store");}
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
            }, 3000)
          } else {
            this.setState({
              formDataSubmitting: false,
              snackBarOpen: true,
              snackbarMsg: "Something went wrong",
            });
          }
        }
      }
    // }

    return false;
  };
  handleOnPrev = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling effect
    });
    const { tabs,subtab } = this.props.form_data;
    if( subtab && subtab?.[this.state.activeFormIndex]?.length>0){
      const index = subtab[this.state.activeFormIndex].indexOf(this.state.activeSubTab)
      if( index!== 0){
       this.setState({activeSubTab:subtab?.[this.state.activeFormIndex]?.[index-1]})
       return;
      }
    }
    if (this.state.activeFormIndex > 0) {
      this.setState({
        activeFormId: tabs[this.state.activeFormIndex - 1].id,
        activeFormIndex: this.state.activeFormIndex - 1,
      });
      setTimeout(() => {
        const updatedFormData = { ...this.state.submitFormData }; // Create a shallow copy of submitFormData
      
        this.props?.tabSubmitdata?.multitab_data?.[this.state.activeFormIndex]?.questionnarie?.forEach(val => {
          if (
            val?.label_key &&
            updatedFormData[this.state.activeFormId]?.[val.label_key] &&
            val.answer !== undefined
          ) {
            // Update the answer in the copied state
            updatedFormData[this.state.activeFormId][val.label_key] = {
              ...updatedFormData[this.state.activeFormId][val.label_key],
              answer: val.answer,
            };
          }
        });
      
        // Update the state with the modified object
        this.setState({ submitFormData: updatedFormData });
      }, 500);
      
  };
}

  render() {
    
    
    const { activeFormId, activeFormIndex,activeSubTab } = this.state;
    const {
      formDataLoading,
      form_data,
      fetchSubmitDataLoading,
      defaultFormDataLoading,
    } = this.props;
    const { tabs, formContent, campaign_id,subtab } = form_data;
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
    console.log('submitFormData[activeFormId]', submitFormData,activeFormId)
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
              {subtab &&  subtab[activeFormIndex]?.length>0 &&   <TabContext value={this.state.activeSubTab}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={this.state.activeSubTab}
                    // index={this.state.activeSubTab}
                    onChange={this.handleSubTabChange}
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
                    {subtab[activeFormIndex]?.map((item, i) => {
                      return (
                        <Tab
                          value={item}
                          label={item}
                          wrapped
                          key={i}
                        />
                      );
                    })}
                  </Tabs>
                </Box>
              </TabContext>}
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
                  selectedSubTab = {this.state.activeSubTab}
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
