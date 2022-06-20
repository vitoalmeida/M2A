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
import { FaArrowRight } from "react-icons/fa";
import { CompaniesActions } from "../../../redux/companies";
import * as helpers from "../../../helpers/index";

interface Props {
  changeTab: () => any;
}

const DadosDaEmpresa = ({ changeTab }: Props) => {
  const dispatch = useDispatch();
  const { general, account, companies } = useSelector((state) => state);

  const initialValues: any = {
    cnpj: companies?.editCompany?.cnpj,
    razao_social: companies?.editCompany?.razao_social,
    fantasia: companies?.editCompany?.fantasia,
    num_empregados: companies?.editCompany?.num_empregados,
    dt_ano_inicio: companies?.editCompany?.dt_ano_inicio,
    bool_master: companies?.editCompany?.bool_master,
    inscricao_estadual: companies?.editCompany?.inscricao_estadual,
    grupo: companies?.editCompany?.grupo,
    segmento: companies?.editCompany?.segmento,
    setor: companies?.editCompany?.setor,
    tipo_industria: companies?.editCompany?.tipo_industria,
    faturamento: companies?.editCompany?.faturamento,
    projeto: companies?.editCompany?.projeto,
    endereco: companies?.editCompany?.endereco,
    valor_arrecadacao: companies?.editCompany?.valor_arrecadacao,
  };

  function handleSubmit(values) {
    const verifiedCompany = companies?.editCompany
      ? helpers.companies.verifyCompanyToEdit(companies?.editCompany, values)
      : values;

    dispatch(CompaniesActions.setEditCompany(verifiedCompany));
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
              <div className="flex w-full mx-auto flex-col col-span-12 sm:col-span-7">
                <InputFormik required name="cnpj" label="CNPJ" />
              </div>
              <div className="col-span-12 mx-auto  w-full sm:col-span-5">
                <InputFormik
                  name="inscricao_estadual"
                  label="Inscrição estadual"
                />
              </div>

              <div className="flex w-full mx-auto flex-col col-span-12 sm:col-span-5">
                <InputFormik
                  required
                  name="razao_social"
                  label="Razão social"
                />
              </div>
              <div className="flex mx-auto w-full flex-col col-span-12 sm:col-span-7">
                <InputFormik required name="fantasia" label="Nome Fantasia" />
              </div>

              <div className="flex mx-auto w-full flex-col col-span-12 sm:col-span-7">
                <InputFormik
                  required
                  name="tipo_industria"
                  label="Tipo de indústria"
                />
              </div>
              <div className="flex mx-auto w-full flex-col col-span-12 sm:col-span-5">
                <InputFormik
                  required
                  name="num_empregados"
                  type="number"
                  label="Número de empregados"
                />
              </div>

              <div className="flex mx-auto w-full flex-col col-span-12 sm:col-span-5">
                <InputFormik
                  required
                  name="dt_ano_inicio"
                  label="Ano de início"
                />
              </div>
              <div className="flex mx-auto w-full flex-col col-span-12 sm:col-span-7">
                <InputFormik
                  required
                  name="valor_arrecadacao"
                  label="Valor arrecadação"
                />
              </div>

              <div className="flex mx-auto w-full flex-col col-span-12 sm:col-span-7">
                <InputFormik required name="grupo" label="Grupo" />
              </div>
              <div className="flex mx-auto w-full flex-col col-span-12 sm:col-span-5">
                <InputFormik required name="segmento" label="Segmento" />
              </div>

              <div className="flex mx-auto w-full flex-col col-span-12 sm:col-span-5">
                <InputFormik required name="setor" label="Setor" />
              </div>
              <div className="flex mx-auto w-full flex-col col-span-12 sm:col-span-7">
                <InputFormik required name="faturamento" label="Faturamento" />
              </div>

              <div className="flex mx-auto w-full flex-col col-span-12 sm:col-span-7">
                <InputFormik
                  name="empresa_inculada"
                  label="Empresa Vinculada"
                />
              </div>
              <div className="flex mx-auto w-full flex-col col-span-12 sm:col-span-5">
                <InputFormik required name="projeto" label="Projeto" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 w-full mx-auto">
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

export default DadosDaEmpresa;
