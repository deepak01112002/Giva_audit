import { Routes, Route, Navigate } from "react-router-dom";
import AdminView from "../pages/admin/layout/AdminView.jsx";
import Result from "../pages/admin/Result.jsx";
import CategoryContainer from "../containers/CategoriesContainer/CategoryContainer.jsx";

const AdminRoutes = () => {
  return (
      <Routes>
      <Route exact path="/category" element={<CategoryContainer/>} />  
        <Route exact path="/dashboard" element={<AdminView />} />
        <Route exact path="/result" element={<Result />} />  
        <Route path="*" element={<Navigate replace to="/category" />} />
      </Routes>
  );
};

export default AdminRoutes;
