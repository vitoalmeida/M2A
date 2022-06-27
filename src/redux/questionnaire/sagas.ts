// eslint-disable-next-line no-unused-vars
import { all, call, put, takeLatest } from "redux-saga/effects";
import { QuestionnaireActions } from ".";
import {
  GetQuestionnairesAnswers,
  QuestionnaireTypes,
  RegisterQuestionnaire,
} from "./types";
import * as api from "../../services/index";
import * as helpers from "../../helpers/index";
import * as selectors from "../selectors";

function* getQuestions() {
  try {
    const { data } = yield call(api.questionnaire.getQuestions);

    yield put(QuestionnaireActions.getQuestionsSuccess(data.results));
  } catch (err) {
    yield put(QuestionnaireActions.getQuestionsFailure());
    console.log(err);
  }
}

function* getQuestionnaires() {
  try {
    const { data } = yield call(api.questionnaire.getQuestionnaires);

    yield put(QuestionnaireActions.getQuestionnairesSuccess(data.results));
  } catch (err) {
    yield put(QuestionnaireActions.getQuestionnairesFailure());
    console.log(err);
  }
}

function* getQuestionnairesAnswers({
  payload: { questionnaireId },
}: GetQuestionnairesAnswers) {
  try {
    const { questions } = yield selectors.getQuestionnaires();

    const { data } = yield call(
      api.questionnaire.getQuestionnairesAnswers,
      questionnaireId
    );

    for (let i = 0; i < data.results.length; i++) {
      questions.forEach((question) => {
        if (question.id === data.results[i].pergunta) {
          data.results[i].pergunta = question.texto_pergunta;
        }
        question.formatadas.forEach((answer) => {
          if (answer.id === data.results[i].resposta) {
            data.results[i].resposta = answer.texto_resposta;
            data.results[i].valor = answer.valor;
          }
        });
      });
    }

    yield put(
      QuestionnaireActions.getQuestionnairesAnswersSuccess(data.results)
    );
  } catch (err) {
    yield put(QuestionnaireActions.getQuestionnairesAnswersFailure());
    console.log(err);
  }
}

function* registerQuestionnaire({
  payload: { time, companyId, data, master },
}: RegisterQuestionnaire) {
  try {
    console.log(time, companyId, data, master);

    let empresa_master;
    let empresa;
    if (master) {
      empresa_master = companyId;
      empresa = 1;
    } else {
      empresa_master = 3;
      empresa = companyId;
    }

    const { data: empresa_questionario } = yield call(
      api.questionnaire.registerQuestionnaire,
      { tempo: time, empresa_master, empresa }
    );

    for (let i = 0; i < data.length; i++) {
      yield call(api.questionnaire.registerQuestionnaireAnswer, {
        ...data[i],
        empresa_questionario: empresa_questionario.id,
      });
    }

    yield put(QuestionnaireActions.registerQuestionnairesSuccess());
  } catch (err) {
    yield put(QuestionnaireActions.registerQuestionnairesFailure());
    console.log(err);
  }
}

function* generalSaga() {
  yield all([
    takeLatest(QuestionnaireTypes.GET_QUESTIONS_REQUEST, getQuestions),
    takeLatest(
      QuestionnaireTypes.GET_QUESTIONNAIRES_ANSWERS_REQUEST,
      getQuestionnairesAnswers
    ),
    takeLatest(
      QuestionnaireTypes.REGISTER_QUESTIONNAIRE_REQUEST,
      registerQuestionnaire
    ),
    takeLatest(
      QuestionnaireTypes.GET_QUESTIONNAIRES_REQUEST,
      getQuestionnaires
    ),
  ]);
}

export default generalSaga;
