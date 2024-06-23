import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./FormStore/formSlice";
import internalAdminSlice from "./InternalAdminStore/InternalAdminSlice";

const store = configureStore({
  reducer: {
    formData: formSlice,
    internalAdmin: internalAdminSlice
  },
});

export { store };
