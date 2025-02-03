import withNavigate from "../../routes/withNavigate";
import FormContainer from "./FormContainer";
import FormStore from "./FormStore";

export default withNavigate(FormStore(FormContainer));
