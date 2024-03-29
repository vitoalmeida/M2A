import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AccountActions } from "../../redux/account";
import { GeneralActions } from "../../redux/general";
import { useSelector } from "../../redux/hooks";
import Button from "../Button";
import { BsCircleFill } from "react-icons/bs";
import { Profile } from "../../redux/account/types";
import { Company } from "../../redux/companies/types";
import { CompaniesActions } from "../../redux/companies";
import Modal from "../Modal";
import RegisterForm from "../pages/users/RegisterUserForm";
import CompanyForm from "../CompanyForm";

const Perfil: React.FC = () => {
  let dispatch = useDispatch();
  const { account, general, companies } = useSelector((state) => state);

  const [editAccountOpen, setEditAccountOpen] = useState(false);
  const [editCompanyOpen, setEditCompanyOpen] = useState(false);

  function handleOpenEditModal() {
    if (account.data.isCompany) {
      dispatch(
        CompaniesActions.setEditCompany(account.data.user_inf as Company)
      );
      setEditCompanyOpen(true);
    } else {
      dispatch(
        AccountActions.setEditAccountRequest({
          ...(account.data.user_inf as Profile),
          email: account.data.email,
          tipo: account.data.tipo,
        })
      );
      setEditAccountOpen(true);
    }
  }

  function handleEditCompany() {
    dispatch(
      CompaniesActions.editCompanyRequest({
        ...companies.editCompany,
        tipo: account.data.tipo,
      })
    );
  }

  return (
    <div className="overflow-hidden sm:rounded-lg max-w-3xl">
      <Modal
        showModal={editAccountOpen}
        closeButton
        onCloseModal={() => setEditAccountOpen(false)}
      >
        <div className="py-12 px-10">
          <RegisterForm
            onSubmit={() => {
              setEditAccountOpen(false);
            }}
          />
        </div>
      </Modal>

      <Modal
        showModal={editCompanyOpen}
        closeButton
        onCloseModal={() => setEditCompanyOpen(false)}
      >
        <div className="py-12 px-10 ">
          <CompanyForm
            onSubmit={handleEditCompany}
            closeForm={() => setEditCompanyOpen(false)}
          />
        </div>
      </Modal>

      <div className="flex pl-4 sm:px-10 items-center py-3">
        <span className="flex-none sm:inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
          <svg
            className="h-full w-full text-gray-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
        <div className="px-4 py-5 sm:px-10">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Dados {account.data.isCompany ? " da empresa" : " do usuário"}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Detalhes pessoais{" "}
            {account.data.isCompany
              ? " da empresa conectada."
              : " do usuário conectado."}
          </p>
        </div>
      </div>

      <div className="border-t px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          {(account?.data?.user_inf as Profile).nome && (
            <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-10">
              <dt className="text-sm font-medium text-gray-500">
                Nome completo
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {`${(account?.data?.user_inf as Profile).nome} ${
                  (account?.data?.user_inf as Profile).sobrenome
                }`}
              </dd>
            </div>
          )}
          {(account?.data?.user_inf as Company).fantasia && (
            <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-10">
              <dt className="text-sm font-medium text-gray-500">
                Nome fantasia
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {`${(account?.data?.user_inf as Company).fantasia}`}
              </dd>
            </div>
          )}
          {(account?.data?.user_inf as Profile).cpf && (
            <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-10">
              <dt className="text-sm font-medium text-gray-500">CPF</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {`${(account?.data?.user_inf as Profile).cpf}`}
              </dd>
            </div>
          )}
          {(account?.data?.user_inf as Company).cnpj && (
            <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-10">
              <dt className="text-sm font-medium text-gray-500">CNPJ</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {`${(account?.data?.user_inf as Company).cnpj}`}
              </dd>
            </div>
          )}
          <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-10">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {`${account?.data.email}`}
            </dd>
          </div>
          {(account?.data?.user_inf as Profile)?.uf ||
          (account?.data?.user_inf as Company)?.endereco?.uf ? (
            <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-10">
              <dt className="text-sm font-medium text-gray-500">Estado</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {`${
                  (account?.data?.user_inf as Company)?.endereco?.uf
                    ? general?.uf?.find(
                        (uf) =>
                          (account?.data?.user_inf as Company)?.endereco?.uf ===
                          uf.id
                      ).label
                    : general?.uf?.find(
                        (uf) =>
                          (account?.data?.user_inf as Profile)?.uf === uf.id
                      ).label
                }`}
              </dd>
            </div>
          ) : null}
          {(account?.data?.user_inf as Profile).telefone && (
            <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-10">
              <dt className="text-sm font-medium text-gray-500">Telefone</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {`${(account?.data?.user_inf as Profile).telefone}`}
              </dd>
            </div>
          )}
          {(account?.data?.user_inf as Company).resp_nome && (
            <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-10">
              <dt className="text-sm font-medium text-gray-500">Responsável</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {`${(account?.data?.user_inf as Company).resp_nome} ${
                  (account?.data?.user_inf as Company).resp_sobrenome
                }`}
              </dd>
            </div>
          )}
          <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-10">
            <dt className="text-sm font-medium text-gray-500">Nível</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {`${
                account?.data.tipo > 2
                  ? "Empresa"
                  : account?.data.tipo === 1
                  ? "Administrador"
                  : "Consultor"
              }`}
            </dd>
          </div>
          <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-10">
            <dt className="text-sm font-medium text-gray-500">Situação</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {`${account?.data.ativo ? "Ativo" : "Inativo"}`}
            </dd>
          </div>
        </dl>
      </div>
      <div className="mx-4 sm:mx-10 sm:mt-6 mb-6">
        <Button
          className="w-full"
          title="Editar"
          color="#f2f2f2"
          textColor="#181818"
          loading={account.loading}
          onClick={handleOpenEditModal}
        />
      </div>
      <div className="mx-4 sm:mx-10 mb-10 sm:mb-12">
        <Button
          className="w-full"
          title="Sair"
          color="#e34444"
          loading={account.loading}
          onClick={() => dispatch(AccountActions.clearData())}
        />
      </div>
    </div>
  );
};

export default Perfil;
