/* eslint-disable default-param-last */
import { Reducer } from "redux";
import * as Actions from "./actions";
import { GeneralState, GeneralTypes } from "./types";

const INITIAL_STATE: GeneralState = {
  loading: false,
  uf: null,
  segments: null,
  industryTypes: null,
  collectionValues: null,
  sectors: null,
};

const reducer: Reducer<GeneralState> = (
  state = INITIAL_STATE,
  { type, payload }
) => {
  switch (type) {
    case GeneralTypes.GET_STATIC_VALUES_REQUEST:
      return { ...state, loading: true };

    case GeneralTypes.GET_STATIC_VALUES_SUCCESS:
      return {
        ...state,
        loading: false,
        uf: payload.formatedUf,
        segments: payload.formatedSegments,
        industryTypes: payload.formatedIndustryTypes,
        collectionValues: payload.formatedCollections,
        sectors: payload.formatedSectors,
      };

    case GeneralTypes.GET_STATIC_VALUES_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export const GeneralActions = Actions;
export default reducer;
