/* eslint-disable import/no-anonymous-default-export */
// eslint-disable-next-line no-unused-vars
import { all, call, put, takeLatest } from "redux-saga/effects";
import { DiagnosticsActions } from ".";
import { DeleteDiagnostic, DiagnosticsTypes, RegisterDiagnostic } from "./types";
import * as api from "../../services/index";
import * as helpers from "../../helpers/index";
import showToast from "../../helpers/showToast";
import { customHistory } from "../../routes/CustomBrowserRouter";

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

    yield put(DiagnosticsActions.getDiagnosticsSuccess(formatedDiagnostics));
  } catch (err) {
    yield put(DiagnosticsActions.getDiagnosticsFailure());
    console.log(err);
  }
}

function* registerDiagnostic({ payload: { data } }: RegisterDiagnostic) {
  try {
    console.log(data);
    const { data: diagnostic } = yield call(
      api.diagnostics.registerDiagnostic,
      data
    );
    console.log(diagnostic);

    showToast("Diagnóstico salvo com sucesso!", "success");
    yield put(DiagnosticsActions.registerDiagnosticSuccess());
    yield put(DiagnosticsActions.getDiagnosticsRequest());
  } catch (err) {
    console.log(err);
    showToast(helpers.formErrors.formatError(err), "error");
    yield put(DiagnosticsActions.registerDiagnosticFailure());
  }
}

function* deleteDiagnostic({ payload: { diagnosticId, questionnaireId } }: DeleteDiagnostic) {
  try {
    console.log(diagnosticId, questionnaireId)

    if (diagnosticId) yield call(api.diagnostics.deleteDiagnostic, String(diagnosticId))

    yield call(api.questionnaire.deleteQuestionnaire, String(questionnaireId))

    yield deleteDiagnosticSuccess()
  } catch (err) {
    yield deleteDiagnosticFailure(err)
  }
}

function* deleteDiagnosticSuccess() {
  yield put(DiagnosticsActions.deleteDiagnosticSuccess())
  yield put(DiagnosticsActions.getDiagnosticsRequest())
  showToast("Diagnóstico deletado com sucesso!", "success");

}

function* deleteDiagnosticFailure(err: any) {
  console.log(err)
  showToast(helpers.formErrors.formatError(err), "error");
  yield put(DiagnosticsActions.deleteDiagnosticSuccess())
}


export default [
  takeLatest(DiagnosticsTypes.GET_DIAGNOSTICS_REQUEST, getDiagnostics),
  takeLatest(DiagnosticsTypes.DELETE_DIAGNOSTIC_REQUEST, deleteDiagnostic),
  takeLatest(
    DiagnosticsTypes.REGISTER_DIAGNOSTIC_REQUEST,
    registerDiagnostic
  ),
]
