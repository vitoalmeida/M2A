/* eslint-disable no-shadow */
import { GenericData } from "../../types";
import { Company } from "../companies/types";

/* eslint-disable no-unused-vars */
export enum QuestionnaireTypes {
  GET_QUESTIONS_REQUEST = "@general/GET_QUESTIONS_REQUEST",
  GET_QUESTIONS_SUCCESS = "@general/GET_QUESTIONS_SUCCESS",
  GET_QUESTIONS_FAILURE = "@general/GET_QUESTIONS_FAILURE",

  GET_QUESTIONNAIRES_REQUEST = "@general/GET_QUESTIONNAIRES_REQUEST",
  GET_QUESTIONNAIRES_SUCCESS = "@general/GET_QUESTIONNAIRES_SUCCESS",
  GET_QUESTIONNAIRES_FAILURE = "@general/GET_QUESTIONNAIRES_FAILURE",

  GET_QUESTIONNAIRES_ANSWERS_REQUEST = "@general/GET_QUESTIONNAIRES_ANSWERS_REQUEST",
  GET_QUESTIONNAIRES_ANSWERS_SUCCESS = "@general/GET_QUESTIONNAIRES_ANSWERS_SUCCESS",
  GET_QUESTIONNAIRES_ANSWERS_FAILURE = "@general/GET_QUESTIONNAIRES_ANSWERS_FAILURE",

  REGISTER_QUESTIONNAIRE_REQUEST = "@general/REGISTER_QUESTIONNAIRE_REQUEST",
  REGISTER_QUESTIONNAIRE_SUCCESS = "@general/REGISTER_QUESTIONNAIRE_SUCCESS",
  REGISTER_QUESTIONNAIRE_FAILURE = "@general/REGISTER_QUESTIONNAIRE_FAILURE",

  REGISTER_QUESTION_REQUEST = "@general/REGISTER_QUESTION_REQUEST",
  REGISTER_QUESTION_SUCCESS = "@general/REGISTER_QUESTION_SUCCESS",
  REGISTER_QUESTION_FAILURE = "@general/REGISTER_QUESTION_FAILURE",

  DELETE_QUESTION_REQUEST = "@general/DELETE_QUESTION_REQUEST",
  DELETE_QUESTION_SUCCESS = "@general/DELETE_QUESTION_SUCCESS",
  DELETE_QUESTION_FAILURE = "@general/DELETE_QUESTION_FAILURE",

  SET_EDIT_QUESTION_REQUEST = "@companies/SET_EDIT_QUESTION_REQUEST",
  SET_EDIT_QUESTION_SUCCESS = "@companies/SET_EDIT_QUESTION_SUCCESS",
  SET_EDIT_QUESTION_FAILURE = "@companies/SET_EDIT_QUESTION_FAILURE",

  EDIT_QUESTION_REQUEST = "@companies/EDIT_QUESTION_REQUEST",
  EDIT_QUESTION_SUCCESS = "@companies/EDIT_QUESTION_SUCCESS",
  EDIT_QUESTION_FAILURE = "@companies/EDIT_QUESTION_FAILURE",

  REMOVE_EDIT_QUESTION = "@general/REMOVE_EDIT_QUESTION",

  CLEAR_DATA = "@general/CLEAR_DATA",
}

export interface GetQuestions {
  type: QuestionnaireTypes.GET_QUESTIONS_REQUEST;
}

export interface GetQuestionsSuccess {
  type: QuestionnaireTypes.GET_QUESTIONS_SUCCESS;
  payload: {
    data: Question[];
  };
}

export interface GetQuestionsFailure {
  type: QuestionnaireTypes.GET_QUESTIONS_FAILURE;
}

export interface GetQuestionnaires {
  type: QuestionnaireTypes.GET_QUESTIONNAIRES_REQUEST;
}

export interface GetQuestionnairesSuccess {
  type: QuestionnaireTypes.GET_QUESTIONNAIRES_SUCCESS;
  payload: {
    data: Questionnaire[];
  };
}

export interface GetQuestionnairesFailure {
  type: QuestionnaireTypes.GET_QUESTIONNAIRES_FAILURE;
}

export interface GetQuestionnairesAnswers {
  type: QuestionnaireTypes.GET_QUESTIONNAIRES_ANSWERS_REQUEST;
  payload: { questionnaireId: number };
}

export interface GetQuestionnairesAnswersSuccess {
  type: QuestionnaireTypes.GET_QUESTIONNAIRES_ANSWERS_SUCCESS;
  payload: {
    data: Questionnaire[];
  };
}

export interface GetQuestionnairesAnswersFailure {
  type: QuestionnaireTypes.GET_QUESTIONNAIRES_ANSWERS_FAILURE;
}

export interface RegisterQuestionnaire {
  type: QuestionnaireTypes.REGISTER_QUESTIONNAIRE_REQUEST;
  payload: {
    data: Question[];
    time: number;
    companyId: number;
    master: boolean;
  };
}

export interface RegisterQuestionnaireSuccess {
  type: QuestionnaireTypes.REGISTER_QUESTIONNAIRE_SUCCESS;
}

export interface RegisterQuestionnaireFailure {
  type: QuestionnaireTypes.REGISTER_QUESTIONNAIRE_FAILURE;
}

export interface RegisterQuestion {
  type: QuestionnaireTypes.REGISTER_QUESTION_REQUEST;
  payload: { data: Question };
}

export interface RegisterQuestionSuccess {
  type: QuestionnaireTypes.REGISTER_QUESTION_SUCCESS;
  payload: { data: Question };
}

export interface RegisterQuestionFailure {
  type: QuestionnaireTypes.REGISTER_QUESTION_FAILURE;
}

export interface DeleteQuestionRequest {
  type: QuestionnaireTypes.DELETE_QUESTION_REQUEST;
  payload: { questionId: number; };

}

export interface DeleteQuestionSuccess {
  type: QuestionnaireTypes.DELETE_QUESTION_SUCCESS;
}

export interface DeleteQuestionFailure {
  type: QuestionnaireTypes.DELETE_QUESTION_FAILURE;
}

export interface SetEditQuestion {
  type: QuestionnaireTypes.SET_EDIT_QUESTION_REQUEST;
  payload: { data: Question };
}

export interface SetEditQuestionSuccess {
  type: QuestionnaireTypes.SET_EDIT_QUESTION_SUCCESS;
  payload: { data: Question };
}

export interface SetEditQuestionFailure {
  type: QuestionnaireTypes.SET_EDIT_QUESTION_FAILURE;
}

export interface EditQuestion {
  type: QuestionnaireTypes.EDIT_QUESTION_REQUEST;
  payload: { data: Question };
}

export interface EditQuestionSuccess {
  type: QuestionnaireTypes.EDIT_QUESTION_SUCCESS;
}

export interface EditQuestionFailure {
  type: QuestionnaireTypes.EDIT_QUESTION_FAILURE;
}

export interface RemoveEditQuestion {
  type: QuestionnaireTypes.REMOVE_EDIT_QUESTION;
}

export interface ClearData {
  type: QuestionnaireTypes.CLEAR_DATA;
}

export type QuestionnaireActionTypes =
  | GetQuestions
  | GetQuestionsSuccess
  | GetQuestionsFailure
  | GetQuestionnaires
  | GetQuestionnairesSuccess
  | GetQuestionnairesFailure
  | GetQuestionnairesAnswers
  | GetQuestionnairesAnswersSuccess
  | GetQuestionnairesAnswersFailure
  | RegisterQuestionnaire
  | RegisterQuestionnaireSuccess
  | RegisterQuestionnaireFailure
  | RegisterQuestion
  | RegisterQuestionSuccess
  | RegisterQuestionFailure
  | DeleteQuestionRequest
  | DeleteQuestionSuccess
  | DeleteQuestionFailure
  | SetEditQuestion
  | SetEditQuestionSuccess
  | SetEditQuestionFailure
  | EditQuestion
  | EditQuestionSuccess
  | EditQuestionFailure
  | RemoveEditQuestion
  | ClearData;

export interface QuestionnaireState {
  questions: Question[];
  questionnaireAnswers: QuestionnaireAnswer[];
  loading: boolean;
  editQuestion: Question;
}

export interface Question {
  id?: number;
  texto_pergunta: string;
  fundamento: number;
  objetivo: string;
  conceito: string;
  formatadas: Answer[];
  respostas: number[];
}

export interface Answer {
  id?: number;
  texto_resposta?: string;
  valor?: number;
}

export interface Questionnaire {
  id?: number;
  empresa_master?: string | Company;
  empresa?: number | Company;
  tempo?: number;
}

export interface QuestionnaireAnswer extends Questionnaire {
  id?: number;
  questionario?: string;
  pergunta?: number;
  resposta?: number;
  valor?: number;
}
