import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Authentication from "../pages/Authentication";
import Companies from "../pages/Companies";
import Diagnostics from "../pages/Diagnostics";
import Questionnaires from "../pages/Questionnaires";
import Users from "../pages/Users";
import { useSelector } from "../redux/hooks";
import { CustomBrowserRouter } from "./CustomBrowserRouter";
import configApi from "../services/config";
import NotFound from "../pages/NotFound";
import Questions from "../pages/Questions";

const Router = () => {
  const { account } = useSelector((state) => state);
  const isAuthenticated = account.token;

  if (isAuthenticated) {
    configApi.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${account.token}`;
      return config;
    });
  }

  // console.log(isAuthenticated);
  return (
    <CustomBrowserRouter basename={"/"}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/companies" /> : <Authentication />
          }
        />
        <Route
          path="companies"
          // element={<Companies />}
          element={isAuthenticated ? <Companies /> : <Authentication />}
        />
        <Route
          path="questionnaires"
          element={isAuthenticated ? <Questionnaires /> : <Authentication />}
        />
        <Route
          path="diagnostics"
          element={isAuthenticated ? <Diagnostics /> : <Authentication />}
        />
        <Route
          path="users"
          element={isAuthenticated ? <Users /> : <Authentication />}
        />
        <Route
          path="questions"
          element={isAuthenticated ? <Questions /> : <Authentication />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CustomBrowserRouter>
  );
};

export default Router;
