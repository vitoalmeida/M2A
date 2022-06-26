<<<<<<< HEAD
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import { Button } from '../components';
import Question from '../components/Questionnairies/Question';
=======
import Layout from "../components/Layout";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { Button } from "../components";
import { useSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
>>>>>>> 1540162867a89e47a529e87b445d7a30fea5d633

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
<<<<<<< HEAD
    id: 1,
    question: 'Vitor boiolinha gayzinho viadinho bichinha frutinha soca mole',
=======
    question: "Vitor boiolinha gayzinho viadinho bichinha frutinha soca mole",
>>>>>>> 1540162867a89e47a529e87b445d7a30fea5d633
    answers: [
      "Sim elde é!",
      "Com toda cerdteza!",
      "Não haá mulher no mundo pra tornar ele macho!",
      "Se peidar cheira a camisinha usada!",
    ],
  },
  {
<<<<<<< HEAD
    id: 2,
    question: 'Vitor boiolinha gayzinho viadinho bichinha frutinha soca mole',
=======
    question: "Vitor boiolinha gayzinho viadinho bichinha frutinha soca mole",
>>>>>>> 1540162867a89e47a529e87b445d7a30fea5d633
    answers: [
      "Sim egle é!",
      "Com toda certeza!",
      "Não há mdulher no mundo pra tornar ele macho!",
      "Se peiadar cheira a camisinha usada!",
    ],
  },
  {
<<<<<<< HEAD
    id: 3,
    question: 'Vitor boiolinha gayzinho viadinho bichinha frutinha soca mole',
=======
    question: "Vitor boiolinha gayzinho viadinho bichinha frutinha soca mole",
>>>>>>> 1540162867a89e47a529e87b445d7a30fea5d633
    answers: [
      "Sim ele é!",
      "Com tosda certeza!",
      "Não há mulhers no mundo pra tornar ele macho!",
      "Se peiddar cheira a camisinha usada!",
    ],
  },
  {
<<<<<<< HEAD
    id: 4,
    question: 'Vitor boiolinha gayzinho viadinho bichinha frutinha soca mole',
=======
    question: "Vitor boiolinha gayzinho viadinho bichinha frutinha soca mole",
>>>>>>> 1540162867a89e47a529e87b445d7a30fea5d633
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
        <title>Questionários - M2A</title>
        <meta name="description" content="Login to M2A application" />
      </Helmet>
      <Layout>
        {questions.map((question) => (
<<<<<<< HEAD
          <Question question={question} />
=======
          <RadioGroup value={selected} onChange={setSelected}>
            <div className="flex flex-col justify-between bg-[#F3F4F6] rounded-2xl mt-10">
              <span className="text-sm md:text-lg px-5 py-5">
                {question.question}
              </span>
              <div className="bg-white rounded-md -space-y-px">
                {question.answers.map((answer, answerIdx) => (
                  <RadioGroup.Option
                    key={answerIdx}
                    value={String(question + answer)}
                    className={({ checked }) =>
                      classNames(
                        answerIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                        answerIdx === questions.length - 1
                          ? "rounded-bl-md rounded-br-md"
                          : "",
                        checked
                          ? "bg-indigo-50 border-indigo-200 z-10"
                          : "border-gray-200",
                        "relative border p-4 flex cursor-pointer focus:outline-none"
                      )
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <span
                          className={classNames(
                            checked
                              ? "bg-secondary-blue border-transparent"
                              : "bg-white border-gray-300",
                            active
                              ? "ring-2 ring-offset-2 ring-secondary-blue"
                              : "",
                            "h-4 w-4 mt-0.5 cursor-pointer shrink-0 rounded-full border flex items-center justify-center"
                          )}
                          aria-hidden="true"
                        >
                          <span className="rounded-full bg-white w-1.5 h-1.5" />
                        </span>
                        <span className="ml-3 flex flex-col">
                          <RadioGroup.Label
                            as="span"
                            className={classNames(
                              checked ? "text-secondary-blue" : "text-gray-900",
                              "block text-sm font-medium"
                            )}
                          >
                            {answer}
                          </RadioGroup.Label>
                        </span>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </div>
          </RadioGroup>
>>>>>>> 1540162867a89e47a529e87b445d7a30fea5d633
        ))}
        <div className="py-10">
          <Button title="ENVIAR" />
        </div>
      </Layout>
    </>
  );
}

export default Questionnaires;
