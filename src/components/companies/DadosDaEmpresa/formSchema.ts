import * as Yup from "yup";
import { formErrors } from "../../../helpers";

const validationSchema = Yup.object().shape({
  cnpj: Yup.string().required(formErrors.errorMessages.required),
  razao_social: Yup.string().required(formErrors.errorMessages.required),
  fantasia: Yup.string().required(formErrors.errorMessages.required),
  num_empregados: Yup.string().required(formErrors.errorMessages.required),
  dt_ano_inicio: Yup.string().required(formErrors.errorMessages.required),
  bool_master: Yup.string(),
  inscricao_estadual: Yup.string(),
  grupo: Yup.string().required(formErrors.errorMessages.required),
  segmento: Yup.string().required(formErrors.errorMessages.required),
  setor: Yup.string().required(formErrors.errorMessages.required),
  tipo_industria: Yup.string().required(formErrors.errorMessages.required),
  faturamento: Yup.string().required(formErrors.errorMessages.required),
  projeto: Yup.string().required(formErrors.errorMessages.required),
  valor_arrecadacao: Yup.string().required(formErrors.errorMessages.required),
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
