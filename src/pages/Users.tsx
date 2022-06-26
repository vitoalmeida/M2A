import { useEffect } from "react";
import { useDispatch } from "react-redux";
import SearchForm from "../components/companies/SearchForm";
import Layout from "../components/Layout";
import Results from "../components/users/Results";
import { AccountActions } from "../redux/account";
import { Helmet } from "react-helmet";
import { useSelector } from "../redux/hooks";

function Users() {
  const { account } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AccountActions.getAccountsRequest());
  }, []);

  // Usuários estão aqui:
  // Lembrando que são dois tipos de user que aparecem nessa tela:
  // Administrador e Consultor
  // E eles tem telas de edição com forms diferentes

  // TB_ADMINISTRADOR:
  // nome, sobrenome e cpf

  // TB_CONSULTOR:
  // nome, sobrenome, telefone, celular, formacao, uf, e cpf

  console.log(account.accountList);

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
