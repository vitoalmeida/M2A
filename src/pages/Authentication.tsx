import { useDispatch } from "react-redux";
import { useSelector } from "../redux/hooks";
import { Helmet } from "react-helmet";
import AuthRegion from "../components/pages/authentication";
import { GeneralActions } from "../redux/general";
import { useEffect, useState } from "react";

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
        <AuthRegion />
      </div>
    </>
  );
}

export default Authentication;
