// eslint-disable-next-line no-unused-vars
import { all, call, put, takeLatest } from "redux-saga/effects";
import { QuestionnaireActions } from ".";
import { QuestionnaireTypes } from "./types";
import * as api from "../../services/index";
import * as helpers from "../../helpers/index";

function* getQuestions() {
  try {
    const { data } = yield call(api.questionnaire.getQuestions);

    yield put(QuestionnaireActions.getQuestionsSuccess(data.results));
  } catch (err) {
    yield put(QuestionnaireActions.getQuestionsFailure());
    console.log(err);
  }
}

function* generalSaga() {
  yield all([
    takeLatest(QuestionnaireTypes.GET_QUESTIONS_REQUEST, getQuestions),
  ]);
}

export default generalSaga;
