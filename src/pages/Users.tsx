import { useEffect } from "react";
import { useDispatch } from "react-redux";
import SearchForm from "../components/pages/companies/SearchForm";
import Layout from "../components/Layout";
import Results from "../components/pages/users/Results";
import { AccountActions } from "../redux/account";
import { Helmet } from "react-helmet";
import { useSelector } from "../redux/hooks";

function Users() {
  const { account } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AccountActions.getAccountsRequest());
  }, []);

  return (
    <>
      <Helmet>
        <title>Usuários - M2A</title>
        <meta name="description" content="Login to M2A application" />
      </Helmet>

      <Layout>
        <SearchForm />
        <Results />
      </Layout>
    </>
  );
}

export default Users;
