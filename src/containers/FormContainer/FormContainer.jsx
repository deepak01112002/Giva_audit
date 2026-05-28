import { Component } from 'react';
import Form from '../../components/Form';
import ResponsiveAppBar from '../../components/Appbar';
import Box from '../../common/Box';
import Container from '@mui/material/Container';
import { Alert, CircularProgress, Tab, Tabs, Stack } from '@mui/material';
import { TabContext } from '@mui/lab';
import { getCookie, isAuth } from '../../helpers/cookies';
import withNavigate from '../../routes/withNavigate';
import AppStyle from '../../utils/colors';
import Role from '../../utils/roles';
import BackdropProgress from '../../common/BackdropProgress';
import Snackbar from '../../common/Snackbar';
import getQuestinaire from '../../utils/helper';

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFormId: '',
      activeSubTab: '',
      activeSubIndex: 0,
      activeFormIndex: 0,
      submitFormData: {},
      snackBarOpen: false,
      formDataSubmitting: false,
      snackbarMsg: 'Something went wrong',
      images: [],
      extradata: {},
      seleceStoreIndex: false,
      storeName: '',
      StoreCode: '',
      regionform: '',
      city: '',
      state: '',
      address: '',
      _id: null,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getFormDataApiCall = this.getFormDataApiCall.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnPrev = this.handleOnPrev.bind(this);
  }

  async componentDidMount() {
    const formDataFromApi = await this.getFormDataApiCall();
    await this.handleInitialSubmitFormData(formDataFromApi);
  }

  async getFormDataApiCall() {
    const user = await isAuth();
    const userData = user?.['data'];
    if (!userData) return;

    let campaignIdsParsed = null;
    try {
      const campaignIds = getCookie('campaingIds');
      if (campaignIds) campaignIdsParsed = JSON.parse(campaignIds);
    } catch (_) {}

    const result = await this.props.getFormData({ campaign_id: campaignIdsParsed?.campaign_id });
    const formData = result?.payload ?? result;
    if (!formData?.answerContent) return;

    const { tabs, answerContent } = formData;

    if (tabs?.length > 0 && this.state.activeFormId == '') {
      this.setState({
        activeFormId: tabs[0].id,
        submitFormData: this.props.formID !== undefined && this.props.formID != '' ? this.props.fetchSubmitData : answerContent,
      });
    }
    return formData;
  }

  async handleInitialSubmitFormData(formDataFromApi) {
    const { location } = this.props;
    const form_data = formDataFromApi ?? this.props.form_data;
    const { tabs = [], subtab = [] } = form_data ?? {};

    if (!form_data?.answerContent) return;

    try {
      let submitFormData = JSON.parse(JSON.stringify(form_data.answerContent));
      const dynamicKey = Object.keys(submitFormData)[0];
      if (!dynamicKey) return;

      let campaignIds = getCookie('campaingIds');
      let campaignIdsParsed = JSON.parse(campaignIds);
      const storeObj = location?.state;
      const storeNameFromLocation = storeObj?.store_name ?? storeObj?.storeName ?? '';
      const storeCodeFromLocation = storeObj?.store_code ?? storeObj?.storeCode ?? '';

      // Prefill store name/code from location.state – find correct key per tab (API may use 'store_name', 'Store Name', etc.)
      if (storeNameFromLocation || storeCodeFromLocation) {
        Object.keys(submitFormData).forEach((tabId) => {
          const formFieldsForTab = form_data?.formContent?.[tabId] ?? [];
          const storeNameField = formFieldsForTab.find((f) => f.label === 'Store Name');
          const storeCodeField = formFieldsForTab.find((f) => f.label === 'Store Code');
          const storeNameKey = storeNameField?.attributes?.props?.name ?? 'store_name';
          const storeCodeKey = storeCodeField?.attributes?.props?.name ?? 'store_code';
          if (storeNameFromLocation && submitFormData[tabId]?.[storeNameKey]) {
            submitFormData[tabId][storeNameKey].answer = storeNameFromLocation;
          }
          if (storeCodeFromLocation && submitFormData[tabId]?.[storeCodeKey]) {
            submitFormData[tabId][storeCodeKey].answer = storeCodeFromLocation;
          }
          // Fallback: set common key names in case form uses different casing/spacing
          const storeNameKeys = [storeNameKey, 'store_name', 'Store Name'].filter(Boolean);
          const storeCodeKeys = [storeCodeKey, 'store_code', 'Store Code'].filter(Boolean);
          storeNameKeys.forEach((key) => {
            if (submitFormData[tabId]?.[key] && storeNameFromLocation) {
              submitFormData[tabId][key].answer = storeNameFromLocation;
            }
          });
          storeCodeKeys.forEach((key) => {
            if (submitFormData[tabId]?.[key] && storeCodeFromLocation) {
              submitFormData[tabId][key].answer = storeCodeFromLocation;
            }
          });
        });
      }

      this.setState({
        submitFormData: submitFormData,
        StoreCode: storeCodeFromLocation,
        storeName: storeNameFromLocation,
        activeSubTab: this.props?.tabSubmitdata?.last_sub_tab || subtab?.[this.state.activeFormIndex]?.[0],
      });

      if (storeCodeFromLocation) {
        await this.props.fetchSubmittedData({
          campaign_id: campaignIdsParsed?.campaign_id,
          store_code: storeCodeFromLocation,
        });
      }

      if (this.props?.tabSubmitdata?.last_tab_index) {
        let index = isNaN(this.props?.tabSubmitdata?.last_tab_index + 1) ? 0 : this.props?.tabSubmitdata?.last_tab_index + 1;
        if (index >= subtab.length) index = 0;
        this.setState({
          activeFormIndex: index,
          activeFormId: tabs[this.props?.tabSubmitdata?.last_tab_index + 1]?.id ?? tabs[0]?.id,
          activeSubTab: this.props?.tabSubmitdata?.last_sub_tab || subtab?.[index]?.[0] || "",
          _id: this.props?.tabSubmitdata?._id,
        },
          () => {
            this.prefillData(submitFormData, tabs);
          });
      }
    } catch (error) {
      console.error('errorerror', error);
    }
  }

  prefillData(submitFormData, tabs) {
    this.props.tabSubmitdata?.multitab_data?.forEach((val, i) => {
      if (val?.questionnarie) {
        val.questionnarie.forEach((q) => {
          if (q?.label_key) {
            const existingAnswer = submitFormData[tabs[i]?.id]?.[q.label_key]?.answer;
            const normalizedKey = (q.label_key ?? '').toLowerCase().replace(/\s+/g, '_');
            const isStoreField = normalizedKey === 'store_name' || normalizedKey === 'store_code';
            // Preserve prefilled store_name/store_code from location.state when API value is empty
            const answer = isStoreField && (existingAnswer?.trim?.() ?? '') !== '' && !(q.answer?.trim?.() ?? '')
              ? existingAnswer
              : q.answer;
            submitFormData[tabs[i]?.id] = {
              ...submitFormData[tabs[i]?.id],
              [q.label_key]: {
                ...submitFormData[tabs[i]?.id]?.[q.label_key],
                answer,
                marks: q?.marks,
              },
            };
          }
        });
      }
    });
    this.setState({ submitFormData });
  }

  componentDidUpdate(prevProps, prevState) {
    const { form_data } = this.props;
    const { tabs, subtab } = form_data;

    // Sync data from server when it changes (preserve store name/code from location state)
    if (prevProps.tabSubmitdata !== this.props.tabSubmitdata && this.props.tabSubmitdata && tabs?.length) {
      const currentSubmitFormData = JSON.parse(JSON.stringify(this.state.submitFormData));
      this.prefillData(currentSubmitFormData, tabs);
      this.setState({
        submitFormData: currentSubmitFormData,
        _id: this.props.tabSubmitdata?._id || this.state._id
      });
    }

    // Handle subtab reset when activeFormIndex changes
    // Removed because it was resetting subtab even on initial restore
    // if (prevState.activeFormIndex !== this.state.activeFormIndex) {
    //   this.setState({
    //     activeSubTab: subtab?.[this.state.activeFormIndex]?.[0] || "",
    //   });
    // }
  }

  handleOnChange = async (val, name, type, event) => {
    if (name === 'store_code') {
      this.setState({ StoreCode: val });
    }
    if (name === 'store_name') {
      this.setState({ storeName: val });
    }
    if (name === 'region') {
      this.setState({ regionform: val });
    }
    if (name === 'address') {
      this.setState({ address: val });
    }
    if (name === 'state') {
      this.setState({ state: val });
    }
    if (name === 'city') {
      this.setState({ city: val });
    }

    try {
      let currentFormData = this.state.submitFormData;
      let extradatatemp = this.state.extradata;

      let empty = currentFormData && // 👈 null and undefined check
        Object.keys(currentFormData).length === 0 &&
        Object.getPrototypeOf(currentFormData) === Object.prototype;

      if (empty) {
        currentFormData = this.props.form_data.answerContent;
      }
      let buildFormData = JSON.parse(JSON.stringify(currentFormData));
      if (type === 'image') {
        if (val && val.length > 0) {
          this.setState({ formDataSubmitting: true });
          try {
            const filesArray = Array.from(val);
            const localUrls = filesArray.map(file => URL.createObjectURL(file));
            buildFormData[this.state.activeFormId][name]['imageData'] = localUrls.join(',');
            
            this.setState({ submitFormData: buildFormData });

            const uploadPromises = filesArray.map(async (file) => {
              let formData = new FormData();
              formData.append('file', file);
              const response = await this.props.uploadFile(formData);
              return response.payload.data.data.result.file.filename;
            });

            const filenames = await Promise.all(uploadPromises);
            let updatedFormData = JSON.parse(JSON.stringify(this.state.submitFormData));
            updatedFormData[this.state.activeFormId][name]['answer'] = filenames.join(',');
            
            this.setState({
              submitFormData: updatedFormData,
              formDataSubmitting: false
            });
          } catch (uploadError) {
            console.error("Upload error:", uploadError);
            this.setState({ formDataSubmitting: false });
          }
          return;
        } else {
          // Handle image removal
          buildFormData[this.state.activeFormId][name]['imageData'] = "";
          buildFormData[this.state.activeFormId][name]['answer'] = "";
        }
      } else {
        if (name == 'store_name') {
          if (type && type.length > 0) {
            let optionIndex = event?.target?.dataset?.optionIndex;
            this.setState({ seleceStoreIndex: event?.target?.dataset?.optionIndex, });
            extradatatemp = type[optionIndex];
            Object.keys(type[optionIndex]).map((key) => {
              if (key != 'store_name' && key in buildFormData[this.state.activeFormId]) {
                buildFormData[this.state.activeFormId][key]['answer'] = type[optionIndex][key];
              }
            });
          }
        }
        if (name in buildFormData[this.state.activeFormId]) {
          buildFormData[this.state.activeFormId][name]['answer'] = val;
        } else {
          buildFormData[this.state.activeFormId][name] = {
            answer: val,
          };
        }
      }
      this.setState({
        extraData: extradatatemp,
        submitFormData: buildFormData,
      });
    } catch (e) {
      console.error('error', e);
    }
  };

  handleChange = (event, newValue) => {
    const { tabs, subtab } = this.props.form_data;
    const index = tabs.findIndex((tab) => tab.id === newValue);
    this.setState({
      activeFormId: newValue,
      activeFormIndex: index >= 0 ? index : this.state.activeFormIndex,
      activeSubTab: subtab?.[index]?.[0] || "",
    }, () => {
      this.handleOnSubmit(null, false);
    });
  };
  handleSubTabChange = (event, newValue) => {
    this.setState({
      activeSubTab: newValue,
    }, () => {
      this.handleOnSubmit(null, false);
    });
  };

  getAnswerSheet = (data) => {
    let answerSheet = [];

    for (let category in data) {

      let answerElement = {
        category: category,
        questionnarie: getQuestinaire(data[category], this.props.form_data.answerContent[category]),
      };

      answerSheet.push(answerElement);
    }
    return answerSheet;
  };

  handleOnSubmit = async (e, shouldIncrement = true) => {
    // handler
    if (e && e.preventDefault) e.preventDefault();

    const { tabs, subtab } = this.props.form_data;
    const { activeFormIndex, activeSubTab } = this.state;

    let user = isAuth();

    let nextActiveSubTab = activeSubTab;
    let nextActiveFormId = this.state.activeFormId;
    let nextActiveFormIndex = activeFormIndex;
    let isLastForm = false;

    if (shouldIncrement) {
      let isLastSubTab = true;
      if (subtab && subtab[activeFormIndex]?.length > 0) {
        const index = subtab[activeFormIndex].indexOf(activeSubTab);
        if (index !== subtab[activeFormIndex].length - 1) {
          nextActiveSubTab = subtab[activeFormIndex][index + 1];
          isLastSubTab = false;
        }
      }

      if (isLastSubTab) {
        const nextIndex = activeFormIndex + 1;
        if (nextIndex < tabs.length) {
          nextActiveFormIndex = nextIndex;
          nextActiveFormId = tabs[nextIndex]?.id;
          nextActiveSubTab = subtab?.[nextIndex]?.[0] || "";
        } else {
          isLastForm = true;
        }
      }
    }

    this.setState({
      formDataSubmitting: true,
    });


    if (user) {
      //file upload section
      var ourData = this.state.submitFormData;
      let firstPositionForm = this.props.form_data.tabs[0].id;
      let audit_detail = ourData[firstPositionForm];
      let allStores = this.props.form_data.extraStore;

      if (this.state.seleceStoreIndex) {
        // let index = this.state.seleceStoreIndex;
      } else {

        let index = allStores.findIndex((item) => item.store_name?.trim()?.toLowerCase() == audit_detail.store_name.answer?.trim()?.toLowerCase());

        if (index == -1) {
          let parts = audit_detail.store_name.answer.split('-');
          var desired_value = parts.slice(0, -1).join('-').trim();
          index = allStores.findIndex((item) => item.store_name == desired_value);
        }
      }

      let campaignIds = getCookie('campaingIds');
      let campaignIdsParsed = JSON.parse(campaignIds);

      user = user['data'];
      // Destructure necessary state and props
      const { StoreCode, regionform, storeName, city, state, submitFormData, activeFormId, activeFormIndex, _id } = this.state;
      const { formID, module_code } = this.props;

      // Get fallback data from `submitFormData`
      const fallbackData = submitFormData?.[activeFormId] ?? {};

      // Builder data common fields
      let builderData = {
        username: user.name,
        multitab_data: this.getAnswerSheet(ourData),
        store_code: StoreCode?.length > 0 ? StoreCode : fallbackData.store_code?.answer ?? '',
        region: regionform?.length > 0 ? regionform : fallbackData.region?.answer ?? '',
        store_name: storeName?.length > 0 ? storeName : fallbackData.store_name?.answer ?? '',
        city: city?.length > 0 ? city : fallbackData.city?.answer ?? '',
        state: state?.length > 0 ? state : fallbackData.state?.answer ?? '',
        campaign_id: campaignIdsParsed?.campaign_id,
        campaign_name: campaignIdsParsed?.campaign_name,
        all_tabs_submitted: tabs.length - 1 > activeFormIndex ? false : true,
        last_tab_submitted: activeFormId,
        last_tab_index: activeFormIndex,
        last_sub_tab: this.state.activeSubTab,
      };

      // Add user-specific fields
      if (user['user_type'] !== Role.user) {
        Object.assign(builderData, {
          updated_by: user.username,
          form_id: formID,
        });
      } else {
        Object.assign(builderData, {
          loginid: user.username,
          project_code: user.project_code,
          module_code,
        });
      }

      // Add `_id` if it exists



      var response = '';
      if (user['user_type'] === Role.user) {
        if (_id) {
          builderData['_id'] = _id;
        }
        response = await this.props.submitFormData(builderData);

        if (response?.payload?.status === 200) {
          // only for first time
          if (response?.payload?.data?.data?._id) {
            this.setState({
              _id: response?.payload?.data?.data?._id,
            });
          }

          if (shouldIncrement) {
            window.scrollTo({ top: 0, behavior: 'smooth', });
            if (isLastForm) {
              setTimeout(() => {
                this.setState({ formDataSubmitting: false });
                this.props.navigate('/store');
              }, 1500);
            } else {
              this.setState({
                activeSubTab: nextActiveSubTab,
                activeFormId: nextActiveFormId,
                activeFormIndex: nextActiveFormIndex,
                formDataSubmitting: false,
              });
            }
          } else {
            this.setState({
              formDataSubmitting: false,
            });
          }
        } else {
          this.setState({
            formDataSubmitting: false,
            snackBarOpen: true,
            snackbarMsg: 'Something went wrong',
          });
        }
      } else {
        response = await this.props.updateFormData(builderData);
        if (response.payload.status === 200) {
          if (shouldIncrement) {
            window.scrollTo({ top: 0, behavior: 'smooth', });
            if (isLastForm) {
              setTimeout(() => {
                this.setState({
                  formDataSubmitting: false,
                  snackBarOpen: true,
                  snackbarMsg: 'Form submitted successfully',
                });
                this.props.navigate('/admin');
              }, 1500);
            } else {
              this.setState({
                activeSubTab: nextActiveSubTab,
                activeFormId: nextActiveFormId,
                activeFormIndex: nextActiveFormIndex,
                formDataSubmitting: false,
              });
            }
          } else {
            this.setState({
              formDataSubmitting: false,
            });
          }
        } else {
          this.setState({
            formDataSubmitting: false,
            snackBarOpen: true,
            snackbarMsg: 'Something went wrong',
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
    const { tabs, subtab } = this.props.form_data;
    if (subtab && subtab?.[this.state.activeFormIndex]?.length > 0) {
      const index = subtab[this.state.activeFormIndex].indexOf(this.state.activeSubTab);
      if (index !== 0) {
        this.setState({
          activeSubTab: subtab?.[this.state.activeFormIndex]?.[index - 1],
        });
        return;
      }
    }
    if (this.state.activeFormIndex > 0) {
      const prevIndex = this.state.activeFormIndex - 1;
      this.setState({
        activeFormId: tabs[prevIndex].id,
        activeFormIndex: prevIndex,
        activeSubTab: subtab?.[prevIndex]?.[0] || "",
      });
    }
  };

  getFormDataWithStorePrefill(activeFormId, submitFormData, formContent) {
    const base = submitFormData[activeFormId] ?? {};
    const storeObj = this.props.location?.state;
    const storeName = storeObj?.store_name ?? storeObj?.storeName ?? '';
    const storeCode = storeObj?.store_code ?? storeObj?.storeCode ?? '';
    if (!storeName && !storeCode) return base;

    const merged = { ...base };
    const setIfEmpty = (key, value) => {
      const current = merged[key]?.answer?.trim?.() ?? '';
      if (!current && value) {
        merged[key] = { ...(merged[key] || {}), answer: value };
      }
    };
    const fields = formContent?.[activeFormId] ?? [];
    fields.forEach((f) => {
      const key = f?.attributes?.props?.name;
      if (!key) return;
      const label = (f?.label ?? '').toLowerCase().trim();
      if (label === 'store name') setIfEmpty(key, storeName);
      if (label === 'store code') setIfEmpty(key, storeCode);
    });
    ['store_name', 'Store Name', 'store_code', 'Store Code'].forEach((key) => {
      if (key === 'store_name' || key === 'Store Name') setIfEmpty(key, storeName);
      if (key === 'store_code' || key === 'Store Code') setIfEmpty(key, storeCode);
    });
    return merged;
  }

  render() {
    const { activeFormId, activeFormIndex, submitFormData } = this.state;
    const { formDataLoading, form_data, fetchSubmitDataLoading, defaultFormDataLoading, } = this.props;
    const { tabs, formContent, subtab } = form_data ?? {};

    if (formDataLoading) {
      return (
        <>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ height: '100%' }}
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
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={this.state.activeFormId}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
                      backgroundColor: '#F5F5F5',
                    }}
                  >
                    {tabs?.map((item, i) => {
                      const lastSubmittedIndex = this.props.tabSubmitdata?.last_tab_index;
                      const progressIndex = isNaN(lastSubmittedIndex + 1) ? 0 : lastSubmittedIndex + 1;
                      const isTabDisabled = i > progressIndex;

                      return (
                        <Tab
                          value={item?.id}
                          label={item?.label}
                          wrapped
                          key={i}
                          disabled={isTabDisabled}
                        />
                      );
                    })}
                  </Tabs>
                </Box>
              </TabContext>
              {subtab && subtab[activeFormIndex]?.length > 0 && (
                <TabContext value={this.state.activeSubTab}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
                        backgroundColor: '#F5F5F5',
                      }}
                    >
                      {subtab[activeFormIndex]?.map((item, i) => {
                        return (
                          <Tab value={item} label={item} wrapped key={i} />
                        );
                      })}
                    </Tabs>
                  </Box>
                </TabContext>
              )}
            </Box>
            <Container>
              {activeFormId ? (
                <Form
                  activeFormId={activeFormId}
                  handleOnSubmit={this.handleOnSubmit}
                  handleOnPrev={this.handleOnPrev}
                  handleOnChange={this.handleOnChange}
                  formContent={formContent?.[activeFormId]}
                  formData={this.getFormDataWithStorePrefill(activeFormId, submitFormData, formContent)}
                  isNextValid={
                    this.state.activeFormIndex <
                    (this.props.form_data?.tabs?.length ?? 1) - 1
                  }
                  selectedSubTab={this.state.activeSubTab}
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
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
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
            sx={{ width: '100%' }}
          >
            {this.state.snackbarMsg}
          </Alert>
        </Snackbar>
      </>
    );
  }
}

export default withNavigate(FormContainer);
