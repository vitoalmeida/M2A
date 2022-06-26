import Layout from "../components/Layout";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { Button } from "../components";
import { useSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import Question from "../components/Questionnairies/Question";

const settings = [
  {
    name: "Public access",
  },
  {
    name: "Private to Project Members",
  },
  {
    name: "Private to you",
  },
];

function Questionnaires() {
  const { questionnaire } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <>
      <Helmet>
        <title>Questionário - M2A</title>
        <meta name="description" content="Login to M2A application" />
      </Helmet>
      <Layout>
        <div className="bg-[#F3F4F6] px-4 sm:px-12 pt-8 sm:py-10 flex flex-col rounded-xl mt-10 duration-500">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 duration-500">
            Questionário
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-700">
            Este questionário é embasado nos pricípios da Fundação Nacional da
            Qualidade, respondê-lo corretamente é de suma importância para uma
            devolutiva mais fundamentada.
          </p>
          {questionnaire.questions.map((question) => (
            <Question question={question} />
          ))}
          <div className="py-10">
            <Button title="ENVIAR" />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Questionnaires;
