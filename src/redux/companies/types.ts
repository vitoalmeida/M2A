/* eslint-disable no-shadow */

import { GenericData } from "../../types";
import { Address } from "../general/types";

/* eslint-disable no-unused-vars */
export enum CompaniesTypes {
  GET_COMPANY_REQUEST = "@companies/GET_COMPANY_REQUEST",
  GET_COMPANY_SUCCESS = "@companies/GET_COMPANY_SUCCESS",
  GET_COMPANY_FAILURE = "@companies/GET_COMPANY_FAILURE",

  GET_COMPANIES_REQUEST = "@companies/GET_COMPANIES_REQUEST",
  GET_COMPANIES_SUCCESS = "@companies/GET_COMPANIES_SUCCESS",
  GET_COMPANIES_FAILURE = "@companies/GET_COMPANIES_FAILURE",

  GET_MASTER_COMPANIES_REQUEST = "@companies/GET_MASTER_COMPANIES_REQUEST",
  GET_MASTER_COMPANIES_SUCCESS = "@companies/GET_MASTER_COMPANIES_SUCCESS",
  GET_MASTER_COMPANIES_FAILURE = "@companies/GET_MASTER_COMPANIES_FAILURE",

  REGISTER_COMPANY_REQUEST = "@companies/REGISTER_COMPANY_REQUEST",
  REGISTER_COMPANY_SUCCESS = "@companies/REGISTER_COMPANY_SUCCESS",
  REGISTER_COMPANY_FAILURE = "@companies/REGISTER_COMPANY_FAILURE",

  DELETE_COMPANY_REQUEST = "@companies/DELETE_COMPANY_REQUEST",
  DELETE_COMPANY_SUCCESS = "@companies/DELETE_COMPANY_SUCCESS",
  DELETE_COMPANY_FAILURE = "@companies/DELETE_COMPANY_FAILURE",

  SET_EDIT_COMPANY_REQUEST = "@companies/SET_EDIT_COMPANY_REQUEST",
  SET_EDIT_COMPANY_SUCCESS = "@companies/SET_EDIT_COMPANY_SUCCESS",
  SET_EDIT_COMPANY_FAILURE = "@companies/SET_EDIT_COMPANY_FAILURE",

  EDIT_COMPANY_REQUEST = "@companies/EDIT_COMPANY_REQUEST",
  EDIT_COMPANY_SUCCESS = "@companies/EDIT_COMPANY_SUCCESS",
  EDIT_COMPANY_FAILURE = "@companies/EDIT_COMPANY_FAILURE",

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

export interface GetMasterCompanies {
  type: CompaniesTypes.GET_MASTER_COMPANIES_REQUEST;
}

export interface GetMasterCompaniesSuccess {
  type: CompaniesTypes.GET_MASTER_COMPANIES_SUCCESS;
  payload: { data: Company[] };
}

export interface GetMasterCompaniesFailure {
  type: CompaniesTypes.GET_MASTER_COMPANIES_FAILURE;
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
  payload: { companyId: number; userId: number; type: number };
}

export interface DeleteCompanySuccess {
  type: CompaniesTypes.DELETE_COMPANY_SUCCESS;
}

export interface DeleteCompanyFailure {
  type: CompaniesTypes.DELETE_COMPANY_FAILURE;
}

export interface SetEditCompany {
  type: CompaniesTypes.SET_EDIT_COMPANY_REQUEST;
  payload: { data: Company };
}
export interface SetEditCompanySuccess {
  type: CompaniesTypes.SET_EDIT_COMPANY_SUCCESS;
  payload: { data: Company };
}
export interface SetEditCompanyFailure {
  type: CompaniesTypes.SET_EDIT_COMPANY_FAILURE;
}

export interface EditCompany {
  type: CompaniesTypes.EDIT_COMPANY_REQUEST;
  payload: { data: Company };
}
export interface EditCompanySuccess {
  type: CompaniesTypes.EDIT_COMPANY_SUCCESS;
}
export interface EditCompanyFailure {
  type: CompaniesTypes.EDIT_COMPANY_FAILURE;
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
  | GetMasterCompanies
  | GetMasterCompaniesSuccess
  | GetMasterCompaniesFailure
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
  | SetEditCompanySuccess
  | SetEditCompanyFailure
  | EditCompany
  | EditCompanySuccess
  | EditCompanyFailure
  | RemoveEditCompany
  | ClearError
  | ClearData;

export interface CompaniesState {
  loading: boolean;
  editCompany: Company | null;
  company: { data: Company[] | null };
  masterCompanies: GenericData[] | null;
  companies: { data: Company[] | null; count: number | null };
  error: boolean | null;
}

export interface Company {
  id?: number;
  tipo?: number;
  cnpj?: string;
  email?: string;
  razao_social?: string;
  fantasia?: string;
  num_empregados?: string;
  dt_ano_inicio?: string;
  telefone?: string;
  celular?: string;
  inscricao_estadual?: string;
  fax?: string;
  master?: number;
  usuario?: number;
  bool_master?: boolean;
  ds_negocio?: string;
  missao?: string;
  visao?: string;
  valores?: string;
  segmento?: number | { ds_segmento: string };
  setor?: number | { ds_setor: string };
  tipo_industria?: { ds_tipo_industria: string };
  faturamento?: number[] | { dt_ano: string; valor: number }[];
  endereco?: Address;
  valor_arrecadacao?: number | { tipo_arrecadacao: string };
  resp_nome?: string;
  resp_sobrenome?: string;
  resp_email?: string;
  resp_sexo?: string;
  resp_formacao_academica?: string;
  // grupo: { nome_grupo: string };
  // projeto: number;
}
