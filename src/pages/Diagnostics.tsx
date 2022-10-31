import SearchForm from "../components/pages/diagnostics/SearchForm";
import Layout from "../components/Layout";
import { Helmet } from "react-helmet";
import Results from "../components/pages/diagnostics/Results";

const Diagnostics = () => (
  <>
    <Helmet>
      <title>Diagnósticos - M2A</title>
      <meta name="description" content="Login to M2A application" />
    </Helmet>
    <Layout>
      <SearchForm />
      <Results />
    </Layout>
  </>
);

export default Diagnostics;
