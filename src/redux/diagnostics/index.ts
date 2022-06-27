/* eslint-disable default-param-last */
import { Reducer } from "redux";
import * as Actions from "./actions";
import { DiagnosticsState, DiagnosticsTypes } from "./types";

const INITIAL_STATE: DiagnosticsState = {
  diagnostics: [],
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
        diagnostics: payload.data,
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

    default:
      return state;
  }
};

export const DiagnosticsActions = Actions;
export default reducer;
