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
  | RegisterQuestionnaireFailure;

export interface QuestionnaireState {
  questions: Question[];
  questionnaireAnswers: QuestionnaireAnswer[];
  loading: boolean;
}

export interface Question {
  id?: number;
  texto_pergunta: string;
  fundamento: number;
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
