import * as Yup from "yup";
import { formErrors } from "../../../helpers";

const validationSchema = Yup.object().shape({
  cep: Yup.string().required(formErrors.errorMessages.required),
  logradouro: Yup.string(),
  bairro: Yup.string(),
  cidade: Yup.string(),
  complemento: Yup.string(),
  uf: Yup.string().required(formErrors.errorMessages.required),
  fax: Yup.string(),
  telefone: Yup.string().required(formErrors.errorMessages.required),
  celular: Yup.string(),
});

// async function validate({ birthday, email }: AccountRegister) {
//   const _birthday = birthday.split("/").reverse().join("-");
//   const now = new Date();
//   const hundredYears = helpers.date_time.subYearsFromNow(100);

//   if (!helpers.date_time.isDateValid(_birthday)) {
//     return { birthday: translate("YUP_DATE_ERROR") };
//   }

//   if (helpers.date_time.isDateAfter(_birthday, now)) {
//     return { birthday: translate("YUP_DATE_ERROR") };
//   }
//   if (helpers.date_time.isDateBefore(_birthday, hundredYears)) {
//     return { birthday: translate("YUP_DATE_ERROR") };
//   }

//   try {
//     const { data: emailValidation } = await api.auth.validateEmail(email);
//     if (emailValidation.isAvailable === false) {
//       return { email: translate("YUP_EMAIL_TAKEN") };
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }

export default {
  // validate,
  validationSchema,
  validateOnBlur: false,
  validateOnChange: false,
};
