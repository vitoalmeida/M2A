import { action } from "typesafe-actions";
import { Diagnostic, DiagnosticsActionTypes, DiagnosticsTypes } from "./types";

export function getDiagnosticsRequest(): DiagnosticsActionTypes {
  return action(DiagnosticsTypes.GET_DIAGNOSTICS_REQUEST);
}

export function getDiagnosticsSuccess(
  data: Diagnostic[]
): DiagnosticsActionTypes {
  return action(DiagnosticsTypes.GET_DIAGNOSTICS_SUCCESS, {
    data,
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
