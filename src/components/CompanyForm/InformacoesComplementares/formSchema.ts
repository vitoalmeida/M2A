import * as Yup from "yup";
import { formErrors } from "../../../helpers";

const validationSchema = Yup.object().shape({
  ds_negocio: Yup.string(),
  missao: Yup.string(),
  visao: Yup.string(),
  valores: Yup.string(),
  resp_nome: Yup.string().required(formErrors.errorMessages.required),
  resp_sobrenome: Yup.string().required(formErrors.errorMessages.required),
  resp_email: Yup.string()
    .email(formErrors.errorMessages.invalidEmail)
    .required(formErrors.errorMessages.required),
  resp_sexo: Yup.string().required(formErrors.errorMessages.required),
  resp_formacao_academica: Yup.string().required(
    formErrors.errorMessages.required
  ),
});

export default {
  // validate,
  validationSchema,
  validateOnBlur: false,
  validateOnChange: false,
};
