  import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
  import {approveSamsungApi, deleteAuditApi, fetchPdfDataApi, fetchUsersApi, getCompaignListApi ,getRegionsListApi,getStatesListApi,getCitiesListApi} from "./InternalAdminApis";
  import {
    fetchedUserDataParser,
    parseSubmittedData,
  } from "./InternalAdminParser";

  // get api configuration
  export const fetchUsers = createAsyncThunk("fetchUsers", async (payload) => {
    try {
      const response = await fetchUsersApi(payload);
      const data = fetchedUserDataParser(response.data);

      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  });
  export const setFormCreds = createAsyncThunk(
    "setFormCreds",
    async (payload) => {
      return payload;
    }
  );



  // delete api/gmr/deleteAudit/
  export const delete_audit = createAsyncThunk(
    "delete_audit",
    async (payload) => {
      // console.log('deleteAuditLoading payload', payload)
      try {
        const response = await deleteAuditApi(payload);
        // const data = parseSubmittedData(response.data);
        alert(" Audit Deleted", response.status)
        // console.log(' delete_audit response', response)
        // return data;
      } catch (error) {
        throw new Error(error);
      }
    }
  );

  // Approve api/samsung/approve /
  export const approve_samsung = createAsyncThunk(
    "approve_samsung",
    async (payload) => {
      // console.log('deleteAuditLoading payload', payload)
      try {
        const response = await approveSamsungApi(payload);
        // const data = parseSubmittedData(response.data);
        alert(" Audit Approve", response.status)
        // console.log(' delete_audit response', response)
        // return data;
      } catch (error) {
        throw new Error(error);
      }
    }
  );

  export const fetchSubmitData = createAsyncThunk(
    "fetchSubmitData",
    async (payload) => {
      try {
        const response = await fetchPdfDataApi(payload);
        const data = parseSubmittedData(response.data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    }
  );

  export const fetchPdfData = createAsyncThunk(
    "fetchPdfData",
    async (payload) => {
      try {
        const response = await fetchPdfDataApi(payload);
        return response?.data ?? [];
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    }
  );

  export const getCompaign = createAsyncThunk(
    "getCompaign",
    async (payload) => {
      try {
        const response = await getCompaignListApi(payload);
        return response?.data ?? [];
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    }
  );

  export const getRegions = createAsyncThunk(
    "getRegions",
    async (payload) => {
      try {
        const response = await getRegionsListApi(payload);
        return response?.data ?? [];
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    }
  );

  export const getCities = createAsyncThunk(
    "getCities",
    async (payload) => {
      try {
        const response = await getCitiesListApi(payload);
        return response?.data ?? [];
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    }
  );

  export const getStates = createAsyncThunk(
    "getStates",
    async (payload) => {
      try {
        const response = await getStatesListApi(payload);
        return response?.data ?? [];
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    }
  );

  const initialState = {
    user_data_list: [],
    user_data_loading: false,

    pdfData: {},
    pdfDataLoading: false,

    submitData: {},

    submitDataLoading: false,

    compaignList: [],

    regionList:[],

    citiesList:[],

    statesList:[],

    //active form where we have to redirect
    activeFormId: {
      form_id: "",
      username: "",
    },
  };

  export const internalAdminSlice = createSlice({
    name: "internalAdmin",
    initialState,
    reducers: {
      setActiveFormId: (state, action) => {
        state.activeFormId = action.payload;
      },
      resetAdminState: () => initialState,
    },
    extraReducers: (builder) => {
      builder
        // Fetch Users
        .addCase(fetchUsers.pending, (state) => {
          state.user_data_loading = true;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
          state.user_data_list = action.payload;
          state.user_data_loading = false;
        })
        .addCase(fetchUsers.rejected, (state) => {
          state.user_data_loading = false;
        })
  
        // Fetch Submitted Data
        .addCase(fetchSubmitData.pending, (state) => {
          state.submitDataLoading = true;
        })
        .addCase(fetchSubmitData.fulfilled, (state, action) => {
          state.submitData = action.payload;
          state.submitDataLoading = false;
        })
        .addCase(fetchSubmitData.rejected, (state) => {
          state.submitDataLoading = false;
        })
  
        // Fetch PDF Data
        .addCase(fetchPdfData.pending, (state) => {
          state.pdfDataLoading = true;
        })
        .addCase(fetchPdfData.fulfilled, (state, action) => {
          state.pdfData = action.payload.data;
          state.pdfDataLoading = false;
        })
        .addCase(fetchPdfData.rejected, (state) => {
          state.pdfDataLoading = false;
        })
  
        // Delete Audit
        .addCase(delete_audit.pending, (state) => {
          state.deleteAuditLoading = true;
        })
        .addCase(delete_audit.fulfilled, (state) => {
          state.deleteAuditLoading = false;
        })
        .addCase(delete_audit.rejected, (state) => {
          state.deleteAuditLoading = false;
        })
  
        // Approve Samsung
        .addCase(approve_samsung.pending, (state) => {
          state.approveAuditLoading = true;
        })
        .addCase(approve_samsung.fulfilled, (state) => {
          state.approveAuditLoading = false;
        })
        .addCase(approve_samsung.rejected, (state) => {
          state.approveAuditLoading = false;
        })
  
        // Set Form Credentials
        .addCase(setFormCreds.pending, (state) => {
          state.userID = "";
          state.formID = "";
        })
        .addCase(setFormCreds.fulfilled, (state, action) => {
          state.userID = action.payload.userID;
          state.formID = action.payload.formID;
        })
        .addCase(setFormCreds.rejected, (state) => {
          state.userID = "";
          state.formID = "";
        })
  
        // Fetch Campaigns
        .addCase(getCompaign.pending, (state) => {
          state.compaignList = [];
        })
        .addCase(getCompaign.fulfilled, (state, action) => {
          state.compaignList = action.payload;
        })
        .addCase(getCompaign.rejected, (state) => {
          state.compaignList = [];
        })
  
        // Fetch Regions
        .addCase(getRegions.pending, (state) => {
          state.regionList = [];
        })
        .addCase(getRegions.fulfilled, (state, action) => {
          state.regionList = action.payload;
        })
        .addCase(getRegions.rejected, (state) => {
          state.regionList = [];
        })
  
        // Fetch Cities
        .addCase(getCities.pending, (state) => {
          state.citiesList = [];
        })
        .addCase(getCities.fulfilled, (state, action) => {
          state.citiesList = action.payload;
        })
        .addCase(getCities.rejected, (state) => {
          state.citiesList = [];
        })
  
        // Fetch States
        .addCase(getStates.pending, (state) => {
          state.statesList = [];
        })
        .addCase(getStates.fulfilled, (state, action) => {
          state.statesList = action.payload;
        })
        .addCase(getStates.rejected, (state) => {
          state.statesList = [];
        });
    },
  });
  
  export const { setActiveFormId, resetAdminState } = internalAdminSlice.actions;

  export default internalAdminSlice.reducer;
