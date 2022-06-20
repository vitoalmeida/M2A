import { Tab } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { InputFormik, SelectFormik } from "../components";
import Results from "../components/companies/Results";
import SearchForm from "../components/companies/SearchForm";
import Layout from "../components/Layout";
import { CompaniesActions } from "../redux/companies";
import { GeneralActions } from "../redux/general";
import { Helmet } from "react-helmet";

function Companies() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CompaniesActions.getCompaniesRequest());
    dispatch(GeneralActions.getUfRequest());
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