import * as Yup from "yup";
import { formErrors } from "../../../../helpers";

const initialValues: any = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email(formErrors.errorMessages.invalidEmail)
    .required(formErrors.errorMessages.required),
  password: Yup.string()
    .min(6, formErrors.errorMessages.shortPassword)
    .required(formErrors.errorMessages.required),
});

export default {
  initialValues,
  validationSchema,
  validateOnBlur: false,
  validateOnChange: false,
};
