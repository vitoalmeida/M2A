/* eslint-disable no-shadow */
import { Filter, GenericData } from "../../types";
import { Profile } from "../account/types";
import { Company, Count } from "../companies/types";
import { Questionnaire } from "../questionnaire/types";

/* eslint-disable no-unused-vars */
export enum DiagnosticsTypes {
  GET_DIAGNOSTICS_REQUEST = "@general/GET_DIAGNOSTICS_REQUEST",
  GET_DIAGNOSTICS_SUCCESS = "@general/GET_DIAGNOSTICS_SUCCESS",
  GET_DIAGNOSTICS_FAILURE = "@general/GET_DIAGNOSTICS_FAILURE",

  REGISTER_DIAGNOSTIC_REQUEST = "@general/REGISTER_DIAGNOSTIC_REQUEST",
  REGISTER_DIAGNOSTIC_SUCCESS = "@general/REGISTER_DIAGNOSTIC_SUCCESS",
  REGISTER_DIAGNOSTIC_FAILURE = "@general/REGISTER_DIAGNOSTIC_FAILURE",

  DELETE_DIAGNOSTIC_REQUEST = "@general/DELETE_DIAGNOSTIC_REQUEST",
  DELETE_DIAGNOSTIC_SUCCESS = "@general/DELETE_DIAGNOSTIC_SUCCESS",
  DELETE_DIAGNOSTIC_FAILURE = "@general/DELETE_DIAGNOSTIC_FAILURE",
}

export interface GetDiagnostics {
  type: DiagnosticsTypes.GET_DIAGNOSTICS_REQUEST;
  payload: {
    filter: Filter;
    params?: any;
  };
}

export interface GetDiagnosticsSuccess {
  type: DiagnosticsTypes.GET_DIAGNOSTICS_SUCCESS;
  payload: {
    data: Diagnostic[];
    diagnosticCount: Count;
    questionnairesCount: Count;
  };
}

export interface GetDiagnosticsFailure {
  type: DiagnosticsTypes.GET_DIAGNOSTICS_FAILURE;
}

export interface RegisterDiagnostic {
  type: DiagnosticsTypes.REGISTER_DIAGNOSTIC_REQUEST;
  payload: {
    data: Diagnostic;
  };
}

export interface RegisterDiagnosticSuccess {
  type: DiagnosticsTypes.REGISTER_DIAGNOSTIC_SUCCESS;
}

export interface RegisterDiagnosticFailure {
  type: DiagnosticsTypes.REGISTER_DIAGNOSTIC_FAILURE;
}

export interface DeleteDiagnostic {
  type: DiagnosticsTypes.DELETE_DIAGNOSTIC_REQUEST;
  payload: {
    diagnosticId: number;
    questionnaireId: number;
  };
}

export interface DeleteDiagnosticSuccess {
  type: DiagnosticsTypes.DELETE_DIAGNOSTIC_SUCCESS;
}

export interface DeleteDiagnosticFailure {
  type: DiagnosticsTypes.DELETE_DIAGNOSTIC_FAILURE;
}

export type DiagnosticsActionTypes =
  | RegisterDiagnostic
  | RegisterDiagnosticSuccess
  | RegisterDiagnosticFailure
  | DeleteDiagnostic
  | DeleteDiagnosticSuccess
  | DeleteDiagnosticFailure
  | GetDiagnostics
  | GetDiagnosticsSuccess
  | GetDiagnosticsFailure;

export interface DiagnosticsState {
  diagnostics: {
    loading?: boolean;
    data?: Diagnostic[] | null;
    questionnairesCount?: Count;
    diagnosticsCount?: Count;
  };
  loading: boolean;
}

export interface Diagnostic {
  id?: number;
  data?: string;
  empresa_questionario?: number | Questionnaire;
  consultor?: string | number | Profile;
  tipo_diagnostico?: number | string;
}
