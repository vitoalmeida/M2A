/* eslint-disable no-shadow */

import { Company } from "../companies/types";

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
}

export interface GetAccountsSuccess {
  type: AccountTypes.GET_ACCOUNTS_SUCCESS;
  payload: { data: Profile[]; count: number };
}

export interface GetAccountsFailure {
  type: AccountTypes.GET_ACCOUNTS_FAILURE;
}

export interface RegisterAccount {
  type: AccountTypes.REGISTER_ACCOUNT_REQUEST;
  payload: { data: RegisterAccountType };
}

export interface RegisterAccountSuccess {
  type: AccountTypes.REGISTER_ACCOUNT_SUCCESS;
  payload: { data: Account };
}

export interface RegisterAccountFailure {
  type: AccountTypes.REGISTER_ACCOUNT_FAILURE;
}

export interface ClearData {
  type: AccountTypes.CLEAR_DATA;
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
  | ClearData;

export interface AccountState {
  loading: boolean;
  data: Account | null;
  token: number | null;
  accountList: { data: Account[] | null; count: number | null };
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

export interface Profile {
  id?: number;
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  username: string;
  telefone: string;
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
  user_inf: Company;
}
