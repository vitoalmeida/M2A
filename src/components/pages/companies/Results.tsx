import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useSelector } from "../../../redux/hooks";
import EditForm from "../../CompanyForm";
import { IoMdAdd } from "react-icons/io";
import { Company } from "../../../redux/companies/types";
import { CompaniesActions } from "../../../redux/companies";
import { useDispatch } from "react-redux";
import {
  WaningModal,
  Pagination,
  Modal,
  ResultEmptyState,
} from "../../../components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Spinner } from "react-activity";
import {
  filterCompanies,
  getRouterParams,
  formatQueryString,
} from "../../../helpers/formatData";

const Results = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companies, general } = useSelector((state) => state);
  const { companies: companiesData } = companies;
  const loading = companiesData.loading;

  const [editOpen, setEditOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);

  const [deleteCompanyId, setDeleteCompanyId] = useState<number>();
  const [userId, setUserId] = useState<number>();
  const [companyType, setCompanyType] = useState<number>();
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [isSetingPage, setIsSetingPage] = useState(false);

  const [currentAppPage, setCurrentAppPage] = useState(1);
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

      navigate(`/companies${queryString ? queryString : ""}`);
      setFilteredCompanies(
        companies?.companies?.data.slice(10 * (page - 1), 10 * page)
      );
    } else {
      navigate(`/companies?page=${page}`);
      dispatch(
        CompaniesActions.getCompaniesRequest({
          page: page - 1,
          limit: 5,
          offset: 1,
        })
      );
    }

    setTimeout(() => {
      setIsSetingPage(false);
    }, 1000);
  }

  function handleOpenEditModal(company?: Company) {
    if (company) dispatch(CompaniesActions.setEditCompany(company));
    else dispatch(CompaniesActions.removeEditCompany());
    setEditOpen(true);
  }

  function handleOpenWarningModal(
    companyId: number,
    userId: number,
    tipo: number
  ) {
    setDeleteCompanyId(companyId);
    setUserId(userId);
    setCompanyType(tipo);
    setWarningOpen(true);
  }

  function handleDeleteCompany() {
    dispatch(
      CompaniesActions.deleteCompanyRequest(
        deleteCompanyId,
        userId,
        companyType
      )
    );
  }

  function handleEditCompany() {
    dispatch(CompaniesActions.editCompanyRequest(companies.editCompany));
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
          CompaniesActions.getCompaniesRequest(
            {
              page,
            },
            newParams
          )
        );
      } else {
        dispatch(
          CompaniesActions.getCompaniesRequest({
            page,
            limit: 5,
            offset: 1,
          })
        );
      }
    }
  }, [search]);

  useEffect(() => {
    if (companies?.companies?.data) {
      let page = 0;

      if (params.page) {
        page = Number(params.page || 1) - 1;
        delete params["page"];
      }
      // const table = document.querySelector("#myTable");
      // while (table.rows.length > 0) {
      //   table.deleteRow(0);
      // }

      if (Object.keys(params).length) {
        setFilteredCompanies(
          companies?.companies?.data.slice(10 * page, 10 * (page + 1))
        );
      } else {
        setFilteredCompanies(companies?.companies?.data);
      }
    }
  }, [companies?.companies?.data]);

  return (
    <div className="mb-32 mt-10">
      <Modal
        showModal={editOpen}
        closeButton
        onCloseModal={() => setEditOpen(false)}
      >
        <div className="py-12 px-10 ">
          <EditForm
            onSubmit={handleEditCompany}
            closeForm={() => setEditOpen(false)}
          />
        </div>
      </Modal>

      <Modal
        showModal={warningOpen}
        closeButton
        onCloseModal={() => setWarningOpen(false)}
      >
        <WaningModal
          title="Excluir empresa?"
          description="Tem certeza que deseja excluir esta empresa permanentemente?"
          actionButton={handleDeleteCompany}
          closeModal={() => setWarningOpen(false)}
        />
      </Modal>

      <div className="sm:flex sm:items-center"></div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 px-1 sm:px-0">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-2xl md:rounded-lg">
              <div className="flex p-5 w-full justify-between items-center bg-gray-200">
                <h2 className="ml-0 text-2xl font-medium">Lista de Empresas</h2>
              </div>
              <table className="min-w-full divide-y divide-gray-300">
                {loading ? (
                  <div className="flex flex-col justify-center items-center w-full h-[24rem] text-center">
                    <Spinner size={45} color={"#005589"} />
                  </div>
                ) : filteredCompanies?.length ? (
                  <>
                    <thead className="bg-gray-50 w-full">
                      <tr>
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
                          Empresa vinculada
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm min-w-[10rem] font-semibold text-gray-900"
                        >
                          Estado
                        </th>
                        <th
                          scope="col"
                          className="flex justify-center py-3.5 min-w-[2rem] text-sm font-semibold text-gray-900"
                        >
                          Editar
                        </th>
                        <th
                          scope="col"
                          className="px-3 text-center py-3.5 text-left text-sm min-w-[2rem] font-semibold text-gray-900"
                        >
                          Excluir
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      id="myTable"
                      className="divide-y divide-gray-200 bg-white"
                    >
                      {filteredCompanies?.map((company) => {
                        if (Number(company.cnpj) > 1)
                          return (
                            <tr key={company.cnpj}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {company.razao_social}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {company.tipo === 4
                                  ? "Empresa Master"
                                  : companies?.masterCompanies?.find(
                                      (company) =>
                                        company.id ===
                                        companiesData?.data?.[1]?.master
                                    )?.label || "Nenhum vinculo"}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {
                                  general?.uf?.find(
                                    (uf) => uf.id === company.endereco?.uf
                                  )?.label
                                }
                              </td>
                              <td className="relative whitespace-nowrap py-4 text-right text-sm font-medium">
                                <button
                                  className="flex text-main-blue mx-auto"
                                  onClick={() => handleOpenEditModal(company)}
                                >
                                  <FaEdit />
                                </button>
                              </td>
                              <td className="relative whitespace-nowrap py-4 text-right text-sm font-medium">
                                <button
                                  className="flex mx-auto text-[#d14f4f]"
                                  onClick={() =>
                                    handleOpenWarningModal(
                                      company.id,
                                      company.usuario,
                                      company.tipo
                                    )
                                  }
                                >
                                  <FaTrash />
                                </button>
                              </td>
                            </tr>
                          );
                        else return null;
                      })}
                    </tbody>
                  </>
                ) : (
                  <ResultEmptyState
                    title="Nenhuma empresa encontrada"
                    description="Tente usar outros parâmetros de filtragem."
                  />
                )}
                <tfoot className="relative w-full h-16 items-center justify-center">
                  <div className="absolute mt-4 left-0 right-0 ml-auto mr-auto">
                    {!loading && (
                      <Pagination
                        totalPage={Math.ceil(
                          (companiesData.companiesCount?.total +
                            companiesData.masterCompaniesCount?.total) /
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
