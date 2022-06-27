import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import {
  Answer,
  Question as QuestionType,
} from "../../../redux/questionnaire/types";
import { useFormikContext } from "formik";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
interface Props {
  question: QuestionType;
  index: number;
  name: string;
}

const Question: React.FC<Props> = ({ question, index, name }: Props) => {
  const [selected, setSelected] = useState<number>();
  const { values, errors, touched, setFieldValue, setErrors } =
    useFormikContext<any>();

  const error = errors[name];

  function handleChangeSelected(answerId: number) {
    setSelected(answerId);
    setFieldValue(name, { pergunta: question.id, resposta: answerId });
  }

  return (
    <RadioGroup
      value={selected}
      onChange={(event) => handleChangeSelected(event)}
    >
      <div
        className={`${
          error ? "bg-[#ffe7e7]" : "bg-[#F9FAFB]"
        } flex flex-col justify-between shadow rounded-2xl mt-6 overflow-hidden duration-500`}
      >
        <span className={`text-sm md:text-lg py-5 px-5 duration-500`}>
          {`${index + 1}. ${question.texto_pergunta}`}
        </span>
        <div className="bg-white rounded-md -space-y-px duration-500">
          {question.formatadas.map((answer) => (
            <RadioGroup.Option
              onFocus={() => {
                const newErrors = { ...errors };
                delete newErrors[name];
                setErrors(newErrors);
              }}
              key={answer.id}
              value={answer.id}
              className={({ checked }) =>
                classNames(
                  checked
                    ? "bg-indigo-50 border-indigo-200 z-10"
                    : "border-gray-200",
                  "relative border p-4 flex cursor-pointer outline-none duration-500"
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
                      active ? "ring-2 ring-offset-2 ring-secondary-blue" : "",
                      "h-4 w-4 mt-0.5 cursor-pointer shrink-0 rounded-full border flex items-center justify-center duration-500"
                    )}
                    aria-hidden="true"
                  >
                    <span className="rounded-full bg-white w-1.5 h-1.5 duration-500" />
                  </span>
                  <span className="ml-3 flex flex-col">
                    <RadioGroup.Label
                      as="span"
                      className={classNames(
                        checked ? "text-secondary-blue" : "text-gray-900",
                        "block text-sm font-medium duration-500"
                      )}
                    >
                      {answer.texto_resposta}
                    </RadioGroup.Label>
                  </span>
                </>
              )}
            </RadioGroup.Option>
          ))}
          {error && (
            <span className="flex flex-1 bg-[#ffe7e7] py-2 pl-4 text-sm text-red-300 duration-500">{`${error}`}</span>
          )}
        </div>
      </div>
    </RadioGroup>
  );
};

export default Question;
