import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllCategoryApi,
  getAllSubCategoryApi,
  getFormDataApi,
  getStoreDataApi,
  submitFormDataApi,
  updateAuditData,
  uploadFileApi,
  fetchSubmittedDataApi
} from "./formApi";
import { parseData, parseStoreData } from "./formParser";

// get api configuration
export const getFormData = createAsyncThunk("getFormData", async (payload) => {
  try {
    const response = await getFormDataApi(payload);
    const data = await parseData(response);
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error);
  }
});

export const fetchSubmittedData = createAsyncThunk("fetchSubmittedData", async (payload) => {
  try {
    const response = await fetchSubmittedDataApi(payload);
    const data = response.data.data;
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error);
  }
});

export const getStoreData = createAsyncThunk("getStoreData", async (payload) => {
  try {
    const response = await getStoreDataApi(payload);
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
  storeData:{},
  form_data_loading: false,

  tabSubmitdata: {},
  tabSubmitdata_loading: false,

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

  },
  selectedCampaignIds : {

  },
  selectedCampaignName : {

  }

};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    insertExtraVal: (state, action) => {
      state.extraValues = action.payload;
    },
    setSelectedCategoriesIds: (state, action) => {
      state.selectedCategoriesIds = action.payload;
    },
    setSelectedCampaignIds: (state, action) => {
      state.selectedCampaignIds = action.payload;
    },
    setSelectedCampaignName: (state, action) => {
      state.selectedCampaignName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get new list
      .addCase(getFormData.pending, (state) => {
        state.form_data_loading = true;
      })
      .addCase(getFormData.fulfilled, (state, action) => {
        state.form_data = action.payload;
        state.form_data_loading = false;
      })
      .addCase(getFormData.rejected, (state) => {
        state.form_data_loading = false;
      })
      // Get fetchSubmittedData 
      .addCase(fetchSubmittedData.pending, (state) => {
        state.tabSubmitdata = true;
        // state.tabSubmitdata_loading = true;
        state.form_data_loading = true;


      }
      )
      .addCase(fetchSubmittedData.fulfilled, (state, action) => {
        state.tabSubmitdata = action.payload;
        state.tabSubmitdata_loading = false;
        state.form_data_loading = false;

      }
      )
      .addCase(fetchSubmittedData.rejected, (state) => {
        state.tabSubmitdata_loading = false;
        state.form_data_loading = false;

      }
      )
      // Submit form data
      .addCase(submitFormData.pending, (state) => {
        state.submit_form_data_isLoading = true;
      })
      .addCase(submitFormData.fulfilled, (state, action) => {
        state.submit_form_data_response = action.payload;
        state.submit_form_data_isLoading = false;
      })
      .addCase(submitFormData.rejected, (state) => {
        state.submit_form_data_isLoading = false;
      })
      // Get store data
      .addCase(getStoreData.pending, (state) => {
        state.storeDataLoading = true;
      })
      .addCase(getStoreData.fulfilled, (state, action) => {
        state.storeData = action.payload;
        state.storeDataLoading = false;
      })
      .addCase(getStoreData.rejected, (state) => {
        state.storeDataLoading = false;
      })
      // Update form data
      .addCase(updateFormData.pending, (state) => {
        state.update_form_data_isLoading = true;
      })
      .addCase(updateFormData.fulfilled, (state, action) => {
        state.update_form_data_response = action.payload;
        state.update_form_data_isLoading = false;
      })
      .addCase(updateFormData.rejected, (state) => {
        state.update_form_data_isLoading = false;
      })
      // Upload file
      .addCase(uploadFile.pending, (state) => {
        state.file_upload_loading = true;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.uploaded_file_data = action.payload;
        state.file_upload_loading = false;
      })
      .addCase(uploadFile.rejected, (state) => {
        state.file_upload_loading = false;
      })
      // Get subcategory
      .addCase(getAllSubCategory.pending, (state) => {
        state.sub_category_loading = true;
      })
      .addCase(getAllSubCategory.fulfilled, (state, action) => {
        state.sub_category_data = action.payload;
        state.sub_category_loading = false;
      })
      .addCase(getAllSubCategory.rejected, (state) => {
        state.sub_category_loading = false;
      })
      // Get category
      .addCase(getAllCategory.pending, (state) => {
        state.category_loading = true;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.category_data = action.payload;
        state.category_loading = false;
      })
      .addCase(getAllCategory.rejected, (state) => {
        state.category_loading = false;
      })
      // Set store credentials
      .addCase(setStoreCreds.fulfilled, (state, action) => {
        state.storeCreds = action.payload;
      });
  },
});


export const { insertExtraVa, setSelectedCategoriesIds,setSelectedCampaignIds, setSelectedCampaignName } = formSlice.actions
export default formSlice.reducer;
