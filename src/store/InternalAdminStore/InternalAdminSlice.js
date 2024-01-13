import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPdfDataApi, fetchUsersApi, getCompaignListApi } from "./InternalAdminApis";
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

const initialState = {
  user_data_list: [],
  user_data_loading: false,

  pdfData: {},
  pdfDataLoading: false,

  submitData: {},

  submitDataLoading: false,

  compaignList : [],

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
    [setFormCreds]: (state, action) => {
      state.userID = action.payload.userID;
      state.formID = action.payload.formID;
    },
  },
});

export const { setActiveFormId, resetAdminState } = internalAdminSlice.actions;

export default internalAdminSlice.reducer;
