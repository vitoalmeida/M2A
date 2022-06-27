import { Tab } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { InputFormik, SelectFormik } from "../components";
import Results from "../components/pages/companies/Results";
import SearchForm from "../components/pages/companies/SearchForm";
import Layout from "../components/Layout";
import { CompaniesActions } from "../redux/companies";
import { GeneralActions } from "../redux/general";
import { Helmet } from "react-helmet";
import { useSelector } from "../redux/hooks";

function Companies() {
  const { companies } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CompaniesActions.getCompaniesRequest());
  }, []);

  return (
    <>
      <Helmet>
        <title>Empresas - M2A</title>
        <meta name="description" content="Login to M2A application" />
      </Helmet>
      <Layout>
        <SearchForm />
        <Results />
      </Layout>
    </>
  );
}

export default Companies;
