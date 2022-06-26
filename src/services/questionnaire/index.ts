import client from "../client";

function getQuestions() {
  return client("pergunta/").get();
}

function registerQuestion(question: any) {
  return client("pergunta/").data(question).post();
}

export default {
  getQuestions,
  registerQuestion,
};
