import { Tab } from "@headlessui/react";
import { Formik, Field, Form, useFormikContext } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AccountActions } from "../../../redux/account";
import { GeneralActions } from "../../../redux/general";
import { useSelector } from "../../../redux/hooks";
import Button from "../../Button";
import { InputFormik, SelectFormik, ToggleFormik } from "../../index";
import formSchema from "./formSchema";
import { FaArrowRight } from "react-icons/fa";
import { CompaniesActions } from "../../../redux/companies";
import * as helpers from "../../../helpers/index";
import { Company } from "../../../redux/companies/types";

interface Props {
  changeTab: () => any;
}

const DadosDaEmpresa = ({ changeTab }: Props) => {
  const dispatch = useDispatch();
  const { general, account, companies } = useSelector((state) => state);

  const initialValues: Company = {
    cnpj: companies?.editCompany?.cnpj,
    razao_social: companies?.editCompany?.razao_social,
    fantasia: companies?.editCompany?.fantasia,
    num_empregados: companies?.editCompany?.num_empregados || "0",
    dt_ano_inicio: companies?.editCompany?.dt_ano_inicio,
    master: companies?.editCompany?.master,
    bool_master: companies?.editCompany?.bool_master,
    inscricao_estadual: companies?.editCompany?.inscricao_estadual,
    // grupo: companies?.editCompany?.grupo,
    segmento: companies?.editCompany?.segmento,
    setor: companies?.editCompany?.setor,
    tipo_industria: companies?.editCompany?.tipo_industria,
    // faturamento: companies?.editCompany?.faturamento,
    // projeto: companies?.editCompany?.projeto,
    endereco: companies?.editCompany?.endereco,
    // valor_arrecadacao: companies?.editCompany?.valor_arrecadacao,
  };

  function handleSubmit(values: Company) {
    if (values.bool_master) {
      values.master = null;
    }
    if (values.master) {
      values.bool_master = false;
    }
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
      {({ values }) => (
        <Form>
          <div className="flex pt-4 w-full">
            <div className="md:col-span-2 w-full">
              <div className="grid grid-cols-12 sm:gap-x-6 w-full">
                <div className="flex w-full mx-auto flex-col col-span-12 sm:col-span-7">
                  <InputFormik
                    placeholder="00.000.000/0001-00"
                    required
                    type="number"
                    name="cnpj"
                    label="CNPJ"
                  />
                </div>
                <div className="col-span-12 mx-auto  w-full sm:col-span-5">
                  <InputFormik
                    placeholder="000000000.00-00"
                    type="number"
                    name="inscricao_estadual"
                    label="Inscrição estadual"
                  />
                </div>

                <div className="flex w-full mx-auto flex-col col-span-12 sm:col-span-5">
                  <InputFormik
                    placeholder="Mécanica Exemplo Ltda."
                    required
                    name="razao_social"
                    label="Razão social"
                  />
                </div>
                <div className="flex mx-auto w-full flex-col col-span-12 sm:col-span-7">
                  <InputFormik
                    placeholder="Mécanica Exemplo"
                    required
                    name="fantasia"
                    label="Nome Fantasia"
                  />
                </div>

                <div className="flex mx-auto w-full flex-col col-span-12 sm:col-span-7">
                  <SelectFormik
                    required
                    name="tipo_industria"
                    label="Tipo de indústria"
                    data={general.industryTypes}
                  />
                </div>
                <div className="flex mx-auto w-full flex-col col-span-12 sm:col-span-5">
                  <InputFormik
                    placeholder=""
                    required
                    name="num_empregados"
                    type="number"
                    label="Número de empregados"
                  />
                </div>

                <div className="flex mx-auto w-full flex-col col-span-12 sm:col-span-5">
                  <InputFormik
                    placeholder=""
                    required
                    name="dt_ano_inicio"
                    label="Ano de início"
                    type="date"
                  />
                </div>
                <div className="flex mx-auto w-full flex-col col-span-12 sm:col-span-7">
                  <SelectFormik
                    required
                    name="setor"
                    label="Setor"
                    data={general.sectors}
                  />
                </div>

                <div className="flex mx-auto w-full flex-col col-span-12 sm:col-span-7">
                  <SelectFormik
                    placeholder=""
                    disabled={values.bool_master ? true : false}
                    required={values.bool_master ? false : true}
                    name="master"
                    label="Empresa Vinculada"
                    data={companies.masterCompanies}
                  />
                </div>
                <div className="flex mx-auto w-full flex-col col-span-12 sm:col-span-5">
                  <SelectFormik
                    required
                    name="segmento"
                    label="Segmento"
                    data={general.segments}
                  />
                </div>

                {/* <div className="flex mx-auto w-full flex-col col-span-12 sm:col-span-7">
                    <InputFormik required name="grupo" label="Grupo" />
                  </div> */}
                {/* <div className="flex mx-auto w-full flex-col col-span-12 sm:col-span-5">
                <InputFormik required name="projeto" label="Projeto" />
              </div> */}
                <ToggleFormik
                  disabled={values.master ? true : false}
                  name="bool_master"
                  label="Empresa master"
                />
              </div>
            </div>
          </div>

          <div className="mt-5 w-full mx-auto">
            <Button
              title="Próximo"
              loading={account.loading}
              icon={<FaArrowRight />}
              iconRight
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DadosDaEmpresa;
