import { Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../../redux/hooks";
import { QuestionnaireActions } from "../../../redux/questionnaire";
import Button from "../../Button";
import formSchema from "./formSchema";
import Question from "./Question";
import Modal from "../../Modal";
import SuccessModal from "../../SuccessModal";
import showToast from "../../../helpers/showToast";

const QuestionnaireForm: React.FC = () => {
  const { questionnaire, account } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [successOpen, setSuccessOpen] = useState(false);

  function handleSubmit(values) {
    if (!account.data.isCompany) {
      showToast("Apenas empresas podem responder este questionário!", "error");
      return;
    }

    let valuesAray = Object.keys(values).map((k) => values[k]);
    setSuccessOpen(true);
    dispatch(
      QuestionnaireActions.registerQuestionnairesRequest(
        valuesAray,
        0,
        account.data.user_inf.id,
        account.data.tipo === 4
      )
    );
  }

  return (
    <div className="bg-[#F3F4F6] px-4 sm:px-12 pt-8 sm:py-10 flex flex-col rounded-xl mt-10 duration-500">
      <SuccessModal
        open={successOpen}
        buttonText="Voltar"
        title="Questionário salvo com sucesso!"
        description={`Um consultor irá avaliar suas respostas e responder em breve no endereço de email: ${account.data.email}!`}
        closeModal={() => setSuccessOpen(false)}
      />
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 duration-500">
        Questionário
      </h2>
      <p className="mt-2 text-sm sm:text-base text-gray-700">
        Este questionário é embasado nos pricípios da Fundação Nacional da
        Qualidade, respondê-lo corretamente é de suma importância para uma
        devolutiva mais fundamentada.
      </p>
      <Formik
        {...formSchema}
        onSubmit={(values, actions) => {
          handleSubmit({ ...values });
        }}
      >
        {({ errors, isValid, isValidating, isSubmitting }) => {
          console.error(errors);
          if (isValidating && !isValid && errors && isSubmitting) {
            showToast("Responda todas as perguntas!", "error");
          }

          return (
            <Form>
              {questionnaire.questions.map((question, questionIndex) => (
                <Question
                  name={"pergunta" + (questionIndex + 1)}
                  question={question}
                  index={questionIndex}
                />
              ))}
              <div className="py-10">
                <Button title="ENVIAR" />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
export default QuestionnaireForm;
