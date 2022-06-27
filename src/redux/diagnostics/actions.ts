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
