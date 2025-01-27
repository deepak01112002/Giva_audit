import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { getStoreData, setStoreCreds} from "../../store/FormStore/formSlice";


const mapStateToProps = (state) => {
  
  return {
    storeCreds: state.formData.storeCreds,
    storeData: state.formData.storeData
  };
}; 

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getStoreData: getStoreData, setStoreCreds:setStoreCreds }, dispatch);

const StoreStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);

export default StoreStore;
