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

const SearchForm = () => {
  const { general, companies } = useSelector((state) => state);
  const navigate = useNavigate();
  const { search } = useLocation();
  const { loading } = general;

  const params = getRouterParams(search);

  const initialValues: any = {
    query: params.query || "",
    uf: params.uf || "",
    empresa_vinculada: params.empresa_vinculada || "",
    arrecadacao: params.arrecadacao || "",
    setor: params.setor || "",
  };

  function handleReset(resetForm, setValues) {
    if (window.confirm("Deseja limpar os filtros?")) {
      resetForm({
        query: "",
        uf: "",
        empresa_vinculada: "",
        arrecadacao: "",
        setor: "",
      });

      setValues({
        query: "",
        uf: "",
        empresa_vinculada: "",
        arrecadacao: "",
        setor: "",
      });
      navigate("/companies");
    }
  }

  function handleSubmit(values) {
    let queryString = formatQueryString({ ...params, page: 1 }, values);

    navigate(`/companies${queryString ? queryString : ""}`);
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
                label="Pesquisar"
                name="query"
                placeholder="Nome da empresa"
              />
            </div>
            <div className="flex flex-col w-full md:px-5">
              <SelectFormik
                disabled={general.uf?.length ? false : true}
                label="Estado"
                name="uf"
                data={general.uf}
              />
            </div>
            <div className="flex flex-col w-full md:px-5">
              <SelectFormik
                disabled={companies.masterCompanies?.length ? false : true}
                label="Emp. vinculada"
                name="empresa_vinculada"
                data={companies.masterCompanies}
              />
            </div>
            <div className="flex flex-col w-full md:px-5">
              <SelectFormik
                disabled={general.collectionValues?.length ? false : true}
                label="Arrecadação"
                name="arrecadacao"
                data={general.collectionValues}
              />
            </div>
            <div className="flex flex-col w-full md:pl-5">
              <SelectFormik
                disabled={general.sectors?.length ? false : true}
                label="Setor"
                name="setor"
                data={general.sectors}
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
