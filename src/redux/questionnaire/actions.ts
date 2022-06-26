import { action } from "typesafe-actions";
import {
  QuestionnaireActionTypes,
  QuestionnaireTypes,
  Question,
} from "./types";

export function getQuestionsRequest(): QuestionnaireActionTypes {
  return action(QuestionnaireTypes.GET_QUESTIONS_REQUEST);
}

export function getQuestionsSuccess(
  data: Question[]
): QuestionnaireActionTypes {
  return action(QuestionnaireTypes.GET_QUESTIONS_SUCCESS, {
    data,
  });
}

export function getQuestionsFailure(): QuestionnaireActionTypes {
  return action(QuestionnaireTypes.GET_QUESTIONS_FAILURE);
}
