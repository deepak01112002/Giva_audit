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
    resetAdminState: (state, action) => {
      state = {};
    },
  },
  extraReducers: {
    // Get user new list
    [fetchUsers.pending]: (state, action) => {
      state.user_data_loading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.user_data_list = action.payload;
      state.user_data_loading = false;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.user_data_loading = false;
    },
    [fetchSubmitData.pending]: (state, action) => {
      state.submitDataLoading = true;
    },
    [fetchSubmitData.fulfilled]: (state, action) => {
      state.submitData = action.payload;
      state.submitDataLoading = false;
    },
    [fetchSubmitData.rejected]: (state, action) => {
      state.submitDataLoading = false;
    },
    [fetchPdfData.pending]: (state, action) => {
      state.pdfDataLoading = true;
    },
    [fetchPdfData.fulfilled]: (state, action) => {
      state.pdfData = action.payload.data;
      state.pdfDataLoading = false;
    },
    [fetchPdfData.rejected]: (state, action) => {
      state.pdfDataLoading = false;
    },
    [fetchPdfData.pending]: (state, action) => {
      state.pdfDataLoading = true;
    },
    [fetchPdfData.fulfilled]: (state, action) => {
      state.pdfData = action.payload.data;
      state.pdfDataLoading = false;
    },
    [fetchPdfData.rejected]: (state, action) => {
      state.pdfDataLoading = false;
    }, 

    // delete audit
    [delete_audit.pending]: (state, action) => {
      state.deleteAuditLoading = true;
    },
    [delete_audit.fulfilled]: (state, action) => {
      state.submitData = action.payload;
      state.deleteAuditLoading = false;
    },
    [delete_audit.rejected]: (state, action) => {
      state.deleteAuditLoading = false;
    }, 

    [setFormCreds.pending]: (state, action) => {
      state.userID = "";
      state.formID = "";
    },
    [setFormCreds.fulfilled]: (state, action) => {
      state.userID = action.payload.userID;
      state.formID = action.payload.formID;
    },
    [setFormCreds.rejected]: (state, action) => {
      state.userID = "";
      state.formID = "";
    },
    [getCompaign.pending]: (state, action) => {
      state.compaignList = "";
    },
    [getCompaign.fulfilled]: (state, action) => {
      state.compaignList = action.payload;
    },
    [getCompaign.rejected]: (state, action) => {
      state.compaignList = "";
    },
    //Region

    [getRegions.pending]: (state, action) => {
      state.regionList = "";
    },
    [getRegions.fulfilled]: (state, action) => {
      state.regionList = action.payload;
    },
    [getRegions.rejected]: (state, action) => {
      state.regionList = "";
    },

    //cities 
    [getCities.pending]: (state, action) => {
      state.citiesList = "";
    },
    [getCities.fulfilled]: (state, action) => {
      state.citiesList = action.payload;
    },
    [getCities.rejected]: (state, action) => {
      state.citiesList = "";
    },

    //states
    [getStates.pending]: (state, action) => {
      state.statesList = "";
    },
    [getStates.fulfilled]: (state, action) => {
      state.statesList = action.payload;
    },
    [getStates.rejected]: (state, action) => {
      state.statesList = "";
    },
    [setFormCreds]: (state, action) => {
      state.userID = action.payload.userID;
      state.formID = action.payload.formID;
    },
  },
});

export const { setActiveFormId, resetAdminState } = internalAdminSlice.actions;

export default internalAdminSlice.reducer;
