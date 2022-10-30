import { action } from "typesafe-actions";
import { Filter } from "../../types";
import { Count } from "../companies/types";
import { Diagnostic, DiagnosticsActionTypes, DiagnosticsTypes } from "./types";

export function getDiagnosticsRequest(
  filter: Filter,
  params?: any
): DiagnosticsActionTypes {
  return action(DiagnosticsTypes.GET_DIAGNOSTICS_REQUEST, { filter, params });
}

export function getDiagnosticsSuccess(
  data: Diagnostic[],
  diagnosticCount: Count,
  questionnairesCount: Count
): DiagnosticsActionTypes {
  return action(DiagnosticsTypes.GET_DIAGNOSTICS_SUCCESS, {
    data,
    diagnosticCount,
    questionnairesCount,
  });
}

export function getDiagnosticsFailure(): DiagnosticsActionTypes {
  return action(DiagnosticsTypes.GET_DIAGNOSTICS_FAILURE);
}

export function registerDiagnosticRequest(
  data: Diagnostic
): DiagnosticsActionTypes {
  return action(DiagnosticsTypes.REGISTER_DIAGNOSTIC_REQUEST, {
    data,
  });
}

export function registerDiagnosticSuccess(): DiagnosticsActionTypes {
  return action(DiagnosticsTypes.REGISTER_DIAGNOSTIC_SUCCESS);
}

export function registerDiagnosticFailure(): DiagnosticsActionTypes {
  return action(DiagnosticsTypes.REGISTER_DIAGNOSTIC_FAILURE);
}

export function deleteDiagnosticRequest(
  diagnosticId: number,
  questionnaireId: number
): DiagnosticsActionTypes {
  return action(DiagnosticsTypes.DELETE_DIAGNOSTIC_REQUEST, {
    diagnosticId,
    questionnaireId,
  });
}

export function deleteDiagnosticSuccess(): DiagnosticsActionTypes {
  return action(DiagnosticsTypes.DELETE_DIAGNOSTIC_SUCCESS);
}

export function deleteDiagnosticFailure(): DiagnosticsActionTypes {
  return action(DiagnosticsTypes.DELETE_DIAGNOSTIC_FAILURE);
}
