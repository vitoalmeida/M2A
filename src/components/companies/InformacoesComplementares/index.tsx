import { Tab } from "@headlessui/react";
import { Formik, Field, Form } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AccountActions } from "../../../redux/account";
import { GeneralActions } from "../../../redux/general";
import { useSelector } from "../../../redux/hooks";
import Button from "../../Button";
import { InputFormik, SelectFormik } from "../../index";
import formSchema from "./formSchema";
import { FaSave } from "react-icons/fa";
import { CompaniesActions } from "../../../redux/companies";
import * as helpers from "../../../helpers/index";

interface Props {
  onSubmit: () => any;
}

const InformacoesComplementares = ({ onSubmit }: Props) => {
  const dispatch = useDispatch();
  const { general, account, companies } = useSelector((state) => state);

  const initialValues: any = {
    ds_negocio: companies?.editCompany?.ds_negocio,
    missao: companies?.editCompany?.missao,
    visao: companies?.editCompany?.visao,
    valores: companies?.editCompany?.valores,
  };

  function handleSubmit(values) {
    const verifiedCompany = companies?.editCompany
      ? helpers.companies.verifyCompanyToEdit(
          {
            ...companies?.editCompany,
            missao: values.missao,
            visao: values.visao,
            valores: values.valores,
            ds_negocio: values.ds_negocio,
          },
          companies?.editCompany
        )
      : values;

    dispatch(CompaniesActions.setEditCompany(verifiedCompany));
    onSubmit();
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
            <div className="grid grid-cols-12 sm:gap-x-12 w-full">
              <div className="flex flex-col col-span-12 sm:col-span-12">
                <InputFormik
                  textArea
                  name="ds_negocio"
                  label="Descreva seu negócio"
                />
              </div>
              <div className="flex flex-col col-span-12 sm:col-span-12">
                <InputFormik textArea name="missao" label="Missão" />
              </div>

              <div className="flex flex-col col-span-12 sm:col-span-12">
                <InputFormik textArea name="visao" label="Visão" />
              </div>
              <div className="flex flex-col col-span-12 sm:col-span-12">
                <InputFormik textArea name="valores" label="Valores" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Button
            title="Salvar"
            loading={companies.loading}
            icon={<FaSave />}
          />
        </div>
      </Form>
    </Formik>
  );
};

export default InformacoesComplementares;
