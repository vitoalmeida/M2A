import { action } from "typesafe-actions";
import { Filter } from "../../types";
import { Count } from "../companies/types";
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

export function getAccountsRequest(filter: Filter): AccountActionTypes {
  return action(AccountTypes.GET_ACCOUNTS_REQUEST, { filter });
}

export function getAccountsSuccess(
  data: Profile[],
  adminCount: Count,
  consultantCount: Count
): AccountActionTypes {
  return action(AccountTypes.GET_ACCOUNTS_SUCCESS, {
    data,
    adminCount,
    consultantCount,
  });
}

export function getAccountsFailure(): AccountActionTypes {
  return action(AccountTypes.GET_ACCOUNT_FAILURE);
}

export function registerAccountRequest(
  data: RegisterAccountType,
  self: boolean
): AccountActionTypes {
  return action(AccountTypes.REGISTER_ACCOUNT_REQUEST, { data, self });
}

export function registerAccountSuccess(data: Account): AccountActionTypes {
  return action(AccountTypes.REGISTER_ACCOUNT_SUCCESS, { data });
}

export function registerAccountFailure(): AccountActionTypes {
  return action(AccountTypes.REGISTER_ACCOUNT_FAILURE);
}

export function deleteAccountRequest(
  profileId: number,
  userId: number,
  type: number
): AccountActionTypes {
  return action(AccountTypes.DELETE_ACCOUNT_REQUEST, {
    profileId,
    userId,
    type,
  });
}

export function deleteAccountSuccess(): AccountActionTypes {
  return action(AccountTypes.DELETE_ACCOUNT_SUCCESS);
}

export function deleteAccountFailure(): AccountActionTypes {
  return action(AccountTypes.DELETE_ACCOUNT_FAILURE);
}

export function setEditAccountRequest(data: Profile): AccountActionTypes {
  return action(AccountTypes.SET_EDIT_ACCOUNT_REQUEST, { data });
}

export function setEditAccountSuccess(data: Profile): AccountActionTypes {
  return action(AccountTypes.SET_EDIT_ACCOUNT_SUCCESS, { data });
}

export function setEditAccountFailure(): AccountActionTypes {
  return action(AccountTypes.SET_EDIT_ACCOUNT_FAILURE);
}

export function editAccountRequest(data: Profile): AccountActionTypes {
  return action(AccountTypes.EDIT_ACCOUNT_REQUEST, { data });
}

export function editAccountSuccess(): AccountActionTypes {
  return action(AccountTypes.EDIT_ACCOUNT_SUCCESS);
}

export function editAccountFailure(): AccountActionTypes {
  return action(AccountTypes.EDIT_ACCOUNT_FAILURE);
}

export function removeEditAccountRequest(): AccountActionTypes {
  return action(AccountTypes.REMOVE_EDIT_ACCOUNT);
}

export function clearData(): AccountActionTypes {
  return action(AccountTypes.CLEAR_DATA);
}
