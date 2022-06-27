// eslint-disable-next-line no-unused-vars
import { all, call, delay, put, takeLatest } from "redux-saga/effects";
import { AccountActions } from ".";
import { AccountTypes, GetAccount, Profile, RegisterAccount } from "./types";
import { customHistory } from "../../routes/CustomBrowserRouter";
import * as api from "../../services/index";
import * as helpers from "../../helpers/index";
import showToast from "../../helpers/showToast";
import configApi from "../../services/config";

function* getAccount({ payload: { data } }: GetAccount) {
  try {
    const { data: returnData } = yield call(api.account.login, data);

    if (returnData.user?.user_inf?.endereco) {
      const { data: address } = yield call(
        api.general.getAddress,
        returnData.user.user_inf.endereco
      );

      returnData.user.user_inf.endereco = address;
    }

    const isCompany = returnData.user.tipo === 3 || returnData.user.tipo === 4;

    showToast("Logado com sucesso!", "success");
    yield getAccountSuccess(
      { ...returnData.user, isCompany },
      returnData.access,
      isCompany
    );
  } catch (err) {
    yield put(AccountActions.getAccountFailure());

    showToast(helpers.formErrors.formatError(err), "error");
  }
}

function* getAccountSuccess(data, token, isCompany) {
  configApi.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  yield put(AccountActions.getAccountSuccess(data, token));

  if (isCompany) customHistory.push("/questionnaires");
  else customHistory.push("/companies");
}

function* getAccounts() {
  try {
    const { data: admins } = yield call(api.account.getAdminUsers);
    // const { data: consultants } = yield call(api.account.getColsultantUsers);
    const consultants = { results: [] };

    const formatedAdmins = admins.results.map((admin) => {
      return { ...admin, tipo: 1 };
    });

    const formatedConsultants = consultants.results.map((consultant) => {
      return { ...consultant, tipo: 1 };
    });

    yield getAccountsSuccess([...formatedAdmins, ...formatedConsultants], 20);
  } catch (err) {
    yield put(AccountActions.getAccountsFailure());

    showToast(helpers.formErrors.formatError(err), "error");
  }
}

function* getAccountsSuccess(data: Profile[], count: number) {
  yield put(AccountActions.getAccountsSuccess(data, count));
}

function* registerAccount({ payload: { data } }: RegisterAccount) {
  try {
    const { data: address } = yield call(
      api.general.registerAddress,
      data.user_inf?.endereco
    );

    data.user_inf.endereco = address.id;

    yield call(api.account.registerAccount, {
      ...data,
      endereco: address.id,
    });

    showToast("Registrado com sucesso!", "success");
    yield registerAccountSuccess(data);
  } catch (err) {
    yield put(AccountActions.registerAccountFailure());

    console.log(err);
    showToast(helpers.formErrors.formatError(err), "error");
  }
}

function* registerAccountSuccess(data) {
  yield put(AccountActions.registerAccountSuccess(data));
  yield put(
    AccountActions.getAccountRequest({
      password: data.password,
      username: data.username,
    })
  );
}

function clearData() {
  showToast("Deslogado com sucesso!");
}

function* generalSaga() {
  yield all([takeLatest(AccountTypes.GET_ACCOUNT_REQUEST, getAccount)]);
  yield all([takeLatest(AccountTypes.GET_ACCOUNTS_REQUEST, getAccounts)]);
  yield all([
    takeLatest(AccountTypes.REGISTER_ACCOUNT_REQUEST, registerAccount),
  ]);
  yield all([takeLatest(AccountTypes.CLEAR_DATA, clearData)]);
}

export default generalSaga;
