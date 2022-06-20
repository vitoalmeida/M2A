import { Formik, Field, Form } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AccountActions } from "../../../redux/account";
import { GeneralActions } from "../../../redux/general";
import { useSelector } from "../../../redux/hooks";
import Button from "../../Button";
import { InputFormik, SelectFormik } from "../../index";
import formSchema from "./formSchema";
import { FaArrowRight } from "react-icons/fa";
import { CompaniesActions } from "../../../redux/companies";
import * as helpers from "../../../helpers/index";

interface Props {
  changeTab: () => any;
}

const Endereco = ({ changeTab }: Props) => {
  const dispatch = useDispatch();
  const { general, account, companies } = useSelector((state) => state);

  const initialValues: any = {
    cep: companies?.editCompany?.endereco.cep,
    logradouro: companies?.editCompany?.endereco.logradouro,
    bairro: companies?.editCompany?.endereco.bairro,
    cidade: companies?.editCompany?.endereco.cidade,
    complemento: companies?.editCompany?.endereco.complemento,
    uf: companies?.editCompany?.endereco.uf,
    fax: companies?.editCompany?.fax,
    telefone: companies?.editCompany?.telefone,
    celular: companies?.editCompany?.celular,
  };

  function handleSubmit(values) {
    const verifiedCompany = companies?.editCompany
      ? helpers.companies.verifyCompanyToEdit(
          {
            ...companies?.editCompany,
            endereco: {
              ...values,
              uf: general.uf.find((uf) => uf.value === values.uf)?.id,
            },
            telefone: values.telefone,
            celular: values.celular,
            fax: values.fax,
          },
          companies?.editCompany
        )
      : values;

    dispatch(CompaniesActions.setEditCompany({ ...verifiedCompany }));
    changeTab();
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleSubmit({ ...values })}
      {...formSchema}
    >
      <Form className="sm:mx-10">
        <div className="flex pt-4 w-full">
          <div className="md:col-span-2 w-full">
            <div className="grid grid-cols-12 sm:gap-x-6 w-full">
              <div className="flex mx-auto w-full flex-col col-span-12 sm:col-span-7">
                <InputFormik required name="telefone" label="Telefone" />
              </div>
              <div className="flex mx-auto w-full flex-col col-span-12 sm:col-span-5">
                <InputFormik name="fax" label="Fax" />
              </div>
              <div className="flex mx-auto w-full flex-col col-span-12 sm:col-span-5">
                <InputFormik name="celular" label="Celular" />
              </div>
              <div className="flex w-60 sm:w-full flex-col col-span-12 sm:col-span-7">
                <InputFormik required name="cep" label="CEP" />
              </div>
              <div className="flex w-60 sm:w-full flex-col col-span-12 sm:col-span-7">
                <InputFormik name="logradouro" label="Logradouro" />
              </div>
              <div className="flex w-60 sm:w-full flex-col col-span-12 sm:col-span-5">
                <InputFormik name="bairro" label="Bairro" />
              </div>
              <div className="flex w-60 sm:w-full flex-col col-span-12 sm:col-span-4">
                <InputFormik name="cidade" label="Cidade" />
              </div>
              <div className="flex w-60 sm:w-full flex-col col-span-12 sm:col-span-4">
                <InputFormik name="complemento" label="Complemento" />
              </div>
              <div className="col-span-12 w-60 sm:w-full sm:col-span-4">
                <SelectFormik required name="uf" label="UF" data={general.uf} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Button
            title="Próximo"
            loading={account.loading}
            icon={<FaArrowRight />}
          />
        </div>
      </Form>
    </Formik>
  );
};

export default Endereco;
