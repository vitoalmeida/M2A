// eslint-disable-next-line no-unused-vars
import { all, call, put, takeLatest } from "redux-saga/effects";
import { DiagnosticsActions } from ".";
import { DiagnosticsTypes } from "./types";
import * as api from "../../services/index";
import * as helpers from "../../helpers/index";

function* getDiagnostics() {
  try {
    const { data: questionnaires } = yield call(
      api.questionnaire.getQuestionnaires
    );

    const { data: diagnostics } = yield call(api.diagnostics.getDiagnostics);

    let diagnosedQuestionnairesIds = [];

    diagnostics.results.forEach((diagnostic) => {
      diagnosedQuestionnairesIds.push(diagnostic.empresa_questionario);
    });
    let formatedQuestionnaires = [];

    questionnaires.results.forEach((questionnaire) => {
      if (!diagnosedQuestionnairesIds.includes(questionnaire.id)) {
        formatedQuestionnaires.push({ empresa_questionario: questionnaire });
      } else {
        diagnostics.results.find(
          (diagnostic) => diagnostic.empresa_questionario === questionnaire.id
        ).empresa_questionario = questionnaire;
      }
    });

    let formatedDiagnostics = [
      ...diagnostics.results,
      ...formatedQuestionnaires,
    ];

    for (let i = 0; i < formatedDiagnostics.length; i++) {
      if (formatedDiagnostics[i].consultor) {
        const { data: consultant } = yield call(
          api.account.getConsultant,
          String(formatedDiagnostics[i].consultor)
        );
        formatedDiagnostics[i].consultor = consultant;
      }

      if (formatedDiagnostics[i].empresa_questionario.empresa_master === 3) {
        const { data: company } = yield call(
          api.companies.getCompany,
          formatedDiagnostics[i].empresa_questionario.empresa
        );
        formatedDiagnostics[i].empresa_questionario.empresa = company;
      } else {
        const { data: masterCompany } = yield call(
          api.companies.getMasterCompany,
          formatedDiagnostics[i].empresa_questionario.empresa_master
        );
        formatedDiagnostics[i].empresa_questionario.empresa_master =
          masterCompany;
      }
    }

    console.log("chegou aquiu");
    yield put(DiagnosticsActions.getDiagnosticsSuccess(formatedDiagnostics));
  } catch (err) {
    yield put(DiagnosticsActions.getDiagnosticsFailure());
    console.log(err);
  }
}

function* generalSaga() {
  yield all([
    takeLatest(DiagnosticsTypes.GET_DIAGNOSTICS_REQUEST, getDiagnostics),
  ]);
}

export default generalSaga;
