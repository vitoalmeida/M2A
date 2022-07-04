import { Tab } from "@headlessui/react";
import { Formik, Field, Form } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AccountActions } from "../../../../redux/account";
import { GeneralActions } from "../../../../redux/general";
import { useSelector } from "../../../../redux/hooks";
import Button from "../../../Button";
import { InputFormik, SelectFormik } from "../../../index";
import formSchema from "./formSchema";
import { FaSave } from "react-icons/fa";
import * as helpers from "../../../../helpers/index";
import { QuestionnaireActions } from "../../../../redux/questionnaire";

interface Props {
  onSubmit?: () => void;
}

const QuestionsEditForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const { general, account, questionnaire } = useSelector((state) => state);
  const [activeTab, setActiveTab] = useState<number>(0);

  const initialValues: any = {
    texto_pergunta: questionnaire?.editQuestion?.texto_pergunta || "",
    objetivo: questionnaire?.editQuestion?.objetivo || "",
    conceito: questionnaire?.editQuestion?.conceito || "",
    fundamento: questionnaire?.editQuestion?.fundamento || "",
    resposta1: questionnaire?.editQuestion?.formatadas[0]?.texto_resposta || "",
    resposta2: questionnaire?.editQuestion?.formatadas[1]?.texto_resposta || "",
    resposta3: questionnaire?.editQuestion?.formatadas[2]?.texto_resposta || "",
    resposta4: questionnaire?.editQuestion?.formatadas[3]?.texto_resposta || "",
    valor1: questionnaire?.editQuestion?.formatadas[0]?.valor || "",
    valor2: questionnaire?.editQuestion?.formatadas[1]?.valor || "",
    valor3: questionnaire?.editQuestion?.formatadas[2]?.valor || "",
    valor4: questionnaire?.editQuestion?.formatadas[3]?.valor || "",
  };

  function handleSubmit(values) {
    dispatch(
      QuestionnaireActions.editQuestionRequest({
        texto_pergunta: values.texto_pergunta,
        objetivo: values.objetivo,
        conceito: values.conceito,
        fundamento: values.fundamento,
        formatadas: [
          {
            id: questionnaire?.editQuestion?.formatadas[0]?.id,
            texto_resposta: values.resposta1,
            valor: values.valor1,
          },
          {
            id: questionnaire?.editQuestion?.formatadas[1]?.id,
            texto_resposta: values.resposta2,
            valor: values.valor2,
          },
          {
            id: questionnaire?.editQuestion?.formatadas[2]?.id,
            texto_resposta: values.resposta3,
            valor: values.valor3,
          },
          {
            id: questionnaire?.editQuestion?.formatadas[3]?.id,
            texto_resposta: values.resposta4,
            valor: values.valor4,
          },
        ],
        respostas: questionnaire?.editQuestion?.respostas,
        id: questionnaire?.editQuestion?.id,
      })
    );

    if (onSubmit) onSubmit();
  }

  const tabs = [
    { name: "Pergunta", id: 0 },
    { name: "Respostas", id: 1 },
  ];

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit({ ...values })}
        {...formSchema}
      >
        <Form className="mx-10 my-12">
          <Tab.Group>
            <Tab.List className="flex border-b-[1px] space-x-9 sm:space-x-20 justify-center bg-white">
              {tabs.map((tab) => (
                <Tab
                  className={`${
                    tab.id === activeTab
                      ? "text-secondary-blue py-2 border-b border-secondary-blue"
                      : ""
                  } font-medium outline-none`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.name}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-3">
              <Tab.Panel>
                <div className="sm:w-[30rem] md:w-[40rem] xl:w-[60rem] duration-500">
                  <SelectFormik
                    required
                    name="fundamento"
                    data={general.fundamentals}
                    label="Fundamento"
                  />
                  <InputFormik
                    textArea
                    required
                    name="texto_pergunta"
                    label="Pergunta"
                  />
                  <InputFormik textArea name="objetivo" label="Objetivo" />
                  <InputFormik textArea name="conceito" label="Conceito" />
                </div>
              </Tab.Panel>
              <Tab.Panel className="sm:w-[30rem] md:w-[40rem] xl:w-[60rem] duration-500">
                <div className="md:flex md:justify-between">
                  <div className="md:w-full mr-6">
                    <InputFormik
                      required
                      textArea
                      name="resposta1"
                      label="Resposta 1"
                    />
                  </div>
                  <div className="w-[4rem]">
                    <InputFormik required name="valor1" label="Valor" />
                  </div>
                </div>
                <div className="md:flex md:justify-between">
                  <div className="md:w-full mr-6">
                    <InputFormik
                      required
                      textArea
                      name="resposta2"
                      label="Resposta 2"
                    />
                  </div>
                  <div className="w-[4rem]">
                    <InputFormik required name="valor2" label="Valor" />
                  </div>
                </div>
                <div className="md:flex md:justify-between">
                  <div className="md:w-full mr-6">
                    <InputFormik
                      required
                      textArea
                      name="resposta3"
                      label="Resposta 3"
                    />
                  </div>
                  <div className="w-[4rem]">
                    <InputFormik required name="valor3" label="Valor" />
                  </div>
                </div>
                <div className="md:flex md:justify-between">
                  <div className="md:w-full mr-6">
                    <InputFormik
                      required
                      textArea
                      name="resposta4"
                      label="Resposta 4"
                    />
                  </div>
                  <div className="w-[4rem]">
                    <InputFormik required name="valor4" label="Valor" />
                  </div>
                </div>

                {/* <Button title="Adicionar resposta" onClick={() => {}} /> */}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>

          <div className="mt-5 w-full mx-auto">
            <Button
              title="Salvar"
              loading={account.loading}
              icon={<FaSave />}
              iconRight
            />
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default QuestionsEditForm;
