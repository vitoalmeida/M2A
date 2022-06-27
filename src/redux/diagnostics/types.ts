/* eslint-disable no-shadow */
import { GenericData } from "../../types";
import { Profile } from "../account/types";
import { Company } from "../companies/types";
import { Questionnaire } from "../questionnaire/types";

/* eslint-disable no-unused-vars */
export enum DiagnosticsTypes {
  GET_DIAGNOSTICS_REQUEST = "@general/GET_DIAGNOSTICS_REQUEST",
  GET_DIAGNOSTICS_SUCCESS = "@general/GET_DIAGNOSTICS_SUCCESS",
  GET_DIAGNOSTICS_FAILURE = "@general/GET_DIAGNOSTICS_FAILURE",
}

export interface GetDiagnostics {
  type: DiagnosticsTypes.GET_DIAGNOSTICS_REQUEST;
}

export interface GetDiagnosticsSuccess {
  type: DiagnosticsTypes.GET_DIAGNOSTICS_SUCCESS;
  payload: {
    data: Diagnostic[];
  };
}

export interface GetDiagnosticsFailure {
  type: DiagnosticsTypes.GET_DIAGNOSTICS_FAILURE;
}

export type DiagnosticsActionTypes =
  | GetDiagnostics
  | GetDiagnosticsSuccess
  | GetDiagnosticsFailure;

export interface DiagnosticsState {
  diagnostics: Diagnostic[];
  loading: boolean;
}

export interface Diagnostic {
  id?: number;
  data?: string;
  empresa_questionario?: number | Questionnaire;
  consultor?: number | Profile;
  tipo_diagnostico?: number | string;
}
