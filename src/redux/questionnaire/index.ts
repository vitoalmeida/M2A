/* eslint-disable default-param-last */
import { Reducer } from "redux";
import * as Actions from "./actions";
import { QuestionnaireState, QuestionnaireTypes } from "./types";

const INITIAL_STATE: QuestionnaireState = {
  questions: [],
  loading: null,
};

const reducer: Reducer<QuestionnaireState> = (
  state = INITIAL_STATE,
  { type, payload }
) => {
  switch (type) {
    case QuestionnaireTypes.GET_QUESTIONS_REQUEST:
      return { ...state, loading: true };

    case QuestionnaireTypes.GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        questions: payload.data,
      };

    case QuestionnaireTypes.GET_QUESTIONS_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export const QuestionnaireActions = Actions;
export default reducer;
