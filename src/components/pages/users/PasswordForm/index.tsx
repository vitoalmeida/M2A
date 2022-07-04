import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { AccountActions } from "../../../../redux/account";
import { CompaniesActions } from "../../../../redux/companies";
import { useSelector } from "../../../../redux/hooks";
import Button from "../../../Button";
import InputFormik from "../../../InputFormik";
import formSchema from "./formSchema";

interface Props {
  onSubmit: (password: string) => any;
}

const PasswordForm: React.FC<Props> = ({ onSubmit }) => {
  const { account } = useSelector((state) => state);

  function handleSubmit(values) {
    onSubmit(values.password);
  }

  return (
    <div>
      <Formik
        onSubmit={(values) => handleSubmit({ ...values })}
        {...formSchema}
      >
        <Form>
          <div className="flex flex-col col-span-12 sm:col-span-6">
            <InputFormik
              required
              autoFocus
              name="password"
              type="password"
              placeholder="••••••"
              label="Senha"
            />
          </div>
          <div className="flex flex-col col-span-12 sm:col-span-6">
            <InputFormik
              required
              name="confirmPassword"
              type="password"
              placeholder="••••••"
              label="Confimar senha"
            />
          </div>
          <div className="mt-8">
            <Button title="Finalizar cadastro" loading={account.loading} />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default PasswordForm;
