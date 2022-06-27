import { action } from "typesafe-actions";
import {
  Account,
  AccountActionTypes,
  AccountTypes,
  LoginAccount,
  Profile,
  RegisterAccountType,
} from "./types";

export function getAccountRequest(data: LoginAccount): AccountActionTypes {
  return action(AccountTypes.GET_ACCOUNT_REQUEST, { data });
}

export function getAccountSuccess(
  data: Profile,
  token: string
): AccountActionTypes {
  return action(AccountTypes.GET_ACCOUNT_SUCCESS, { data, token });
}

export function getAccountFailure(): AccountActionTypes {
  return action(AccountTypes.GET_ACCOUNT_FAILURE);
}

export function getAccountsRequest(): AccountActionTypes {
  return action(AccountTypes.GET_ACCOUNTS_REQUEST);
}

export function getAccountsSuccess(data: Profile[], count): AccountActionTypes {
  return action(AccountTypes.GET_ACCOUNTS_SUCCESS, { data, count });
}

export function getAccountsFailure(): AccountActionTypes {
  return action(AccountTypes.GET_ACCOUNT_FAILURE);
}

export function registerAccountRequest(
  data: RegisterAccountType
): AccountActionTypes {
  return action(AccountTypes.REGISTER_ACCOUNT_REQUEST, { data });
}

export function registerAccountSuccess(data: Account): AccountActionTypes {
  return action(AccountTypes.REGISTER_ACCOUNT_SUCCESS, { data });
}

export function registerAccountFailure(): AccountActionTypes {
  return action(AccountTypes.REGISTER_ACCOUNT_FAILURE);
}

export function clearData(): AccountActionTypes {
  return action(AccountTypes.CLEAR_DATA);
}
