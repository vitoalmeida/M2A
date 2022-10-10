import SearchForm from "../components/pages/companies/SearchForm";
import Layout from "../components/Layout";
import Results from "../components/pages/users/Results";
import { Helmet } from "react-helmet";

const Users = () => (
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

export default Users;
