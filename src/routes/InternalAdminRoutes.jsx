
import { Routes, Route, Navigate } from "react-router-dom";
import AdminView from "../pages/admin/layout/AdminView";
import EditViem from "../pages/admin/layout/EditView";
import Result from "../pages/admin/Result";
import InternalAdminView from "../pages/internalAdmin/InternalAdminView";

export default function InternalAdminRoutes() {
  return (
    <Routes>
      <Route exact path="/admin" element={<InternalAdminView />} />
      <Route exact path="/admin/dashboard" element={<EditViem />} />
      <Route exact path="/admin/result" element={<Result />} />
      <Route path="*" element={<Navigate replace to="/admin" />} />
    </Routes>
  );
}
