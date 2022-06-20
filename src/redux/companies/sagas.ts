// eslint-disable-next-line no-unused-vars
import { all, call, delay, put, takeLatest } from "redux-saga/effects";
import { CompaniesActions } from ".";
import {
  CompaniesTypes,
  Company,
  DeleteCompany,
  GetCompanies,
  GetCompany,
  RegisterCompany,
} from "./types";
import { customHistory } from "../../routes/CustomBrowserRouter";
import * as api from "../../services/index";
import * as helpers from "../../helpers/index";
import showToast from "../../helpers/showToast";

function* getCompany({ payload: { companyId } }: GetCompany) {
  try {
    const { data: returnData } = yield call(
      api.companies.getCompany,
      String(companyId)
    );

    yield getCompanySuccess(returnData.user);
  } catch (err) {
    yield put(CompaniesActions.getCompanyFailure());

    showToast(helpers.formErrors.formatError(err), "error");
  }
}

function* getCompanySuccess(data) {
  yield put(CompaniesActions.getCompanySuccess(data));
}

function* getCompanies() {
  try {
    const { data: returnData } = yield call(api.companies.getCompanies);

    yield getCompaniesSuccess(returnData.results, returnData.count);
  } catch (err) {
    yield put(CompaniesActions.getCompaniesFailure());

    showToast(helpers.formErrors.formatError(err), "error");
  }
}

function* getCompaniesSuccess(data: Company[], count: number) {
  yield put(CompaniesActions.getCompaniesSuccess(data, count));
}

function* registerCompany({ payload: { data } }: RegisterCompany) {
  try {
    const { data: address } = yield call(
      api.general.registerAddress,
      data.endereco
    );

    yield call(api.companies.registerCompany, {
      ...data,
      endereco: address.id,
    });

    yield registerCompanySuccess(data);
  } catch (err) {
    yield put(CompaniesActions.registerCompanyFailure());
    showToast(helpers.formErrors.formatError(err), "error");

    yield delay(500);
    yield put(CompaniesActions.clearError());
  }
}

function* registerCompanySuccess(data) {
  yield put(CompaniesActions.registerCompanySuccess(data));
  yield put(CompaniesActions.getCompaniesRequest());
  yield put(CompaniesActions.removeEditCompany());
  showToast("Empresa cadastrada com sucesso!", "success");

  yield delay(500);
  yield put(CompaniesActions.clearError());
  customHistory.push("/companies");
}

function* deleteCompany({ payload: { companyId } }: DeleteCompany) {
  try {
    yield call(api.companies.deleteCompany, String(companyId));

    yield deleteCompanySuccess();
  } catch (err) {
    yield put(CompaniesActions.deleteCompanyFailure());
    showToast(helpers.formErrors.formatError(err), "error");

    yield delay(500);
    yield put(CompaniesActions.clearError());
  }
}

function* deleteCompanySuccess() {
  yield put(CompaniesActions.deleteCompanySuccess());
  yield put(CompaniesActions.getCompaniesRequest());
  showToast("Empresa deletada com sucesso!", "success");

  yield delay(500);
  yield put(CompaniesActions.clearError());
}

function clearData() {
  showToast("Deslogado com sucesso!");
}

function* companiesSaga() {
  yield all([takeLatest(CompaniesTypes.GET_COMPANY_REQUEST, getCompany)]);
  yield all([takeLatest(CompaniesTypes.GET_COMPANIES_REQUEST, getCompanies)]);
  yield all([
    takeLatest(CompaniesTypes.REGISTER_COMPANY_REQUEST, registerCompany),
    takeLatest(CompaniesTypes.DELETE_COMPANY_REQUEST, deleteCompany),
  ]);
  yield all([takeLatest(CompaniesTypes.CLEAR_DATA, clearData)]);
}

export default companiesSaga;
