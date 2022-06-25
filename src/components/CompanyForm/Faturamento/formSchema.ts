import * as Yup from "yup";
import { formErrors } from "../../../helpers";

const validationSchema = Yup.object().shape({
  valor_arrecadacao: Yup.string().required(formErrors.errorMessages.required),
  faturamentoAno1: Yup.string(),
  faturamentoAno2: Yup.string(),
  faturamentoAno3: Yup.string(),
  faturamentoAno4: Yup.string(),
});

export default {
  validationSchema,
  validateOnBlur: false,
  validateOnChange: false,
};
