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

const Faturamento = ({ changeTab }: Props) => {
  const dispatch = useDispatch();
  const { general, account, companies } = useSelector((state) => state);

  const initialValues: any = {
    valor_arrecadacao: companies?.editCompany?.valor_arrecadacao,
    faturamentoAno1: companies?.editCompany?.faturamento?.[0],
    faturamentoAno2: companies?.editCompany?.faturamento?.[1],
    faturamentoAno3: companies?.editCompany?.faturamento?.[2],
    faturamentoAno4: companies?.editCompany?.faturamento?.[3],
  };

  function handleSubmit(values) {
    const verifiedCompany = companies?.editCompany
      ? helpers.companies.verifyCompanyToEdit(companies?.editCompany, {
          ...companies?.editCompany,
          valor_arrecadacao: values.valor_arrecadacao,
          faturamento: [
            values.faturamentoAno1,
            values.faturamentoAno2,
            values.faturamentoAno3,
            values.faturamentoAno4,
          ],
        })
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
      <Form>
        <div className="flex pt-4 w-full">
          <div className="md:col-span-2 w-full">
            <div className="grid grid-cols-12 sm:gap-x-6 w-full">
              <div className="flex mx-auto w-full flex-col col-span-12 sm:col-span-12">
                <SelectFormik
                  required
                  name="valor_arrecadacao"
                  label="Valor arrecadação"
                  data={general.collectionValues}
                />
              </div>
              <div className="flex mx-auto w-full flex-col col-span-12 sm:col-span-6">
                <InputFormik
                  placeholder="R$ 1000.00"
                  name={"faturamentoAno1"}
                  type="currency"
                  label={`Faturamento ${new Date().getFullYear() - 1}`}
                />
              </div>
              <div className="flex mx-auto w-full flex-col col-span-12 sm:col-span-6">
                <InputFormik
                  placeholder="R$ 1000.00"
                  name={"faturamentoAno2"}
                  type="currency"
                  label={`Faturamento ${new Date().getFullYear() - 2}`}
                />
              </div>
              <div className="flex mx-auto w-full flex-col col-span-12 sm:col-span-6">
                <InputFormik
                  placeholder="R$ 1000.00"
                  name={"faturamentoAno3"}
                  type="currency"
                  label={`Faturamento ${new Date().getFullYear() - 3}`}
                />
              </div>
              <div className="flex mx-auto w-full flex-col col-span-12 sm:col-span-6">
                <InputFormik
                  placeholder="R$ 1000.00"
                  name={"faturamentoAno4"}
                  type="currency"
                  label={`Faturamento ${new Date().getFullYear() - 4}`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Button
            title="Próximo"
            loading={account.loading}
            icon={<FaArrowRight />}
            iconRight
          />
        </div>
      </Form>
    </Formik>
  );
};

export default Faturamento;
