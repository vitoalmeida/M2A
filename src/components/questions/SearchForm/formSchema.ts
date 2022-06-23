import * as Yup from "yup";

const initialValues: any = {
  pesquisa: "",
  uf: "",
  empresa_vinculada: "",
  arrecadacao: "",
  setor: "",
};

const validationSchema = Yup.object().shape({
  pesquisa: Yup.string(),
  uf: Yup.string(),
  empresa_vinculada: Yup.string(),
  arrecadacao: Yup.string(),
  setor: Yup.string(),
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
  initialValues,
  validationSchema,
  validateOnBlur: false,
  validateOnChange: false,
};
