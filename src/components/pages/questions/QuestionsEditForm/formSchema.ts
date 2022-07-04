import * as Yup from "yup";
import { formErrors } from "../../../../helpers";

const validationSchema = Yup.object().shape({
  texto_pergunta: Yup.string().required(formErrors.errorMessages.required),
  objetivo: Yup.string(),
  conceito: Yup.string(),
  fundamento: Yup.string().required(formErrors.errorMessages.required),
});

export default {
  validationSchema,
  validateOnBlur: false,
  validateOnChange: false,
};
