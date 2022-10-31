import { Formik, Form, useFormik } from "formik";
import { InputFormik, SelectFormik, Button } from "../../../index";
import formSchema from "./formSchema";
import { IoMdTrash, IoMdSearch } from "react-icons/io";
import { useSelector } from "../../../../redux/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import {
  formatQueryString,
  getRouterParams,
} from "../../../../helpers/formatData";
import { usersType } from "../helpers";

const SearchForm = () => {
  const { general, companies } = useSelector((state) => state);
  const navigate = useNavigate();
  const { search } = useLocation();
  const { loading } = general;

  const params = getRouterParams(search);

  const initialValues: any = {
    nome: params.nome || "",
    email: params.email || "",
    perfil: params.perfil || "",
  };

  function handleReset(resetForm, setValues) {
    if (window.confirm("Deseja limpar os filtros?")) {
      resetForm({
        nome: "",
        email: "",
        perfil: "",
      });

      setValues({
        nome: "",
        email: "",
        perfil: "",
      });
      navigate("/users");
    }
  }

  function handleSubmit(values) {
    let queryString = formatQueryString({ ...params, page: 1 }, values);

    navigate(`/users${queryString ? queryString : ""}`);
  }

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      {...formSchema}
    >
      {(formProps) => (
        <Form>
          <div className="z-0 md:flex md:justify-around mt-5 w-full">
            <div className="flex flex-col w-full md:pr-5">
              <InputFormik
                label="Nome"
                name="nome"
                placeholder="Ex.: Jõao Silva"
              />
            </div>
            <div className="flex flex-col w-full md:px-5">
              <InputFormik
                label="E-mail"
                name="email"
                placeholder="Ex.: joao@email.com"
              />
            </div>
            <div className="flex flex-col w-full  md:pl-5">
              <SelectFormik
                label="Tipo de perfil"
                name="perfil"
                data={usersType}
              />
            </div>
          </div>
          <div className="z-10 -mt-3 flex w-full gap-x-5 justify-end">
            <Button
              onClick={() =>
                handleReset(formProps.resetForm, formProps.setValues)
              }
              title="Limpar"
              type="button"
              color="#ff8282"
              icon={<IoMdTrash />}
            />

            <Button title="Filtrar" icon={<IoMdSearch />} />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SearchForm;
