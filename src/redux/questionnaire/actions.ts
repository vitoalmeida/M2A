import { action } from "typesafe-actions";
import {
  QuestionnaireActionTypes,
  QuestionnaireTypes,
  Question,
  Questionnaire,
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

export function getQuestionnairesRequest(): QuestionnaireActionTypes {
  return action(QuestionnaireTypes.GET_QUESTIONNAIRES_REQUEST);
}

export function getQuestionnairesSuccess(
  data: Questionnaire[]
): QuestionnaireActionTypes {
  return action(QuestionnaireTypes.GET_QUESTIONNAIRES_SUCCESS, {
    data,
  });
}

export function getQuestionnairesFailure(): QuestionnaireActionTypes {
  return action(QuestionnaireTypes.GET_QUESTIONNAIRES_ANSWERS_FAILURE);
}

export function getQuestionnairesAnswersRequest(
  questionnaireId: number
): QuestionnaireActionTypes {
  return action(QuestionnaireTypes.GET_QUESTIONNAIRES_ANSWERS_REQUEST, {
    questionnaireId,
  });
}

export function getQuestionnairesAnswersSuccess(
  data: Questionnaire[]
): QuestionnaireActionTypes {
  return action(QuestionnaireTypes.GET_QUESTIONNAIRES_ANSWERS_SUCCESS, {
    data,
  });
}

export function getQuestionnairesAnswersFailure(): QuestionnaireActionTypes {
  return action(QuestionnaireTypes.GET_QUESTIONNAIRES_FAILURE);
}

export function registerQuestionnairesRequest(
  data: Question[],
  time: number,
  companyId: number,
  master: boolean
): QuestionnaireActionTypes {
  return action(QuestionnaireTypes.REGISTER_QUESTIONNAIRE_REQUEST, {
    data,
    time,
    companyId,
    master,
  });
}

export function registerQuestionnairesSuccess(): QuestionnaireActionTypes {
  return action(QuestionnaireTypes.REGISTER_QUESTIONNAIRE_SUCCESS);
}

export function registerQuestionnairesFailure(): QuestionnaireActionTypes {
  return action(QuestionnaireTypes.REGISTER_QUESTIONNAIRE_FAILURE);
}
