import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "../../Button";
import { useSelector } from "../../../redux/hooks";
import Modal from "../../Modal";
// import EditForm from "./";
import { IoMdAdd } from "react-icons/io";
import { useDispatch } from "react-redux";
import WaningModal from "../../WaningModal";
import { BsCircleFill } from "react-icons/bs";
import { Account, Profile } from "../../../redux/account/types";
import RegisterForm from "./RegisterUserForm";
import { AccountActions } from "../../../redux/account";
import ResultEmptyState from "../../ResultEmptyState";
import { Spinner } from "react-activity";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../../Pagination";
import {
  formatQueryString,
  getRouterParams,
} from "../../../helpers/formatData";

const Results = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { account } = useSelector((state) => state);
  const { loading, accountList } = account;

  const [editOpen, setEditOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);

  const [profileId, setProfileId] = useState<number>();
  const [userId, setUserId] = useState<number>();
  const [type, setType] = useState<number>();

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentAppPage, setCurrentAppPage] = useState(1);
  const [isSetingPage, setIsSetingPage] = useState(false);

  const { search } = useLocation();

  const params = getRouterParams(search);

  function handleChangePage(page: number) {
    setIsSetingPage(true);
    const newParams = { ...params };

    if (newParams.page) {
      delete newParams["page"];
    }

    setCurrentAppPage(page);

    if (Object.keys(newParams).length) {
      let queryString = formatQueryString(newParams, { ...newParams, page });

      navigate(`/users${queryString ? queryString : ""}`);
      setFilteredUsers(accountList?.data.slice(10 * (page - 1), 10 * page));
    } else {
      navigate(`/users?page=${page}`);
      dispatch(
        AccountActions.getAccountsRequest({
          page: page - 1,
          limit: 5,
        })
      );
    }

    setTimeout(() => {
      setIsSetingPage(false);
    }, 1000);
  }

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

  useEffect(() => {
    if (!loading && !isSetingPage) {
      const newParams = { ...params };
      let page = 0;

      if (newParams.page) {
        page = Number(newParams.page || 1) - 1;
        setCurrentAppPage(page + 1);
        delete newParams["page"];
      }

      if (Object.keys(newParams).length) {
        dispatch(
          AccountActions.getAccountsRequest(
            {
              page,
            },
            newParams
          )
        );
      } else {
        dispatch(
          AccountActions.getAccountsRequest({
            page,
            limit: 5,
          })
        );
      }
    }
  }, [search]);

  useEffect(() => {
    if (accountList.data) {
      let page = 0;

      if (params.page) {
        page = Number(params.page || 1) - 1;
        delete params["page"];
      }

      if (Object.keys(params).length) {
        setFilteredUsers(accountList.data.slice(10 * page, 10 * (page + 1)));
      } else {
        setFilteredUsers(accountList.data);
      }
    }
  }, [accountList.data]);

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
                {loading ? (
                  <div className="flex flex-col justify-center items-center w-full h-[24rem] text-center">
                    <Spinner size={45} color={"#005589"} />
                  </div>
                ) : filteredUsers?.length ? (
                  <>
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
                      {filteredUsers?.map((user: Profile) => (
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
                  </>
                ) : (
                  <ResultEmptyState
                    title="Nenhum diagnóstico ainda"
                    description="Espere uma empresa responder um questionário, para gerar um diagnóstico."
                  />
                )}

                <tfoot className="relative w-full h-16 items-center justify-center">
                  <div className="absolute mt-4 left-0 right-0 ml-auto mr-auto">
                    {!loading && (
                      <Pagination
                        totalPage={Math.ceil(
                          (accountList.adminCount.total +
                            accountList.consultantCount.total) /
                            10
                        )}
                        currentPage={currentAppPage}
                        onChangePage={(newPage) => {
                          window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                          });
                          handleChangePage(newPage);
                        }}
                      />
                    )}
                  </div>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
