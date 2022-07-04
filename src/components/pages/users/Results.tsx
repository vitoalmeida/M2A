import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "../../Button";
import { useSelector } from "../../../redux/hooks";
import Modal from "../../Modal";
// import EditForm from "./";
import { IoMdAdd } from "react-icons/io";
import { Company } from "../../../redux/companies/types";
import { CompaniesActions } from "../../../redux/companies";
import { useDispatch } from "react-redux";
import WaningModal from "../../WaningModal";
import { BsCircleFill } from "react-icons/bs";
import { Account, Profile } from "../../../redux/account/types";
import RegisterForm from "./RegisterUserForm";
import { AccountActions } from "../../../redux/account";

const Results = () => {
  const dispatch = useDispatch();
  const { companies, general, account } = useSelector((state) => state);

  const [editOpen, setEditOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);

  const [profileId, setProfileId] = useState<number>();
  const [userId, setUserId] = useState<number>();
  const [type, setType] = useState<number>();

  function handleOpenEditModal(user?: Profile) {
    if (user) dispatch(AccountActions.setEditAccountRequest(user));
    else dispatch(AccountActions.removeEditAccountRequest());

    setEditOpen(true);
  }

  function handleDeleteAccount(account?: Profile) {
    setProfileId(account.id);
    setUserId(Number(account.usuario));
    setType(account.tipo);
    setWarningOpen(true);
  }

  return (
    <div className="mb-32 mt-10">
      <Modal
        showModal={editOpen}
        closeButton
        onCloseModal={() => setEditOpen(false)}
      >
        <div className="py-12 px-10">
          <RegisterForm
            onSubmit={() => {
              setEditOpen(false);
            }}
          />
        </div>
      </Modal>

      <Modal
        showModal={warningOpen}
        closeButton
        onCloseModal={() => setWarningOpen(false)}
      >
        <WaningModal
          title="Excluir usuário?"
          description="Tem certeza que deseja excluir este usuário permanentemente?"
          actionButton={() =>
            dispatch(
              AccountActions.deleteAccountRequest(profileId, userId, type)
            )
          }
          closeModal={() => setWarningOpen(false)}
        />
      </Modal>

      <div className="sm:flex sm:items-center"></div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 px-1 sm:px-0">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-2xl md:rounded-lg">
              <div className="flex p-5 w-full justify-between items-center bg-gray-200">
                <h2 className="ml-0 text-2xl font-medium">Lista de Usuários</h2>
                <div className="mr-0">
                  <Button
                    onClick={() => handleOpenEditModal()}
                    title="Cadastrar usuário"
                    color="#32c841"
                    icon={<IoMdAdd />}
                  />
                </div>
              </div>
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50 w-full">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 flex justify-center py-3.5 min-w-[2rem] text-sm font-semibold text-gray-900"
                    >
                      Situação
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm min-w-[12rem] font-semibold text-gray-900 sm:pl-6"
                    >
                      Nome
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm min-w-[12rem] font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm min-w-[10rem] font-semibold text-gray-900"
                    >
                      Perfil
                    </th>
                    <th
                      scope="col"
                      className="flex justify-center py-3.5 min-w-[2rem] text-sm font-semibold text-gray-900"
                    >
                      Editar
                    </th>
                    <th
                      scope="col"
                      className="px-3 text-center py-3.5 text-sm min-w-[2rem] font-semibold text-gray-900"
                    >
                      Excluir
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {account?.accountList?.data?.map((user: Profile) => (
                    <tr key={user.id}>
                      <td className="relative whitespace-nowrap py-4 text-right text-sm font-medium">
                        <BsCircleFill
                          className="flex mx-auto"
                          color={user.ativo ? "#46cd51" : "#cd4646"}
                        />
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {`${user.nome} ${user.sobrenome}`}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {user.tipo > 2
                          ? "Empresa"
                          : user.tipo === 1
                          ? "Administrador"
                          : "Consultor"}
                      </td>
                      <td className="relative whitespace-nowrap py-4 text-right text-sm font-medium">
                        <button
                          className="flex text-main-blue mx-auto"
                          onClick={() => handleOpenEditModal(user)}
                        >
                          <FaEdit />
                        </button>
                      </td>
                      <td className="relative whitespace-nowrap py-4 text-right text-sm font-medium">
                        <button
                          className="flex mx-auto text-[#d14f4f]"
                          onClick={() => handleDeleteAccount(user)}
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
