/* eslint-disable no-shadow */
import { GenericData } from "../../types";

/* eslint-disable no-unused-vars */
export enum GeneralTypes {
  GET_UF_REQUEST = "@general/GET_UF_REQUEST",
  GET_UF_SUCCESS = "@general/GET_UF_SUCCESS",
  GET_UF_FAILURE = "@general/GET_UF_FAILURE",

  REGISTER_ADDRESS_REQUEST = "@general/REGISTER_ADDRESS_REQUEST",
  REGISTER_ADDRESS_SUCCESS = "@general/REGISTER_ADDRESS_SUCCESS",
  REGISTER_ADDRESS_FAILURE = "@general/REGISTER_ADDRESS_FAILURE",
}

export interface GetGeneral {
  type: GeneralTypes.GET_UF_REQUEST;
}

export interface GetGeneralSuccess {
  type: GeneralTypes.GET_UF_SUCCESS;
  payload: { data: GenericData[] };
}

export interface GetGeneralFailure {
  type: GeneralTypes.GET_UF_FAILURE;
}

export interface RegisterAddress {
  type: GeneralTypes.REGISTER_ADDRESS_REQUEST;
  payload: { data: Address };
}

export interface RegisterAddressSuccess {
  type: GeneralTypes.REGISTER_ADDRESS_SUCCESS;
  payload: { data: Address };
}

export interface RegisterAddressFailure {
  type: GeneralTypes.REGISTER_ADDRESS_FAILURE;
}

export type GeneralActionTypes =
  | GetGeneral
  | GetGeneralSuccess
  | GetGeneralFailure;

export interface GeneralState {
  loading: boolean;
  uf: GenericData[] | null;
}

export interface Address {
  id?: number;
  cep?: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  complemento: string;
  uf: number;
}
