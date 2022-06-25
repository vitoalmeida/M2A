import * as Yup from "yup";
import { formErrors } from "../../../helpers";

const initialValues: any = {
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, formErrors.errorMessages.shortPassword)
    .required(formErrors.errorMessages.required),
  confirmPassword: Yup.string()
    .required(formErrors.errorMessages.required)
    .oneOf(
      [Yup.ref("password"), null],
      formErrors.errorMessages.differentPassword
    ),
});

export default {
  initialValues,
  validationSchema,
  validateOnBlur: false,
  validateOnChange: false,
};
