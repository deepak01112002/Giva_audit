import withNavigate from "../../routes/withNavigate";
import CategoryContainer from "./CategoryContainer";
import CategoryStore from "./CategoryStore";

export default withNavigate(CategoryStore(CategoryContainer));
