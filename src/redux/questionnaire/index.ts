/* eslint-disable default-param-last */
import { Reducer } from "redux";
import * as Actions from "./actions";
import { QuestionnaireState, QuestionnaireTypes } from "./types";

const INITIAL_STATE: QuestionnaireState = {
  questions: [],
  questionnaireAnswers: [],
  loading: null,
  editQuestion: null,
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

    case QuestionnaireTypes.REGISTER_QUESTIONNAIRE_REQUEST:
      return { ...state, loading: true };

    case QuestionnaireTypes.REGISTER_QUESTIONNAIRE_SUCCESS:
      return { ...state, loading: false };

    case QuestionnaireTypes.REGISTER_QUESTIONNAIRE_FAILURE:
      return { ...state, loading: false };

    case QuestionnaireTypes.GET_QUESTIONNAIRES_ANSWERS_REQUEST:
      return { ...state, loading: true };

    case QuestionnaireTypes.GET_QUESTIONNAIRES_ANSWERS_SUCCESS:
      return { ...state, loading: false, questionnaireAnswers: payload.data };

    case QuestionnaireTypes.GET_QUESTIONNAIRES_ANSWERS_FAILURE:
      return { ...state, loading: false };

    case QuestionnaireTypes.SET_EDIT_QUESTION_REQUEST:
      return { ...state, loading: true };

    case QuestionnaireTypes.SET_EDIT_QUESTION_SUCCESS:
      return { ...state, loading: false, editQuestion: payload.data };

    case QuestionnaireTypes.SET_EDIT_QUESTION_FAILURE:
      return { ...state, loading: false };

    case QuestionnaireTypes.EDIT_QUESTION_REQUEST:
      return { ...state, loading: true };

    case QuestionnaireTypes.EDIT_QUESTION_SUCCESS:
      return { ...state, loading: false };

    case QuestionnaireTypes.EDIT_QUESTION_FAILURE:
      return { ...state, loading: false };

    case QuestionnaireTypes.REMOVE_EDIT_QUESTION:
      return { ...state, editQuestion: null };

    case QuestionnaireTypes.CLEAR_DATA:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export const QuestionnaireActions = Actions;
export default reducer;
