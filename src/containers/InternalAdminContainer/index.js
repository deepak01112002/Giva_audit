import withNavigate from "../../routes/withNavigate";
import InternalAdminContainer from "./InternalAdminContainer";
import InternalAdminStore from "./InternalAdminStore";

export default withNavigate(InternalAdminStore(InternalAdminContainer))