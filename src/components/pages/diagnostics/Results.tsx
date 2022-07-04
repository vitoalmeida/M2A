import { useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import Button from "../../Button";
import { useSelector } from "../../../redux/hooks";
import Modal from "../../Modal";
import EditForm from "../../CompanyForm";
import { IoMdAdd } from "react-icons/io";
import { Company } from "../../../redux/companies/types";
import { CompaniesActions } from "../../../redux/companies";
import { useDispatch } from "react-redux";
import WaningModal from "../../WaningModal";
import { Questionnaire } from "../../../redux/questionnaire/types";
import { Profile } from "../../../redux/account/types";
import { BsCircleFill } from "react-icons/bs";
import { Diagnostic } from "../../../redux/diagnostics/types";
import DiagnosticForm from "./DiagnosticForm";
import { QuestionnaireActions } from "../../../redux/questionnaire";
import { DiagnosticsActions } from "../../../redux/diagnostics";

const Results = () => {
  const dispatch = useDispatch();
  const { diagnostics } = useSelector((state) => state);
  console.log(diagnostics.diagnostics);
  const [selected, setSelected] = useState<Diagnostic>();

  const [viewOpen, setViewOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);

  const [diagnosticId, setDiagnosticId] = useState<number>();
  const [questionnaireId, setQuestionnaireId] = useState<number>();

  function handleOpenViewModal(diagnostic?: Diagnostic) {
    dispatch(
      QuestionnaireActions.getQuestionnairesAnswersRequest(
        (diagnostic.empresa_questionario as Questionnaire).id
      )
    );
    setViewOpen(true);
  }

  function handleOpenWarningModal(
    diagnosticId: number,
    questionnaireId: number
  ) {
    setDiagnosticId(diagnosticId);
    setQuestionnaireId(questionnaireId);
    setWarningOpen(true);
  }

  function handleDeleteCompany() {
    dispatch(
      DiagnosticsActions.deleteDiagnosticRequest(diagnosticId, questionnaireId)
    );
  }

  return (
    <div className="mb-32 mt-10">
      <Modal
        showModal={viewOpen}
        closeButton
        onCloseModal={() => setViewOpen(false)}
      >
        <div className="py-12 px-10">
          <DiagnosticForm
            diagnostic={selected}
            closeForm={() => setViewOpen(false)}
          />
        </div>
      </Modal>

      <Modal
        showModal={warningOpen}
        closeButton
        onCloseModal={() => setWarningOpen(false)}
      >
        <WaningModal
          title="Excluir diagnóstico?"
          description="Tem certeza que deseja excluir este diagnóstico permanentemente?"
          actionButton={handleDeleteCompany}
          closeModal={() => setWarningOpen(false)}
        />
      </Modal>

      <div className="sm:flex sm:items-center duration-500"></div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 px-1 sm:px-0">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-2xl md:rounded-lg">
              <div className="flex p-5 w-full justify-between items-center bg-gray-200">
                <h2 className="ml-0 text-2xl font-medium">
                  Lista de Diagnósticos
                </h2>
                {/* <div className="mr-0">
                  <Button
                    onClick={() => handleOpenEditModal()}
                    title="Cadastrar empresa"
                    color="#32c841"
                    icon={<IoMdAdd />}
                  />
                </div> */}
              </div>
              <table className="min-w-full divide-y divide-gray-300">
                {diagnostics.diagnostics.length ? (
                  <thead className="bg-gray-50 w-full">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-center text-sm max-w-[3.5rem] xl:max-w-[3rem] font-semibold text-gray-900 overflow-hidden"
                      >
                        Tempo
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-center text-sm max-w-[7rem] sm:max-w-[6.5rem] xl:max-w-[5.5rem] font-semibold text-gray-900 overflow-hidden"
                      >
                        Diagnosticado
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm min-w-[12rem] font-semibold text-gray-900 overflow-hidden"
                      >
                        Empresa
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm min-w-[10rem] font-semibold text-gray-900 overflow-hidden"
                      >
                        Consultor
                      </th>
                      <th
                        scope="col"
                        className="px-3 text-center py-3.5 w-[4rem] text-sm font-semibold text-gray-900"
                      >
                        Visualizar
                      </th>
                      <th
                        scope="col"
                        className="px-3 text-center py-3.5 text-sm w-[3rem] font-semibold text-gray-900 lg:pr-6"
                      >
                        Excluir
                      </th>
                    </tr>
                  </thead>
                ) : (
                  <div className="flex flex-col justify-center items-center w-full h-[24rem] text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        vectorEffect="non-scaling-stroke"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                      />
                    </svg>
                    <h3 className="mt-2 font-medium text-gray-600">
                      Nenhum diagnóstico ainda
                    </h3>
                    <p className="mt-1 text-sm text-gray-400 mb-10">
                      Espere uma empresa responder um questionário,
                      <br /> para gerar um diagnóstico.
                    </p>
                  </div>
                )}
                <tbody className="divide-y divide-gray-200 bg-white">
                  {diagnostics.diagnostics.map((diagnostic) => (
                    <tr key={diagnostic.id}>
                      <td className="whitespace-nowrap text-ellipsis text-center text-sm text-gray-500">
                        {"T" +
                          (diagnostic.empresa_questionario as Questionnaire)
                            .tempo}
                      </td>
                      <td className="relative text-center">
                        <BsCircleFill
                          className="flex mx-auto"
                          color={diagnostic.consultor ? "#46cd51" : "#cd4646"}
                        />
                      </td>
                      <td className="whitespace-nowrap text-ellipsis px-3 py-4 text-sm text-gray-500">
                        {typeof (
                          diagnostic.empresa_questionario as Questionnaire
                        ).empresa !== "number"
                          ? (
                              (diagnostic.empresa_questionario as Questionnaire)
                                .empresa as Company
                            ).fantasia
                          : (
                              (diagnostic.empresa_questionario as Questionnaire)
                                .empresa_master as Company
                            ).fantasia}
                      </td>

                      <td className="whitespace-nowrap text-ellipsis px-3 py-4 text-sm text-gray-500">
                        {`${(diagnostic?.consultor as Profile)?.nome || ""} ${
                          (diagnostic?.consultor as Profile)?.sobrenome || ""
                        }`}
                      </td>
                      <td className="relative py-4 text-right text-lg font-medium">
                        <button
                          className="flex text-main-blue mx-auto"
                          onClick={() => {
                            setSelected(diagnostic);
                            handleOpenViewModal(diagnostic);
                          }}
                        >
                          <FaEye />
                        </button>
                      </td>
                      <td className="relative py-4 text-right text-sm font-medium lg:pr-3">
                        <button
                          className="flex mx-auto text-[#d14f4f]"
                          onClick={() =>
                            handleOpenWarningModal(
                              diagnostic.id,
                              (
                                diagnostic?.empresa_questionario as Questionnaire
                              )?.id
                            )
                          }
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
