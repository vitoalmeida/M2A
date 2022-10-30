import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Questionnaires from "../../../../pages/Questionnaires";
import * as api from "../../../../services/index";
import { DiagnosticsActions } from "../../../../redux/diagnostics";
import { Diagnostic } from "../../../../redux/diagnostics/types";
import { useSelector } from "../../../../redux/hooks";
import { QuestionnaireActions } from "../../../../redux/questionnaire";
import showToast from "../../../../helpers/showToast";
import { Questionnaire } from "../../../../redux/questionnaire/types";
import Chart from "../Chart";
import { Form, Formik } from "formik";
import formSchema from "./formSchema";
import InputFormik from "../../../InputFormik";
import { Company } from "../../../../redux/companies/types";

interface Props {
  diagnostic: Diagnostic;
  closeForm?: () => any;
}

const initialValues: any = {
  to: "",
  text: "",
};

const DiagnosticForm: React.FC<Props> = ({ closeForm, diagnostic }) => {
  const dispatch = useDispatch();
  const { questionnaire, account } = useSelector((state) => state);

  const total = questionnaire.questionnaireAnswers.reduce(
    (previousQuestion, currentQuestion) =>
      previousQuestion + currentQuestion.valor,
    0
  );

  function handleDiagnosticate(values) {
    if (account.data.tipo !== 2) {
      showToast("Apenas consultores poodem fornecer uma devolutiva!", "error");
      return;
    }
    // const = ((diagnostic.empresa_questionario as Questionnaire).empresa_master as Company)?.cnpj === '0'
    dispatch(
      DiagnosticsActions.registerDiagnosticRequest({
        empresa_questionario: (diagnostic.empresa_questionario as Questionnaire)
          .id,
        consultor: String(account.data.user_inf.id),
        tipo_diagnostico: 1,
      })
    );

    api.diagnostics.sendEmail({ to: values.to, text: values.text });
  }

  function returnRisk() {
    if (total < 24) {
      return <span className="text-[#FF6169]">Extremo</span>;
    } else if (total < 48) {
      return <span className="text-[#FEA57E]">Alto</span>;
    } else if (total < 72) {
      return <span className="text-[#FDED93]">Médio</span>;
    } else if (total < 96) {
      return <span className="text-[#CFF37D]">Baixo</span>;
    } else {
      return <span className="text-[#9BF562]">Nenhum</span>;
    }
  }

  function returnRiskString() {
    if (total < 24) {
      return "Extremo";
    } else if (total < 48) {
      return "Alto";
    } else if (total < 72) {
      return "Médio";
    } else if (total < 96) {
      return "Baixo";
    } else {
      return "Nenhum";
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 w-[25rem] md:w-[40rem] xl:w-[65rem]">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Respostas</h1>
          <p className="mt-2 text-sm text-gray-700">
            Cada pergunta é pontuada de acordo com o valor de sua resposta.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-main-blue px-4 py-2 text-sm font-medium text-white shadow-sm sm:w-auto"
            onClick={() => window.print()}
          >
            Imprimir
          </button>
        </div>
      </div>
      <div className="-mx-4 mt-8 flex flex-col sm:-mx-6 md:mx-0">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
              >
                Pergunta
              </th>
              <th
                scope="col"
                className="hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 md:table-cell"
              >
                Resposta
              </th>
              <th
                scope="col"
                className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
              >
                Nota
              </th>
            </tr>
          </thead>
          <tbody id="printable">
            {questionnaire.questionnaireAnswers.map((questionnaire) => (
              <tr key={questionnaire.id} className="border-b border-gray-200">
                <td className="py-2 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                  <div className="font-medium text-gray-900">
                    {questionnaire.pergunta}
                  </div>
                  <div className="mt-2 text-gray-500 md:hidden">
                    {questionnaire.resposta}
                  </div>
                </td>
                <td className="py-2 pl-3 pr-4 text-left text-sm text-gray-500 sm:pr-6 md:pr-0 hidden md:flex">
                  {questionnaire.pergunta}
                </td>
                <td className="py-2 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">
                  {questionnaire.valor}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th
                scope="row"
                colSpan={2}
                className="hidden pl-6 pr-3 pt-4 text-right text-lg font-semibold text-gray-900 sm:table-cell md:pl-0"
              >
                Total
              </th>
              <th
                scope="row"
                className="pl-4 pr-3 pt-4 text-left text-lg font-semibold text-gray-900 sm:hidden"
              >
                Total
              </th>
              <td className="pl-3 pr-4 pt-4 text-right text-lg font-semibold text-gray-900 sm:pr-6 md:pr-0">
                {total}
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                colSpan={2}
                className="hidden pl-6 pr-3 text-right text-lg font-semibold text-gray-900 sm:table-cell md:pl-0"
              >
                Risco
              </th>
              <th
                scope="row"
                className="pl-4 pr-3 text-left text-lg font-semibold text-gray-900 sm:hidden"
              >
                Risco
              </th>
              <td className="pl-3 pr-4 text-right text-lg font-semibold text-gray-900 sm:pr-6 md:pr-0">
                {returnRisk()}
              </td>
            </tr>
          </tfoot>
        </table>
        <Chart risco={returnRiskString()} />
      </div>
      <div className="bg-[#F3F4F6] px-10 py-10 rounded-lg mt-10">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Devolutiva
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Responda com um e-mail para esta empresa, com orientações{" "}
                <del></del> como ela pode melhorar.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <Formik
              onSubmit={handleDiagnosticate}
              initialValues={initialValues}
              {...formSchema}
            >
              <Form>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3">
                        <InputFormik
                          label="Destinatário"
                          name="to"
                          placeholder="exemplo@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <InputFormik
                        label="Conteúdo"
                        name="text"
                        placeholder="Sua empresa pode melhorar em..."
                        // rows={15}
                        textArea
                        resize
                      />
                    </div>

                    {/* <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Anexos
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Carregue um arquivo</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">ou arraste e solte nesta caixa</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF até 10MB
                        </p>
                      </div>
                    </div>
                  </div> */}
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary-blue"
                      type="submit"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default DiagnosticForm;
