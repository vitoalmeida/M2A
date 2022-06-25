import * as Yup from "yup";
import { formErrors } from "../../../helpers";

const validationSchema = Yup.object().shape({
  cep: Yup.number().required(formErrors.errorMessages.required),
  logradouro: Yup.string(),
  bairro: Yup.string(),
  cidade: Yup.string(),
  complemento: Yup.string(),
  uf: Yup.string().required(formErrors.errorMessages.required),
  fax: Yup.number(),
  telefone: Yup.number().required(formErrors.errorMessages.required),
  celular: Yup.number(),
  email: Yup.string()
    .email(formErrors.errorMessages.invalidEmail)
    .required(formErrors.errorMessages.required),
});

export default {
  validationSchema,
  validateOnBlur: false,
  validateOnChange: false,
};
