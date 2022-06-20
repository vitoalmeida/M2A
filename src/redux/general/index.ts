/* eslint-disable default-param-last */
import { Reducer } from "redux";
import * as Actions from "./actions";
import { GeneralState, GeneralTypes } from "./types";

const INITIAL_STATE: GeneralState = {
  loading: false,
  uf: null,
};

const reducer: Reducer<GeneralState> = (
  state = INITIAL_STATE,
  { type, payload }
) => {
  switch (type) {
    case GeneralTypes.GET_UF_REQUEST:
      return { ...state, loading: true };

    case GeneralTypes.GET_UF_SUCCESS:
      return { ...state, loading: false, uf: payload.data };

    case GeneralTypes.GET_UF_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export const GeneralActions = Actions;
export default reducer;
