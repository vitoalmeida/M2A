import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "../../Button";
import { useSelector } from "../../../redux/hooks";
import Modal from "../../Modal";
import EditForm from "../../CompanyForm";
import { IoMdAdd } from "react-icons/io";
import { Company } from "../../../redux/companies/types";
import { useDispatch } from "react-redux";
import WaningModal from "../../WaningModal";
import QuestionsEditForm from "./QuestionsEditForm";
import { Question } from "../../../redux/questionnaire/types";
import { QuestionnaireActions } from "../../../redux/questionnaire";

const Results = () => {
  const dispatch = useDispatch();

  const { questionnaire } = useSelector((state) => state);

  const [editOpen, setEditOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);

  const [deleteQuestionId, setDeleteQuestionId] = useState<number>();

  function handleOpenEditModal(question?: Question) {
    if (question)
      dispatch(QuestionnaireActions.setEditQuestionRequest(question));
    else dispatch(QuestionnaireActions.removeEditQuestion());

    setEditOpen(true);
  }

  function handleOpenWarningModal(questionId: number) {
    setDeleteQuestionId(questionId);
    setWarningOpen(true);
  }

  function handleDeleteQuestion() {
    dispatch(QuestionnaireActions.deleteQuestionRequest(deleteQuestionId));
  }

  return (
    <div className="mb-32 mt-10">
      <Modal
        showModal={editOpen}
        closeButton
        onCloseModal={() => setEditOpen(false)}
      >
        <QuestionsEditForm onSubmit={() => setEditOpen(false)} />
      </Modal>

      <Modal
        showModal={warningOpen}
        closeButton
        onCloseModal={() => setWarningOpen(false)}
      >
        <WaningModal
          title="Excluir pergunta?"
          description="Tem certeza que deseja excluir esta pergunta permanentemente?"
          actionButton={handleDeleteQuestion}
          closeModal={() => setWarningOpen(false)}
        />
      </Modal>

      <div className="sm:flex sm:items-center"></div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 px-1 sm:px-0">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-2xl md:rounded-lg">
              <div className="flex p-5 w-full justify-between items-center bg-gray-200">
                <h2 className="ml-0 text-2xl font-medium">
                  Lista de Perguntas
                </h2>
                {/* <div className="mr-0">
                  <Button
                    onClick={() => handleOpenEditModal()}
                    title="Cadastrar pergunta"
                    color="#32c841"
                    icon={<IoMdAdd />}
                  />
                </div> */}
              </div>
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50 w-full">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-96 text-left text-sm min-w-[12rem] font-semibold text-gray-900 sm:pl-6"
                    >
                      Contéudo da Pergunta
                    </th>
                    <th
                      scope="col"
                      className="flex pr-5 justify-center py-3.5 min-w-[2rem] text-sm font-semibold text-gray-900"
                    >
                      Editar
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pr-5 text-sm min-w-[2rem] font-semibold text-gray-900"
                    >
                      Excluir
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {questionnaire?.questions?.map((question) => (
                    <tr key={question.id}>
                      <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {question.texto_pergunta}
                      </td>
                      <td className="relative pr-5  whitespace-nowrap py-4 text-right text-sm font-medium">
                        <button
                          className="flex text-main-blue mx-auto"
                          onClick={() => handleOpenEditModal(question)}
                        >
                          <FaEdit />
                        </button>
                      </td>
                      <td className="relative pr-5 whitespace-nowrap py-4 text-right text-sm font-medium">
                        <button
                          className="flex mx-auto text-[#d14f4f]"
                          onClick={() => handleOpenWarningModal(question.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
