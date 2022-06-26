import client from "../client";

function getQuestions() {
  return client("pergunta/").get();
}

export default {
  getQuestions,
};
