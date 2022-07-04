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
  return client(`empresa_questionario/${questionnaireId}`).delete();
}


export default {
  deleteQuestionnaire,
  getQuestionnaires,
  getQuestionnairesAnswers,
  registerQuestionnaireAnswer,
  registerQuestionnaire,
  getQuestions,
  registerQuestion,
};
