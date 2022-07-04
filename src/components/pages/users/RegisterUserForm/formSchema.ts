import * as Yup from "yup";
import { formErrors } from "../../../../helpers";
import { RegisterAccountType } from "../../../../redux/account/types";

const validationSchema = Yup.object().shape({
  nome: Yup.string().required(formErrors.errorMessages.required),
  sobrenome: Yup.string().required(formErrors.errorMessages.required),
  ativo: Yup.string().required(formErrors.errorMessages.required),
  formacao: Yup.string(),
  uf: Yup.string(),
  telefone: Yup.string(),
  celular: Yup.string(),
  cpf: Yup.string().required(formErrors.errorMessages.required),
  email: Yup.string().required(formErrors.errorMessages.required),
  tipo: Yup.string().required(formErrors.errorMessages.required),
});

export default {
  validationSchema,
  validateOnBlur: false,
  validateOnChange: false,
};
