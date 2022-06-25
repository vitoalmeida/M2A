import { Formik, Form } from "formik";
import { InputFormik, SelectFormik, Button } from "../../index";
import formSchema from "./formSchema";
import { IoMdTrash, IoMdSearch } from "react-icons/io";

const SearchForm = () => {
  function handleSubmit(values) {
    console.log(values);
  }

  return (
    <Formik onSubmit={handleSubmit} {...formSchema}>
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
            <SelectFormik
              label="Estado"
              name="uf"
              data={[
                { id: 1, label: "test" },
                { id: 2, label: "test2" },
              ]}
            />
          </div>
          <div className="flex flex-col w-full md:px-5">
            <SelectFormik
              label="Emp. vinculada"
              name="empresa_vinculada"
              data={[
                { id: 1, label: "test" },
                { id: 2, label: "test2" },
              ]}
            />
          </div>
          <div className="flex flex-col w-full md:px-5">
            <SelectFormik
              label="Arrecadação"
              name="arrecadacao"
              data={[
                { id: 3, label: "test" },
                { id: 4, label: "test2" },
              ]}
            />
          </div>
          <div className="flex flex-col w-full md:pl-5">
            <SelectFormik
              label="Setor"
              name="setor"
              data={[
                { id: 1, label: "test" },
                { id: 2, label: "test2" },
              ]}
            />
          </div>
        </div>
        <div className="-mt-3 flex w-full gap-x-5 justify-end">
          <Button title="Limpar" color="#ff8282" icon={<IoMdTrash />} />

          <Button title="Filtrar" icon={<IoMdSearch />} />
        </div>
      </Form>
    </Formik>
  );
};

export default SearchForm;
