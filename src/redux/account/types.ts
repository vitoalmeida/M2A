/* eslint-disable no-shadow */

import { Filter } from "../../types";
import { Company, Count } from "../companies/types";

/* eslint-disable no-unused-vars */
export enum AccountTypes {
  GET_ACCOUNT_REQUEST = "@general/GET_ACCOUNT_REQUEST",
  GET_ACCOUNT_SUCCESS = "@general/GET_ACCOUNT_SUCCESS",
  GET_ACCOUNT_FAILURE = "@general/GET_ACCOUNT_FAILURE",

  GET_ACCOUNTS_REQUEST = "@general/GET_ACCOUNTS_REQUEST",
  GET_ACCOUNTS_SUCCESS = "@general/GET_ACCOUNTS_SUCCESS",
  GET_ACCOUNTS_FAILURE = "@general/GET_ACCOUNTS_FAILURE",

  REGISTER_ACCOUNT_REQUEST = "@general/REGISTER_ACCOUNT_REQUEST",
  REGISTER_ACCOUNT_SUCCESS = "@general/REGISTER_ACCOUNT_SUCCESS",
  REGISTER_ACCOUNT_FAILURE = "@general/REGISTER_ACCOUNT_FAILURE",

  DELETE_ACCOUNT_REQUEST = "@general/DELETE_ACCOUNT_REQUEST",
  DELETE_ACCOUNT_SUCCESS = "@general/DELETE_ACCOUNT_SUCCESS",
  DELETE_ACCOUNT_FAILURE = "@general/DELETE_ACCOUNT_FAILURE",

  SET_EDIT_ACCOUNT_REQUEST = "@companies/SET_EDIT_ACCOUNT_REQUEST",
  SET_EDIT_ACCOUNT_SUCCESS = "@companies/SET_EDIT_ACCOUNT_SUCCESS",
  SET_EDIT_ACCOUNT_FAILURE = "@companies/SET_EDIT_ACCOUNT_FAILURE",

  EDIT_ACCOUNT_REQUEST = "@companies/EDIT_ACCOUNT_REQUEST",
  EDIT_ACCOUNT_SUCCESS = "@companies/EDIT_ACCOUNT_SUCCESS",
  EDIT_ACCOUNT_FAILURE = "@companies/EDIT_ACCOUNT_FAILURE",

  REMOVE_EDIT_ACCOUNT = "@general/REMOVE_EDIT_ACCOUNT",

  CLEAR_DATA = "@general/CLEAR_DATA",
}

export interface GetAccount {
  type: AccountTypes.GET_ACCOUNT_REQUEST;
  payload: { data: LoginAccount };
}

export interface GetAccountSuccess {
  type: AccountTypes.GET_ACCOUNT_SUCCESS;
  payload: { data: Profile };
}

export interface GetAccountFailure {
  type: AccountTypes.GET_ACCOUNT_FAILURE;
}

export interface GetAccounts {
  type: AccountTypes.GET_ACCOUNTS_REQUEST;
  payload: { filter: Filter; params?: any };
}

export interface GetAccountsSuccess {
  type: AccountTypes.GET_ACCOUNTS_SUCCESS;
  payload: { data: Profile[]; adminCount: Count; consultantCount: Count };
}

export interface GetAccountsFailure {
  type: AccountTypes.GET_ACCOUNTS_FAILURE;
}

export interface RegisterAccount {
  type: AccountTypes.REGISTER_ACCOUNT_REQUEST;
  payload: { data: RegisterAccountType; self: boolean };
}

export interface RegisterAccountSuccess {
  type: AccountTypes.REGISTER_ACCOUNT_SUCCESS;
  payload: { data: Account };
}

export interface RegisterAccountFailure {
  type: AccountTypes.REGISTER_ACCOUNT_FAILURE;
}

export interface DeleteAccountRequest {
  type: AccountTypes.DELETE_ACCOUNT_REQUEST;
  payload: { profileId: number; userId: number; type: number };
}

export interface DeleteAccountSuccess {
  type: AccountTypes.DELETE_ACCOUNT_SUCCESS;
}

export interface DeleteAccountFailure {
  type: AccountTypes.DELETE_ACCOUNT_FAILURE;
}

export interface SetEditAccount {
  type: AccountTypes.SET_EDIT_ACCOUNT_REQUEST;
  payload: { data: Profile };
}

export interface SetEditAccountSuccess {
  type: AccountTypes.SET_EDIT_ACCOUNT_SUCCESS;
  payload: { data: Profile };
}

export interface SetEditAccountFailure {
  type: AccountTypes.SET_EDIT_ACCOUNT_FAILURE;
}

export interface EditAccount {
  type: AccountTypes.EDIT_ACCOUNT_REQUEST;
  payload: { data: Profile };
}

export interface EditAccountSuccess {
  type: AccountTypes.EDIT_ACCOUNT_SUCCESS;
}

export interface EditAccountFailure {
  type: AccountTypes.EDIT_ACCOUNT_FAILURE;
}

export interface RemoveEditAccount {
  type: AccountTypes.CLEAR_DATA;
}

export interface ClearData {
  type: AccountTypes.REMOVE_EDIT_ACCOUNT;
}

export type AccountActionTypes =
  | GetAccount
  | GetAccountSuccess
  | GetAccountFailure
  | GetAccounts
  | GetAccountsSuccess
  | GetAccountsFailure
  | RegisterAccount
  | RegisterAccountSuccess
  | RegisterAccountFailure
  | DeleteAccountRequest
  | DeleteAccountSuccess
  | DeleteAccountFailure
  | SetEditAccount
  | SetEditAccountSuccess
  | SetEditAccountFailure
  | EditAccount
  | EditAccountSuccess
  | EditAccountFailure
  | RemoveEditAccount
  | ClearData;

export interface AccountState {
  loading: boolean;
  data: Account | null;
  token: number | null;
  accountList: {
    data: Account[] | null;
    adminCount: Count;
    consultantCount: Count;
  };
  editAccount: Profile;
}

export interface Account {
  isCompany: boolean;
  email?: string;
  username?: string;
  password?: string;
  tipo?: number;
  ativo?: boolean;
  user_inf: Company | Profile;
}

export interface Profile extends Account {
  [x: string]: any;
  id?: number;
  nome: string;
  sobrenome: string;
  usuario: string;
  cpf: string;
  telefone: string;
  celular: string;
  formacao: string;
  perfil: string;
  uf: number | string;
}

export interface LoginAccount {
  email?: string;
  username?: string;
  password?: string;
}

export interface RegisterAccountType extends LoginAccount {
  tipo?: number;
  ativo?: boolean;
  password?: string;
  confirmPassword?: string;
  user_inf: Company | Profile;
}
