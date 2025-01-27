import { Routes, Route, Navigate } from "react-router-dom";
import AdminLoginPage from "../pages/public/AdminLoginPage.jsx";
import LoginPage from "../pages/public/LoginPage.jsx";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />

      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default PublicRoutes;
