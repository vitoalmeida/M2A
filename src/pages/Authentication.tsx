import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { AccountActions } from "../redux/account";
import { useSelector } from "../redux/hooks";
import { Helmet } from "react-helmet";
import AuthCard from "../components/authentication";

function Authentication() {
  const { account } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <>
      <Helmet>
        <title>Login - M2A</title>
        <meta name="description" content="Login to M2A application" />
      </Helmet>
      <div className="md:bg-auth-background bg-center bg-cover sm:px-10 flex h-screen w-screen flex-col justify-center">
        <AuthCard />
      </div>
    </>
  );
}

export default Authentication;
