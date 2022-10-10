import { Formik, Form, useFormik } from "formik";
import { InputFormik, SelectFormik, Button } from "../../../index";
import formSchema from "./formSchema";
import { IoMdTrash, IoMdSearch } from "react-icons/io";
import { useSelector } from "../../../../redux/hooks";

const initialValues: any = {
  pesquisa: "",
  uf: "",
  empresa_vinculada: "",
  arrecadacao: "",
  setor: "",
};

const SearchForm = () => {
  const { general, companies } = useSelector((state) => state);

  function handleReset(resetForm) {
    if (window.confirm("Deseja limpar os filtros?")) {
      resetForm();
    }
  }

  function handleSubmit(values) {
    console.log(values);
  }

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      {...formSchema}
    >
      {(formProps) => (
        <Form>
          <div className="md:flex md:justify-around mt-5 w-full">
            <div className="flex flex-col w-full md:pr-5">
              <InputFormik
                label="Pesquisar"
                name="pesquisa"
                placeholder="Nome da empresa"
              />
            </div>
            <div className="flex flex-col w-full md:px-5">
              <SelectFormik label="Estado" name="uf" data={general.uf} />
            </div>
            <div className="flex flex-col w-full md:px-5">
              <SelectFormik
                label="Emp. vinculada"
                name="empresa_vinculada"
                data={companies.masterCompanies}
              />
            </div>
            <div className="flex flex-col w-full md:px-5">
              <SelectFormik
                label="Arrecadação"
                name="arrecadacao"
                data={general.collectionValues}
              />
            </div>
            <div className="flex flex-col w-full md:pl-5">
              <SelectFormik label="Setor" name="setor" data={general.sectors} />
            </div>
          </div>
          <div className="-mt-3 flex w-full gap-x-5 justify-end">
            <Button
              onClick={() => handleReset(formProps.resetForm)}
              title="Limpar"
              type="reset"
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
