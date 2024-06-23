import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllCategoryApi,
  getAllSubCategoryApi,
  getFormDataApi,
  getStoreDataApi,
  submitFormDataApi,
  updateAuditData,
  uploadFileApi,
} from "./formApi";
import { parseData, parseStoreData } from "./formParser";

// get api configuration
export const getFormData = createAsyncThunk("getFormData", async (payload) => {
  try {
    const response = await getFormDataApi(payload);
    const data = await parseData(response);
    return data;
  } catch (error) {
    throw new Error(error);
  }
});

export const getStoreData = createAsyncThunk("getStoreData", async () => {
  try {
    const response = await getStoreDataApi();
    const data = parseStoreData(response);
    return data;
  } catch (error) {
    throw new Error(error);
  }
});
export const getAllCategory = createAsyncThunk("getAllCategory", async () => {
  try {
    const response = await getAllCategoryApi();
    // const data = parseStoreData(response);
    return response.data.data;
  } catch (error) {
    throw new Error(error);
  }
});
export const getAllSubCategory = createAsyncThunk("getAllSubCategory", async (params) => {
  try {
    const response = await getAllSubCategoryApi(params);
    return response.data.data;
  } catch (error) {
    throw new Error(error);
  }
});

export const setStoreCreds = createAsyncThunk("setStoreCreds", (payload) => {
  return payload;
});

//submit form data slice
export const submitFormData = createAsyncThunk(
  "submitFormData",
  async (payload) => {
    try {
      const response = await submitFormDataApi(payload);
      //  const data = parseData(response);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const updateFormData = createAsyncThunk(
  "updateFormData",
  async (payload) => {
    try {
      const response = await updateAuditData(payload);
      //  const data = parseData(response);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const uploadFile = createAsyncThunk("uploadFile", async (payload) => {
  try {
    const response = await uploadFileApi(payload);
    //  const data = parseData(response);
    return response;
  } catch (error) {
    throw new Error(error);
  }
});

const initialState = {
  form_data: {},
  form_data_loading: false,

  submit_form_data_isLoading: false,
  submit_form_data_response: {},

  update_form_data_isLoading: false,

  //uploaded_files_data
  file_upload_loading: false,
  uploaded_file_data: {},
  extraValues: [],

  sub_category_data: [],
  sub_category_loading: false,
  category_data: [],
  category_loading: false,
  selectedCategoriesIds : {

  }
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    insertExtraVal: (state, action) => {
      state.extraValues = action.payload;
    },
    setSelectedCategoriesIds : (state, action) => {
      state.selectedCategoriesIds = action.payload
    }

  },
  extraReducers: {
    // Get new list
    [getFormData.pending]: (state, action) => {
      state.form_data_loading = true;
    },
    [getFormData.fulfilled]: (state, action) => {
      const data = action.payload;
      state.form_data = data;
      state.form_data_loading = false;
    },
    [getFormData.rejected]: (state, action) => {
      state.form_data_loading = false;
    },
    [submitFormData.pending]: (state, action) => {
      state.submit_form_data_isLoading = true;
    },
    [submitFormData.fulfilled]: (state, action) => {
      state.submit_form_data_response = action.payload;
      state.submit_form_data_isLoading = false;
    },
    [submitFormData.rejected]: (state, action) => {
      state.submit_form_data_isLoading = false;
    },
    [getStoreData.pending]: (state, action) => {
      state.storeDataLoading = true;
    },
    [getStoreData.fulfilled]: (state, action) => {
      state.storeData = action.payload;
      state.storeDataLoading = false;
    },
    [getStoreData.rejected]: (state, action) => {
      state.storeDataLoading = false;
    },
    [updateFormData.pending]: (state, action) => {
      state.update_form_data_isLoading = true;
    },
    [updateFormData.fulfilled]: (state, action) => {
      state.update_form_data_response = action.payload;
      state.update_form_data_isLoading = false;
    },
    [updateFormData.rejected]: (state, action) => {
      state.update_form_data_isLoading = false;
    },
    [setStoreCreds.fulfilled]: (state, action) => {
      state.storeCreds = action.payload;
    },
    [uploadFile.pending]: (state, action) => {
      state.file_upload_loading = true;
    },
    [uploadFile.fulfilled]: (state, action) => {
      state.uploaded_file_data = action.payload;
      state.file_upload_loading = false;
    },
    [uploadFile.rejected]: (state, action) => {
      state.file_upload_loading = false;
    },

    [getAllSubCategory.pending]: (state, action) => {
      state.sub_category_loading = true;
    },
    [getAllSubCategory.fulfilled]: (state, action) => {
      const data = action.payload;
      state.sub_category_data = data;
      state.sub_category_loading = false;
    },
    [getAllSubCategory.rejected]: (state, action) => {
      state.sub_category_loading = false;
    },
    [getAllCategory.pending]: (state, action) => {
      state.category_loading = true;
    },
    [getAllCategory.fulfilled]: (state, action) => {
      state.category_data = action.payload;
      state.category_loading = false;
    },
    [getAllCategory.rejected]: (state, action) => {
      state.category_loading = false;
    },
  },
});

export const { insertExtraVa, setSelectedCategoriesIds } = formSlice.actions
export default formSlice.reducer;
