/* eslint-disable import/no-anonymous-default-export */
// eslint-disable-next-line no-unused-vars
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { DiagnosticsActions } from ".";
import {
  DeleteDiagnostic,
  DiagnosticsTypes,
  GetDiagnostics,
  RegisterDiagnostic,
} from "./types";
import * as api from "../../services/index";
import * as helpers from "../../helpers/index";
import showToast from "../../helpers/showToast";
import { customHistory } from "../../routes/CustomBrowserRouter";
import { formatFilter } from "../../helpers/formatData";

function* getDiagnostics({ payload: { filter } }: GetDiagnostics) {
  try {
    const { diagnostics: diagnosticsState } = yield select();
    filter = formatFilter(filter);

    const { data: questionnaires } = yield call(
      api.questionnaire.getQuestionnaires
    );

    const { data: diagnostics } = yield call(
      api.diagnostics.getDiagnostics,
      filter
    );

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

    yield put(
      DiagnosticsActions.getDiagnosticsSuccess(formatedDiagnostics, {
        total: diagnostics.count,
        current: diagnosticsState.count.current + diagnostics.results.length,
      })
    );
  } catch (err) {
    yield put(DiagnosticsActions.getDiagnosticsFailure());
    console.error(err);
  }
}

function* registerDiagnostic({ payload: { data } }: RegisterDiagnostic) {
  try {
    const { data: diagnostic } = yield call(
      api.diagnostics.registerDiagnostic,
      data
    );

    showToast("Diagnóstico salvo com sucesso!", "success");
    yield put(DiagnosticsActions.registerDiagnosticSuccess());
    yield put(
      DiagnosticsActions.getDiagnosticsRequest({
        limit: 10,
        page: 0,
      })
    );
  } catch (err) {
    console.error(err);
    showToast(helpers.formErrors.formatError(err), "error");
    yield put(DiagnosticsActions.registerDiagnosticFailure());
  }
}

function* deleteDiagnostic({
  payload: { diagnosticId, questionnaireId },
}: DeleteDiagnostic) {
  try {
    if (diagnosticId)
      yield call(api.diagnostics.deleteDiagnostic, String(diagnosticId));

    yield call(api.questionnaire.deleteQuestionnaire, String(questionnaireId));

    yield deleteDiagnosticSuccess();
  } catch (err) {
    yield deleteDiagnosticFailure(err);
  }
}

function* deleteDiagnosticSuccess() {
  yield put(DiagnosticsActions.deleteDiagnosticSuccess());
  yield put(
    DiagnosticsActions.getDiagnosticsRequest({
      limit: 10,
      page: 0,
    })
  );
  showToast("Diagnóstico deletado com sucesso!", "success");
}

function* deleteDiagnosticFailure(err: any) {
  console.error(err);
  showToast(helpers.formErrors.formatError(err), "error");
  yield put(DiagnosticsActions.deleteDiagnosticSuccess());
}

export default [
  takeLatest(DiagnosticsTypes.GET_DIAGNOSTICS_REQUEST, getDiagnostics),
  takeLatest(DiagnosticsTypes.DELETE_DIAGNOSTIC_REQUEST, deleteDiagnostic),
  takeLatest(DiagnosticsTypes.REGISTER_DIAGNOSTIC_REQUEST, registerDiagnostic),
];
