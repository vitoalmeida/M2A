import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Question({ question }) {
  const [selected, setSelected] = useState();

  return (
    <RadioGroup value={selected} onChange={setSelected}>
      <div className="flex flex-col justify-between shadow bg-[#F9FAFB] rounded-2xl mt-6 overflow-hidden">
        <span className="text-sm md:text-lg px-5 py-5">
          {question.question}
        </span>
        <div className="bg-white rounded-md -space-y-px">
          {question.answers.map((answer, answerIdx) => (
            <RadioGroup.Option
              key={answerIdx + "#" + question.id}
              value={String(question + answer + "#" + question.id)}
              className={({ checked }) =>
                classNames(
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
                      active ? "ring-2 ring-offset-2 ring-secondary-blue" : "",
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
  );
}
