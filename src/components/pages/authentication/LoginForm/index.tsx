import { Formik, Field, Form } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AccountActions } from "../../../../redux/account";
import { useSelector } from "../../../../redux/hooks";
import { InputFormik, Button } from "../../../index";
import formSchema from "./formSchema";
import { customHistory } from "../../../../routes/CustomBrowserRouter";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state);

  function handleSubmit(values) {
    dispatch(
      AccountActions.getAccountRequest({ ...values, username: values.email })
    );
  }

  return (
    <Formik onSubmit={handleSubmit} {...formSchema}>
      <Form>
        <InputFormik
          name="email"
          label="Email"
          placeholder="exemplo@gmail.com"
        />

        <InputFormik
          name="password"
          label="Senha"
          placeholder="••••••"
          type="password"
        />

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <Field
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Lembrar dados
            </label>
          </div>

          <div className="text-sm">
            <a
              href="/"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Esqueceu sua senha?
            </a>
          </div>
        </div>
        <div className="flex mt-12 justify-center">
          <Button className="w-full" title="Entrar" loading={account.loading} />
        </div>
      </Form>
    </Formik>
  );
};

export default LoginForm;
