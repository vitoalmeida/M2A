import client from "../client";

function getQuestions() {
  return client("pergunta/").get();
}

function getQuestionnaires() {
  return client("empresa_questionario/").get();
}

function getQuestionnairesAnswers(questionnaireId: number) {
  return client(
    `questionario/?pergunta=&resposta=&empresa_questionario=${questionnaireId}`
  ).get();
}

function registerQuestion(data: any) {
  return client("pergunta/").data(data).post();
}

function registerQuestionnaire(data: any) {
  return client("empresa_questionario/").data(data).post();
}

function registerQuestionnaireAnswer(data: any) {
  return client("questionario/").data(data).post();
}

function deleteQuestionnaire(questionnaireId: string) {
  return client(`empresa_questionario/${questionnaireId}/`).delete();
}

function deleteQuestion(questionId: string) {
  return client(`pergunta/${questionId}/`).delete();
}

function editQuestion(questionId: string, data: any) {
  return client(`pergunta/${questionId}/`).data(data).put();
}

function editAnswer(answerId: string, data: any) {
  return client(`resposta/${answerId}/`).data(data).put();
}

export default {
  editQuestion,
  editAnswer,
  deleteQuestion,
  deleteQuestionnaire,
  getQuestionnaires,
  getQuestionnairesAnswers,
  registerQuestionnaireAnswer,
  registerQuestionnaire,
  getQuestions,
  registerQuestion,
};
