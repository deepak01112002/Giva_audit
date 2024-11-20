
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { isAuth } from "../helpers/cookies.js";
import PublicRoutes from "./PublicRoutes.jsx";
import AdminRoutes from "./AdminRoutes.jsx";
import InternalAdminRoutes from "./InternalAdminRoutes.jsx";
import Role from "../utils/roles.js"

function Index() {
  const isAuthData = isAuth();
  return (
    <>
      <Router>
        <Routes>
          {isAuthData && isAuthData.data ? (
            isAuthData.data.user_type===Role.internalAdmin || isAuthData.data.user_type===Role.admin ? (
              <Route path="/*" element={<InternalAdminRoutes />} />
            ) : isAuthData.data.user_type===Role.user ? (
              <Route path="/*" element={<AdminRoutes />} />
            ) : (
              <Route path="/*" element={<PublicRoutes />} />
            )
          ) : (
            <Route path="/*" element={<PublicRoutes />} />
          )}
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default Index;
