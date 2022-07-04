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
import { GeneralActions } from "../redux/general";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { CompaniesActions } from "../redux/companies";
import { QuestionnaireActions } from "../redux/questionnaire";

const Router = () => {
  const dispatch = useDispatch();
  const { account, general, companies } = useSelector((state) => state);
  const isAuthenticated = account.token;

  if (isAuthenticated) {
    configApi.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${account.token}`;
      return config;
    });
  }

  useEffect(() => {
    dispatch(CompaniesActions.getMasterCompaniesRequest());
    if (!general?.uf?.length) {
      // dispatch(GeneralActions.seedBackend());
      dispatch(QuestionnaireActions.getQuestionsRequest());
      dispatch(GeneralActions.getStaticValuesRequest());
    }
  }, [account.token]);

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
          element={
            isAuthenticated ? (
              !account.data.isCompany ? (
                <Companies />
              ) : (
                <Navigate to="/questionnaires" />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="questionnaires"
          element={isAuthenticated ? <Questionnaires /> : <Navigate to="/" />}
        />
        <Route
          path="diagnostics"
          element={
            isAuthenticated ? (
              !account.data.isCompany ? (
                <Diagnostics />
              ) : (
                <Navigate to="/questionnaires" />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="users"
          element={
            isAuthenticated ? (
              !account.data.isCompany ? (
                <Users />
              ) : (
                <Navigate to="/questionnaires" />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="questions"
          element={
            isAuthenticated ? (
              !account.data.isCompany ? (
                <Questions />
              ) : (
                <Navigate to="/questionnaires" />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CustomBrowserRouter>
  );
};

export default Router;
