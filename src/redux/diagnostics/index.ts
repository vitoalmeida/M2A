/* eslint-disable default-param-last */
import { Reducer } from "redux";
import * as Actions from "./actions";
import { DiagnosticsState, DiagnosticsTypes } from "./types";

const INITIAL_STATE: DiagnosticsState = {
  diagnostics: {
    data: null,
    loading: false,
    questionnairesCount: {
      total: null,
      current: null,
    },
    diagnosticsCount: {
      total: null,
      current: null,
    },
  },
  loading: null,
};

const reducer: Reducer<DiagnosticsState> = (
  state = INITIAL_STATE,
  { type, payload }
) => {
  switch (type) {
    case DiagnosticsTypes.GET_DIAGNOSTICS_REQUEST:
      return { ...state, loading: true };

    case DiagnosticsTypes.GET_DIAGNOSTICS_SUCCESS:
      return {
        ...state,
        loading: false,
        diagnostics: {
          data: payload.data,
          questionnairesCount: payload.questionnairesCount,
          diagnosticsCount: payload.diagnosticsCount,
        },
      };

    case DiagnosticsTypes.GET_DIAGNOSTICS_FAILURE:
      return { ...state, loading: false };

    case DiagnosticsTypes.REGISTER_DIAGNOSTIC_REQUEST:
      return { ...state, loading: true };

    case DiagnosticsTypes.REGISTER_DIAGNOSTIC_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case DiagnosticsTypes.REGISTER_DIAGNOSTIC_FAILURE:
      return { ...state, loading: false };

    case DiagnosticsTypes.DELETE_DIAGNOSTIC_REQUEST:
      return { ...state, loading: true };

    case DiagnosticsTypes.DELETE_DIAGNOSTIC_SUCCESS:
      return { ...state, loading: false };

    case DiagnosticsTypes.DELETE_DIAGNOSTIC_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export const DiagnosticsActions = Actions;
export default reducer;
