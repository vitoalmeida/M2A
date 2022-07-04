/* eslint-disable no-shadow */
import { GenericData } from "../../types";

/* eslint-disable no-unused-vars */
export enum GeneralTypes {
  GET_STATIC_VALUES_REQUEST = "@general/GET_STATIC_VALUES_REQUEST",
  GET_STATIC_VALUES_SUCCESS = "@general/GET_STATIC_VALUES_SUCCESS",
  GET_STATIC_VALUES_FAILURE = "@general/GET_STATIC_VALUES_FAILURE",

  REGISTER_ADDRESS_REQUEST = "@general/REGISTER_ADDRESS_REQUEST",
  REGISTER_ADDRESS_SUCCESS = "@general/REGISTER_ADDRESS_SUCCESS",
  REGISTER_ADDRESS_FAILURE = "@general/REGISTER_ADDRESS_FAILURE",

  SEED_BACKEND = "@general/SEED_BACKEND",
}

export interface GetStaticValuesGeneral {
  type: GeneralTypes.GET_STATIC_VALUES_REQUEST;
}

export interface GetStaticValuesGeneralSuccess {
  type: GeneralTypes.GET_STATIC_VALUES_SUCCESS;
  payload: {
    formatedUf: GenericData[];
    formatedCollections: GenericData[];
    formatedIndustryTypes: GenericData[];
    formatedSectors: GenericData[];
    formatedSegments: GenericData[];
    formatedFundamentals: GenericData[];
  };
}

export interface GetStaticValuesGeneralFailure {
  type: GeneralTypes.GET_STATIC_VALUES_FAILURE;
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

export interface SeedBackend {
  type: GeneralTypes.SEED_BACKEND;
}

export type GeneralActionTypes =
  | SeedBackend
  | RegisterAddress
  | RegisterAddressSuccess
  | RegisterAddressFailure
  | GetStaticValuesGeneral
  | GetStaticValuesGeneralSuccess
  | GetStaticValuesGeneralFailure;

export interface GeneralState {
  loading: boolean;
  uf: GenericData[] | null;
  segments: GenericData[] | null;
  industryTypes: GenericData[] | null;
  collectionValues: GenericData[] | null;
  sectors: GenericData[] | null;
  fundamentals: GenericData[] | null;
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
