/* eslint-disable import/no-anonymous-default-export */
// eslint-disable-next-line no-unused-vars
import { all, call, put, takeLatest } from "redux-saga/effects";
import { QuestionnaireActions } from ".";
import {
  DeleteQuestionRequest,
  EditQuestion,
  GetQuestionnairesAnswers,
  Question,
  QuestionnaireTypes,
  RegisterQuestion,
  RegisterQuestionnaire,
  SetEditQuestion,
} from "./types";
import * as api from "../../services/index";
import * as helpers from "../../helpers/index";
import * as selectors from "../selectors";
import showToast from "../../helpers/showToast";

function* getQuestions() {
  try {
    const { data } = yield call(api.questionnaire.getQuestions);

    yield put(QuestionnaireActions.getQuestionsSuccess(data.results));
  } catch (err) {
    yield put(QuestionnaireActions.getQuestionsFailure());
    console.error(err);
  }
}

function* getQuestionnaires() {
  try {
    const { data } = yield call(api.questionnaire.getQuestionnaires);

    yield put(QuestionnaireActions.getQuestionnairesSuccess(data.results));
  } catch (err) {
    yield put(QuestionnaireActions.getQuestionnairesFailure());
    console.error(err);
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
    console.error(err);
  }
}

function* registerQuestionnaire({
  payload: { time, companyId, data, master },
}: RegisterQuestionnaire) {
  try {
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
    console.error(err);
  }
}

function* registerQuestion({ payload: { data } }: RegisterQuestion) {
  try {
    yield registerQuestionSuccess();
  } catch (err) {
    yield put(QuestionnaireActions.registerQuestionFailure());

    console.error(err);
    showToast(helpers.formErrors.formatError(err), "error");
  }
}

function* registerQuestionSuccess() {
  showToast("Pergunta registrada com sucesso!", "success");

  yield put(QuestionnaireActions.getQuestionsRequest());
}

function* setEditQuestion({ payload: { data } }: SetEditQuestion) {
  try {
    yield setEditQuestionSuccess(data);
  } catch (err) {
    yield setEditQuestionFailure(err);
  }
}

function* setEditQuestionSuccess(data: Question) {
  yield put(QuestionnaireActions.setEditQuestionSuccess(data));
}

function* setEditQuestionFailure(err: any) {
  yield put(QuestionnaireActions.setEditQuestionFailure());
  console.error(err);
}

function* deleteQuestion({ payload: { questionId } }: DeleteQuestionRequest) {
  try {
    yield call(api.questionnaire.deleteQuestion, String(questionId));

    yield deleteQuestionSuccess();
  } catch (err) {
    yield deleteQuestionFailure(err);
  }
}

function* deleteQuestionSuccess() {
  yield put(QuestionnaireActions.deleteQuestionSuccess());
  yield put(QuestionnaireActions.getQuestionsRequest());
  showToast("Pergunta deletada com sucesso!", "success");
}

function* deleteQuestionFailure(err: any) {
  yield put(QuestionnaireActions.deleteQuestionFailure());
  showToast(helpers.formErrors.formatError(err), "error");
  console.error(err);
}

function* editQuestion({ payload: { data } }: EditQuestion) {
  try {
    for (let i = 0; i < data.formatadas.length; i++) {
      yield call(
        api.questionnaire.editAnswer,
        String(data.formatadas[i].id),
        data.formatadas[i]
      );
    }

    delete data.formatadas;

    yield call(api.questionnaire.editQuestion, String(data.id), data);

    yield editQuestionSuccess();
  } catch (err) {
    yield editQuestionFailure(err);
  }
}

function* editQuestionSuccess() {
  yield put(QuestionnaireActions.editQuestionSuccess());
  yield put(QuestionnaireActions.getQuestionsRequest());
  showToast("Pergunta editada com sucesso!", "success");
}

function* editQuestionFailure(err: any) {
  yield put(QuestionnaireActions.editQuestionFailure());
  showToast(helpers.formErrors.formatError(err), "error");
  console.error(err);
}

export default [
  takeLatest(QuestionnaireTypes.GET_QUESTIONS_REQUEST, getQuestions),
  takeLatest(
    QuestionnaireTypes.GET_QUESTIONNAIRES_ANSWERS_REQUEST,
    getQuestionnairesAnswers
  ),
  takeLatest(
    QuestionnaireTypes.REGISTER_QUESTIONNAIRE_REQUEST,
    registerQuestionnaire
  ),
  takeLatest(QuestionnaireTypes.GET_QUESTIONNAIRES_REQUEST, getQuestionnaires),
  takeLatest(QuestionnaireTypes.REGISTER_QUESTION_REQUEST, registerQuestion),
  takeLatest(QuestionnaireTypes.SET_EDIT_QUESTION_REQUEST, setEditQuestion),
  takeLatest(QuestionnaireTypes.EDIT_QUESTION_REQUEST, editQuestion),
  takeLatest(QuestionnaireTypes.DELETE_QUESTION_REQUEST, deleteQuestion),
];
