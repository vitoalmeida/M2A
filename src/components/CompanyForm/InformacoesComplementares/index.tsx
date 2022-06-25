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
import { Company } from "../../../redux/companies/types";
import { formacao, sexo } from "../../../helpers/staticData";

interface Props {
  onSubmit: () => any;
}

const InformacoesComplementares = ({ onSubmit }: Props) => {
  const dispatch = useDispatch();
  const { general, account, companies } = useSelector((state) => state);

  const initialValues: Company = {
    ds_negocio: companies?.editCompany?.ds_negocio,
    missao: companies?.editCompany?.missao,
    visao: companies?.editCompany?.visao,
    valores: companies?.editCompany?.valores,
    resp_nome: companies?.editCompany?.resp_nome,
    resp_sobrenome: companies?.editCompany?.resp_sobrenome,
    resp_email: companies?.editCompany?.resp_email,
    resp_sexo: companies?.editCompany?.resp_sexo,
    resp_formacao_academica: companies?.editCompany?.resp_formacao_academica,
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
            resp_nome: values.resp_sobrenome,
            resp_sobrenome: values.resp_sobrenome,
            resp_email: values.resp_email,
            resp_sexo: values.resp_sexo,
            resp_formacao_academica: values.resp_formacao_academica,
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
      <Form>
        <div className="flex pt-4 w-full">
          <div className="md:col-span-2 w-full">
            <div className="grid grid-cols-12 sm:gap-x-12 w-full">
              <div className="flex flex-col col-span-12 sm:col-span-6">
                <InputFormik
                  placeholder="João"
                  required
                  name="resp_nome"
                  label="Nome do responsável"
                />
              </div>
              <div className="flex flex-col col-span-12 sm:col-span-6">
                <InputFormik
                  placeholder="Silva"
                  required
                  name="resp_sobrenome"
                  label="Sobrenome do responsável"
                />
              </div>

              <div className="flex flex-col col-span-12 sm:col-span-6">
                <SelectFormik
                  required
                  name="resp_sexo"
                  label="Sexo do responsável"
                  data={sexo}
                />
              </div>
              <div className="col-span-12 sm:col-span-6">
                <SelectFormik
                  name="resp_formacao_academica"
                  placeholder="Superior"
                  label="Formação"
                  data={formacao}
                />
              </div>

              <div className="flex flex-col col-span-12 sm:col-span-12">
                <InputFormik
                  placeholder="exemplo@email.com"
                  required
                  name="resp_email"
                  label="Email do responsável"
                />
              </div>

              <div className="flex flex-col col-span-12 sm:col-span-6">
                <InputFormik
                  placeholder="Minha empresa é..."
                  textArea
                  name="ds_negocio"
                  label="Descreva seu negócio"
                />
              </div>
              <div className="flex flex-col col-span-12 sm:col-span-6">
                <InputFormik
                  placeholder="Nossa missão é..."
                  textArea
                  name="missao"
                  label="Missão"
                />
              </div>

              <div className="flex flex-col col-span-12 sm:col-span-6">
                <InputFormik
                  placeholder="Nossa visao é..."
                  textArea
                  name="visao"
                  label="Visão"
                />
              </div>
              <div className="flex flex-col col-span-12 sm:col-span-6">
                <InputFormik
                  placeholder="Nossos valores são.."
                  textArea
                  name="valores"
                  label="Valores"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Button
            title="Salvar"
            loading={companies.loading}
            icon={<FaSave />}
            iconRight
          />
        </div>
      </Form>
    </Formik>
  );
};

export default InformacoesComplementares;
