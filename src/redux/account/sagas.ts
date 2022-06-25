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

    showToast("Logado com sucesso!", "success");
    yield getAccountSuccess(returnData.user, returnData.access);
  } catch (err) {
    yield put(AccountActions.getAccountFailure());

    showToast(helpers.formErrors.formatError(err), "error");
  }
}

function* getAccountSuccess(data, token) {
  configApi.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  yield put(AccountActions.getAccountSuccess(data, token));
  customHistory.push("/companies");
}

function* getAccounts() {
  try {
    const { data: returnData } = yield call(api.account.getUsers);

    yield getAccountsSuccess(returnData.results, returnData.count);
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

    console.log(address.id);

    yield call(api.account.registerAccount, {
      ...data,
      endereco: address.id,
    });
    console.log("registro");

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
