import { Formik, Field, Form } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AccountActions } from "../../../../redux/account";
import { GeneralActions } from "../../../../redux/general";
import { useSelector } from "../../../../redux/hooks";
import Button from "../../../Button";
import { InputFormik, SelectFormik } from "../../../index";
import formSchema from "./formSchema";
import * as helpers from "../../../../helpers/index";
import { status, tipo } from "../../../../helpers/staticData";
import { Profile } from "../../../../redux/account/types";
import PasswordForm from "../PasswordForm";

interface Props {
  onSubmit?: () => void;
}

const RegisterForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const { general, account } = useSelector((state) => state);

  const [empty, setEmpty] = useState(account.editAccount ? false : true);
  const [passwordScreen, setPasswordScreen] = useState(false);

  const initialValues: any = {
    nome: account?.editAccount?.nome || "",
    sobrenome: account?.editAccount?.sobrenome || "",
    cpf: account?.editAccount?.cpf || "",
    telefone: account?.editAccount?.telefone || "",
    celular: account?.editAccount?.celular || "",
    formacao: account?.editAccount?.formacao || "",
    tipo: account?.editAccount?.tipo || "",
    uf: account?.editAccount?.uf || "",
    email: account?.editAccount?.email || "",
    ativo: String(account?.editAccount?.ativo) || "",
  };

  function handleSubmit(values: Profile) {
    if (empty) {
      dispatch(AccountActions.setEditAccountRequest(values));
      setPasswordScreen(true);
    } else {
      dispatch(
        AccountActions.editAccountRequest({
          ...values,
          id: account?.editAccount?.id,
          usuario: account?.editAccount?.usuario,
          ativo: String(values.ativo) === "true",
        })
      );
    }
  }

  function createAccount(password: string) {
    dispatch(
      AccountActions.registerAccountRequest(
        {
          email: account?.editAccount?.email,
          username: account?.editAccount?.email,
          password,
          tipo: account?.editAccount?.tipo,
          ativo: true,
          user_inf: {
            ...account.editAccount,
          },
        },
        false
      )
    );
    setPasswordScreen(false);
    if (onSubmit) onSubmit();
  }

  return (
    <>
      <h3 className="text-xl mb-1 -mt-2 leading-6 font-medium text-gray-900">
        Dados do usuário
      </h3>
      <span className="flex mb-5 h-px w-full bg-gray-200" />
      {!passwordScreen ? (
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleSubmit({ ...values })}
          {...formSchema}
        >
          {({ values }) => (
            <Form autoComplete="off">
              <div className="flex">
                <div className="flexmd:col-span-2">
                  <div className="grid grid-cols-12 gap-x-6">
                    {empty && (
                      <div className="col-span-12 sm:col-span-12">
                        <SelectFormik
                          required={empty}
                          disabled={!empty}
                          name="tipo"
                          label="Tipo de Perfil"
                          data={tipo}
                        />
                      </div>
                    )}
                    {values.tipo && (
                      <>
                        <div className="flex flex-col col-span-12 sm:col-span-6">
                          <InputFormik
                            required
                            name="nome"
                            placeholder="João"
                            label="Nome"
                          />
                        </div>
                        <div className="flex flex-col col-span-12 sm:col-span-6">
                          <InputFormik
                            required
                            name="sobrenome"
                            placeholder="Silva"
                            label="Sobrenome"
                          />
                        </div>

                        <div className="flex flex-col col-span-12 sm:col-span-12">
                          <InputFormik
                            required
                            name="cpf"
                            placeholder="000.000.000-00"
                            label="CPF"
                          />
                        </div>
                        {String(values.tipo) === "2" && (
                          <>
                            <div className="flex flex-col col-span-12 sm:col-span-6">
                              <InputFormik
                                required
                                name="telefone"
                                placeholder="(00) 0 0000-0000"
                                label="Telefone"
                              />
                            </div>
                            <div className="flex flex-col col-span-12 sm:col-span-6">
                              <InputFormik
                                required
                                name="celular"
                                placeholder="(00) 0 0000-0000"
                                label="Celular"
                              />
                            </div>
                          </>
                        )}

                        <div className="flex flex-col col-span-12 sm:col-span-12">
                          <InputFormik
                            autoComplete={false}
                            disabled={!empty}
                            required={empty}
                            name="email"
                            placeholder="exemplo@email.com"
                            label="Email"
                          />
                        </div>

                        {String(values.tipo) === "2" && (
                          <>
                            <div className="col-span-12 sm:col-span-6">
                              <SelectFormik
                                required
                                name="formacao"
                                placeholder="Superior"
                                label="Formação"
                                data={helpers.staticData.formacao}
                              />
                            </div>
                            <div className="col-span-12 sm:col-span-6">
                              <SelectFormik
                                required
                                name="uf"
                                placeholder="DF"
                                label="Estado"
                                data={general.uf}
                              />
                            </div>
                          </>
                        )}

                        {!empty && (
                          <div className="col-span-12 sm:col-span-12">
                            <SelectFormik
                              required={empty}
                              disabled={!empty}
                              name="tipo"
                              label="Tipo de Perfil"
                              data={tipo}
                            />
                          </div>
                        )}
                      </>
                    )}

                    {/* <div className="col-span-12 sm:col-span-12">
                <SelectFormik
                required
                name="ativo"
                label="Status"
                data={status}
                />
              </div> */}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <Button
                  title={empty ? "Criar" : "Editar"}
                  loading={account.loading}
                />
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <PasswordForm onSubmit={(password) => createAccount(password)} />
      )}
    </>
  );
};

export default RegisterForm;
