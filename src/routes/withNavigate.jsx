import { useNavigate, useParams, useLocation } from "react-router-dom";

const withNavigate = (Component) => (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation(); // Include location
  return <Component {...props} navigate={navigate} params={params} location={location} />;
};

export default withNavigate;
