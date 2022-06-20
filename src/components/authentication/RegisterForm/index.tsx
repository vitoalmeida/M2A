import { Formik, Field, Form } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AccountActions } from "../../../redux/account";
import { GeneralActions } from "../../../redux/general";
import { useSelector } from "../../../redux/hooks";
import Button from "../../Button";
import { InputFormik, SelectFormik } from "../../index";
import formSchema from "./formSchema";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { general, account } = useSelector((state) => state);

  function handleSubmit(values) {
    console.log(values);
    delete values.confirmPassword;
    dispatch(
      AccountActions.registerAccountRequest({
        ...values,
        uf: general.uf.find((uf) => uf.value === values.uf).id,
        username: values.email,
      })
    );
  }

  useEffect(() => {
    dispatch(GeneralActions.getUfRequest());
  }, []);

  return (
    <Formik onSubmit={(values) => handleSubmit({ ...values })} {...formSchema}>
      <Form>
        <div className="flex">
          <div className="md:col-span-2">
            <div className="grid grid-cols-12 gap-x-6">
              <div className="flex flex-col col-span-12 sm:col-span-6">
                <InputFormik name="nome" placeholder="João" label="Nome" />
              </div>
              <div className="flex flex-col col-span-12 sm:col-span-6">
                <InputFormik
                  name="sobrenome"
                  placeholder="Silva"
                  label="Sobrenome"
                />
              </div>

              <div className="flex flex-col col-span-12 sm:col-span-7">
                <InputFormik
                  name="cpf"
                  placeholder="000.000.000-00"
                  label="CPF"
                />
              </div>
              <div className="flex flex-col col-span-12 sm:col-span-5">
                <InputFormik
                  name="telefone"
                  placeholder="(00) 0 0000-0000"
                  label="Telefone"
                />
              </div>

              <div className="flex flex-col col-span-12 sm:col-span-12">
                <InputFormik
                  name="email"
                  placeholder="exemplo@email.com"
                  label="Email"
                />
              </div>

              <div className="col-span-12 sm:col-span-5">
                <SelectFormik
                  name="uf"
                  placeholder="DF"
                  label="Estado"
                  data={general.uf}
                />
              </div>
              <div className="col-span-12 sm:col-span-7">
                <SelectFormik
                  name="formacao"
                  placeholder="Superior"
                  label="Formação"
                  data={[
                    { label: "Analfabeto", value: "analfabeto" },
                    { label: "Primeiro grau", value: "primeiro grau" },
                    { label: "Segundo grau", value: "segundo grau" },
                    { label: "Superior", value: "superior" },
                    { label: "Pós-graduação", value: "pos graduacao" },
                    {
                      label: "Mestrado e/ou Doutorado",
                      value: "mestrado ou doutorado",
                    },
                  ]}
                />
              </div>

              <div className="flex flex-col col-span-12 sm:col-span-6">
                <InputFormik
                  name="password"
                  type="password"
                  placeholder="••••••"
                  label="Senha"
                />
              </div>
              <div className="flex flex-col col-span-12 sm:col-span-6">
                <InputFormik
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••"
                  label="Confimar senha"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Button title="Registrar" loading={account.loading} />
        </div>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
