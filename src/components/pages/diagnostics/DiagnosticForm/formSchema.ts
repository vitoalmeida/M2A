import * as Yup from "yup";
import { formErrors } from "../../../../helpers";

const initialValues: any = {
  to: "",
  text: "",
};

const validationSchema = Yup.object().shape({
  to: Yup.string()
    .required(formErrors.errorMessages.required)
    .email(formErrors.errorMessages.invalidEmail),
  text: Yup.string().required(formErrors.errorMessages.required),
});

export default {
  initialValues,
  validationSchema,
  validateOnBlur: false,
  validateOnChange: false,
};
