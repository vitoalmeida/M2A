import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AccountActions } from "../../redux/account";
import { GeneralActions } from "../../redux/general";
import { useSelector } from "../../redux/hooks";
import Button from "../Button";
import { BsCircleFill } from "react-icons/bs";

const Perfil: React.FC = () => {
  let dispatch = useDispatch();
  const { account, general } = useSelector((state) => state);

  useEffect(() => {
    dispatch(GeneralActions.getUfRequest());
  }, []);

  return (
    <div className="overflow-hidden sm:rounded-lg max-w-3xl">
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
            Dados do usuário
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Detalhes pessoais do usuário logado.
          </p>
        </div>
      </div>

      <div className="border-t px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-10">
            <dt className="text-sm font-medium text-gray-500">Nome completo</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {`${account?.data.nome} ${account?.data.sobrenome}`}
            </dd>
          </div>
          <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-10">
            <dt className="text-sm font-medium text-gray-500">CPF</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {`${account?.data.cpf}`}
            </dd>
          </div>
          <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-10">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {`${account?.data.email}`}
            </dd>
          </div>
          <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-10">
            <dt className="text-sm font-medium text-gray-500">Estado</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {`${general?.uf?.find((uf) => account?.data.uf === uf.id).label}`}
            </dd>
          </div>
          <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-10">
            <dt className="text-sm font-medium text-gray-500">Telefone</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {`${account?.data.telefone}`}
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
      <div className="mx-4 sm:mx-10 sm:mt-6 mb-10 sm:mb-12">
        <Button
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
