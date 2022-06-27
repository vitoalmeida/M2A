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

const questions = [
  {
    id: 1,
    question:
      "1. Vitor boiolinha gayzinho viadinho bichinha frutinha soca mole",
    answers: [
      "Sim elde é!",
      "Com toda cerdteza!",
      "Não haá mulher no mundo pra tornar ele macho!",
      "Se peidar cheira a camisinha usada!",
    ],
  },
  {
    id: 2,
    question:
      "2. Vitor boiolinha gayzinho viadinho bichinha frutinha soca mole",
    answers: [
      "Sim egle é!",
      "Com toda certeza!",
      "Não há mdulher no mundo pra tornar ele macho!",
      "Se peiadar cheira a camisinha usada!",
    ],
  },
  {
    id: 3,
    question:
      "3. Vitor boiolinha gayzinho viadinho bichinha frutinha soca mole",
    answers: [
      "Sim ele é!",
      "Com tosda certeza!",
      "Não há mulhers no mundo pra tornar ele macho!",
      "Se peiddar cheira a camisinha usada!",
    ],
  },
  {
    id: 4,
    question:
      "4. Vitor boiolinha gayzinho viadinho bichinha frutinha soca mole",
    answers: [
      "Sim ele dé!",
      "Com toda certezaa!",
      "Não há mulherf no mundo pra tornar ele macho!",
      "Se peidarf cheira a camisinha usada!",
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Questionnaires() {
  const [selected, setSelected] = useState(settings[0]);
  const { account } = useSelector((state) => state);
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
          {questions.map((question) => (
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
