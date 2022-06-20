/* eslint-disable no-shadow */

import { Address } from "../general/types";

/* eslint-disable no-unused-vars */
export enum CompaniesTypes {
  GET_COMPANY_REQUEST = "@companies/GET_COMPANY_REQUEST",
  GET_COMPANY_SUCCESS = "@companies/GET_COMPANY_SUCCESS",
  GET_COMPANY_FAILURE = "@companies/GET_COMPANY_FAILURE",

  GET_COMPANIES_REQUEST = "@companies/GET_COMPANIES_REQUEST",
  GET_COMPANIES_SUCCESS = "@companies/GET_COMPANIES_SUCCESS",
  GET_COMPANIES_FAILURE = "@companies/GET_COMPANIES_FAILURE",

  REGISTER_COMPANY_REQUEST = "@companies/REGISTER_COMPANY_REQUEST",
  REGISTER_COMPANY_SUCCESS = "@companies/REGISTER_COMPANY_SUCCESS",
  REGISTER_COMPANY_FAILURE = "@companies/REGISTER_COMPANY_FAILURE",

  DELETE_COMPANY_REQUEST = "@companies/DELETE_COMPANY_REQUEST",
  DELETE_COMPANY_SUCCESS = "@companies/DELETE_COMPANY_SUCCESS",
  DELETE_COMPANY_FAILURE = "@companies/DELETE_COMPANY_FAILURE",

  SET_EDIT_COMPANY = "@companies/SET_EDIT_COMPANY",
  REMOVE_EDIT_COMPANY = "@companies/REMOVE_EDIT_COMPANY",

  CLEAR_ERROR = "@companies/CLEAR_ERROR",

  CLEAR_DATA = "@companies/CLEAR_DATA",
}

export interface GetCompany {
  type: CompaniesTypes.GET_COMPANY_REQUEST;
  payload: { companyId: number };
}

export interface GetCompanySuccess {
  type: CompaniesTypes.GET_COMPANY_SUCCESS;
  payload: { data: Company[] };
}

export interface GetCompanyFailure {
  type: CompaniesTypes.GET_COMPANY_FAILURE;
}

export interface GetCompanies {
  type: CompaniesTypes.GET_COMPANIES_REQUEST;
}

export interface GetCompaniesSuccess {
  type: CompaniesTypes.GET_COMPANIES_SUCCESS;
  payload: { data: Company[] };
}

export interface GetCompaniesFailure {
  type: CompaniesTypes.GET_COMPANIES_FAILURE;
}

export interface RegisterCompany {
  type: CompaniesTypes.REGISTER_COMPANY_REQUEST;
  payload: { data: Company };
}

export interface RegisterCompanySuccess {
  type: CompaniesTypes.REGISTER_COMPANY_SUCCESS;
  payload: { data: Company };
}

export interface RegisterCompanyFailure {
  type: CompaniesTypes.REGISTER_COMPANY_FAILURE;
}
export interface DeleteCompany {
  type: CompaniesTypes.DELETE_COMPANY_REQUEST;
  payload: { companyId: number };
}

export interface DeleteCompanySuccess {
  type: CompaniesTypes.DELETE_COMPANY_SUCCESS;
}

export interface DeleteCompanyFailure {
  type: CompaniesTypes.DELETE_COMPANY_FAILURE;
}

export interface SetEditCompany {
  type: CompaniesTypes.SET_EDIT_COMPANY;
  payload: { data: Company };
}

export interface RemoveEditCompany {
  type: CompaniesTypes.REMOVE_EDIT_COMPANY;
}

export interface ClearError {
  type: CompaniesTypes.CLEAR_ERROR;
}

export interface ClearData {
  type: CompaniesTypes.CLEAR_DATA;
}

export type CompaniesActionTypes =
  | GetCompany
  | GetCompanySuccess
  | GetCompanyFailure
  | GetCompanies
  | GetCompaniesSuccess
  | GetCompaniesFailure
  | RegisterCompany
  | RegisterCompanySuccess
  | RegisterCompanyFailure
  | DeleteCompany
  | DeleteCompanySuccess
  | DeleteCompanyFailure
  | SetEditCompany
  | RemoveEditCompany
  | ClearError
  | ClearData;

export interface CompaniesState {
  loading: boolean;
  editCompany: Company | null;
  company: { data: Company[] | null };
  companies: { data: Company[] | null; count: number | null };
  error: boolean | null;
}

export interface Company {
  id: number;
  cnpj: string;
  razao_social: string;
  fantasia: string;
  num_empregados: string;
  dt_ano_inicio: string;
  telefone: string;
  celular?: string;
  inscricao_estadual?: string;
  fax?: string;
  bool_master?: boolean;
  ds_negocio?: string;
  missao?: string;
  visao?: string;
  valores?: string;
  grupo: { nome_grupo: string };
  segmento: { ds_segmento: string };
  setor: { ds_setor: string };
  tipo_industria: { ds_tipo_industria: string };
  faturamento: { dt_ano: string; valor: number };
  projeto: number;
  endereco: Address;
  valor_arrecadacao: { tipo_arrecadacao: string };
}
