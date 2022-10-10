import Results from "../components/pages/companies/Results";
import SearchForm from "../components/pages/companies/SearchForm";
import Layout from "../components/Layout";
import { Helmet } from "react-helmet";

const Companies = () => (
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

export default Companies;
