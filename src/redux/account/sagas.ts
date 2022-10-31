/* eslint-disable import/no-anonymous-default-export */
// eslint-disable-next-line no-unused-vars
import { all, call, delay, put, select, takeLatest } from "redux-saga/effects";
import { AccountActions } from ".";
import {
  Account,
  AccountTypes,
  DeleteAccountRequest,
  GetAccount,
  GetAccounts,
  Profile,
  RegisterAccount,
  SetEditAccount,
} from "./types";
import { customHistory } from "../../routes/CustomBrowserRouter";
import * as api from "../../services/index";
import * as helpers from "../../helpers/index";
import showToast from "../../helpers/showToast";
import configApi from "../../services/config";
import { CompaniesActions } from "../companies";
import {
  filterUsers,
  formatFilter,
  getRemainingCount,
} from "../../helpers/formatData";
import { Count } from "../companies/types";

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

    showToast("Login realizado com sucesso!", "success");
    yield getAccountSuccess(
      { ...returnData.user, isCompany },
      returnData.access,
      isCompany
    );
  } catch (err) {
    yield put(AccountActions.getAccountFailure());
    console.error(err);
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

function* getAccounts({ payload: { filter, params } }: GetAccounts) {
  try {
    const { account: accountState } = yield select();

    let adminCountTotal = accountState.accountList.adminCount.total;
    let consultantCountTotal = accountState.accountList.consultantCount.total;

    if (!adminCountTotal) {
      const { data: adminCount } = yield call(api.account.getAdminUsers, {
        page: 0,
        limit: 0,
      });
      adminCountTotal = adminCount.count;
    }

    if (!consultantCountTotal) {
      const { data: consultantCount } = yield call(
        api.account.getColsultantUsers,
        {
          page: 0,
          limit: 0,
        }
      );
      consultantCountTotal = consultantCount.count;
    }

    let [firstFilter, seccondFilter] = getRemainingCount(
      adminCountTotal,
      consultantCountTotal,
      filter
    );

    firstFilter = formatFilter(firstFilter);
    seccondFilter = formatFilter(seccondFilter);

    const { data: admins } = yield call(api.account.getAdminUsers, firstFilter);
    const { data: consultants } = yield call(
      api.account.getColsultantUsers,
      seccondFilter
    );

    let formatedAdmins = admins.results.map((admin) => {
      return { ...admin, tipo: 1 };
    });

    let formatedConsultants = consultants.results.map((consultant) => {
      return { ...consultant, tipo: 2 };
    });

    for (let i = 0; i < formatedAdmins.length; i++) {
      const { data: account } = yield call(
        api.account.getAccount,
        formatedAdmins[i].usuario
      );
      formatedAdmins[i].ativo = account.ativo;
      formatedAdmins[i].username = account.username;
      formatedAdmins[i].email = account.email;
    }

    for (let i = 0; i < formatedConsultants.length; i++) {
      const { data: account } = yield call(
        api.account.getAccount,
        formatedConsultants[i].usuario
      );
      formatedConsultants[i].ativo = account.ativo;
      formatedConsultants[i].username = account.username;
      formatedConsultants[i].email = account.email;
    }

    let allFilteredUsers: Profile[] = [];

    if (params) {
      formatedAdmins = filterUsers(formatedAdmins, params);
      formatedConsultants = filterUsers(formatedConsultants, params);
    }

    allFilteredUsers = [...formatedAdmins, ...formatedConsultants];

    yield getAccountsSuccess(
      allFilteredUsers,
      {
        total: params ? formatedAdmins.length : admins.count,
        current:
          accountState.accountList.adminCount.current + formatedAdmins.length,
      },
      {
        total: params ? formatedConsultants.length : consultants.count,
        current:
          accountState.accountList.consultantCount.current +
          formatedConsultants.length,
      }
    );
  } catch (err) {
    yield put(AccountActions.getAccountsFailure());

    showToast(helpers.formErrors.formatError(err), "error");
  }
}

function* getAccountsSuccess(
  data: Profile[],
  adminCount: Count,
  consultantCount: Count
) {
  yield put(
    AccountActions.getAccountsSuccess(data, adminCount, consultantCount)
  );
}

function* registerAccount({ payload: { data, self } }: RegisterAccount) {
  try {
    if (data.tipo === 3 || data.tipo === 4) {
      const { data: address } = yield call(
        api.general.registerAddress,
        data.user_inf?.endereco
      );
      data.user_inf.endereco = address.id;

      yield call(api.account.registerAccount, {
        ...data,
        endereco: address.id,
      });
    } else {
      yield call(api.account.registerAccount, data);
    }

    showToast("Registrado com sucesso!", "success");
    yield registerAccountSuccess(data, self);
  } catch (err) {
    yield put(AccountActions.registerAccountFailure());

    console.error(err);
    showToast(helpers.formErrors.formatError(err), "error");
  }
}

function* registerAccountSuccess(data, self) {
  if (self) {
    yield put(AccountActions.registerAccountSuccess(data));
    yield put(
      AccountActions.getAccountRequest({
        password: data.password,
        username: data.username,
      })
    );
  } else {
    yield put(
      AccountActions.getAccountsRequest({
        limit: 10,
        page: 0,
      })
    );
  }
}

function* setEditAccount({ payload: { data } }: SetEditAccount) {
  try {
    yield setEditAccountSuccess(data);
  } catch (err) {
    yield setEditAccountFailure(err);
  }
}

function* setEditAccountSuccess(data: Profile) {
  yield put(AccountActions.setEditAccountSuccess(data));
}

function* setEditAccountFailure(err: any) {
  yield put(AccountActions.setEditAccountFailure());
  console.error(err);
}

function* deleteAccount({
  payload: { profileId, userId, type },
}: DeleteAccountRequest) {
  try {
    if (type === 1) {
      yield call(api.account.deleteAccount, String(userId));
      yield call(api.account.deleteAdmin, String(profileId));
    } else {
      yield call(api.account.deleteAccount, String(userId));
      yield call(api.account.deleteColsultant, String(profileId));
    }

    yield deleteAccountSuccess();
  } catch (err) {
    yield deleteAccountSuccess();
  }
}

function* deleteAccountSuccess() {
  yield put(AccountActions.deleteAccountSuccess());
  yield put(
    AccountActions.getAccountsRequest({
      limit: 10,
      page: 0,
    })
  );
  showToast("Usuário deletado com sucesso!", "success");
}

function* deleteAccountFailure(err: any) {
  yield put(AccountActions.deleteAccountFailure());
  showToast(helpers.formErrors.formatError(err), "error");
  console.error(err);
}

function* editAccount({ payload: { data } }: SetEditAccount) {
  try {
    // yield call(api.account.setAccount, String(data.id), { ativo: data.ativo });

    if (data.tipo === 1) {
      const formatedUser = data;
      delete formatedUser.email;
      delete formatedUser.celular;
      delete formatedUser.telefone;
      delete formatedUser.uf;
      delete formatedUser.formacao;
      delete formatedUser.tipo;
      delete formatedUser.ativo;

      yield call(api.account.setAdminAccount, String(data.id), formatedUser);
    } else {
      const formatedUser = data;
      yield call(
        api.account.setColsultantAccount,
        String(data.id),
        formatedUser
      );
    }

    yield editAccountSuccess();
  } catch (err) {
    yield editAccountFailure(err);
  }
}

function* editAccountSuccess() {
  yield put(AccountActions.editAccountSuccess());
  yield put(
    AccountActions.getAccountsRequest({
      limit: 10,
      page: 0,
    })
  );
  showToast("Usuário editado com sucesso!", "success");
}

function* editAccountFailure(err: any) {
  yield put(AccountActions.editAccountFailure());
  showToast(helpers.formErrors.formatError(err), "error");
  console.error(err);
}

function* clearData() {
  yield put(CompaniesActions.clearData());
  showToast("Desconectado com sucesso!");
}

export default [
  takeLatest(AccountTypes.GET_ACCOUNT_REQUEST, getAccount),
  takeLatest(AccountTypes.GET_ACCOUNTS_REQUEST, getAccounts),
  takeLatest(AccountTypes.REGISTER_ACCOUNT_REQUEST, registerAccount),
  takeLatest(AccountTypes.SET_EDIT_ACCOUNT_REQUEST, setEditAccount),
  takeLatest(AccountTypes.DELETE_ACCOUNT_REQUEST, deleteAccount),
  takeLatest(AccountTypes.EDIT_ACCOUNT_REQUEST, editAccount),
  takeLatest(AccountTypes.CLEAR_DATA, clearData),
];
