import { useEffect } from "react";
import { useDispatch } from "react-redux";
import SearchForm from "../components/companies/SearchForm";
import Layout from "../components/Layout";
import Results from "../components/users/Results";
import { AccountActions } from "../redux/account";

function Questions() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AccountActions.getAccountsRequest());
  }, []);

  return (
    <Layout>
      <SearchForm />
      <Results />
    </Layout>
  );
}

export default Questions;
