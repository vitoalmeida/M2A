import SearchForm from "../components/companies/SearchForm";
import Layout from "../components/Layout";
import { Helmet } from "react-helmet";
import { useSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";

function Diagnostics() {
  const { account } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <>
      <Helmet>
        <title>Diagnósticos - M2A</title>
        <meta name="description" content="Login to M2A application" />
      </Helmet>
      <Layout>
        <SearchForm />
      </Layout>
    </>
  );
}

export default Diagnostics;
