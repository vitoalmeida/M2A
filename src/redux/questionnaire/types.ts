/* eslint-disable no-shadow */
import { GenericData } from "../../types";

/* eslint-disable no-unused-vars */
export enum QuestionnaireTypes {
  GET_QUESTIONS_REQUEST = "@general/GET_QUESTIONS_REQUEST",
  GET_QUESTIONS_SUCCESS = "@general/GET_QUESTIONS_SUCCESS",
  GET_QUESTIONS_FAILURE = "@general/GET_QUESTIONS_FAILURE",
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

export type QuestionnaireActionTypes =
  | GetQuestions
  | GetQuestionsSuccess
  | GetQuestionsFailure;

export interface QuestionnaireState {
  questions: Question[];
  loading: boolean;
}

export interface Question {
  texto_pergunta: Question[];
  fundamento: number;
  respostas: any[];
}
