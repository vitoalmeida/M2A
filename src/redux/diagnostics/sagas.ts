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
import {
  filterDiagnostics,
  formatFilter,
  getRemainingCount,
} from "../../helpers/formatData";

function* getDiagnostics({ payload: { filter, params } }: GetDiagnostics) {
  try {
    const { diagnostics: diagnosticsState } = yield select();
    console.log(diagnosticsState);

    let questionnairesCountTotal =
      diagnosticsState.diagnostics.questionnairesCount?.total;
    let diagnosticsCountTotal =
      diagnosticsState.diagnostics.diagnosticsCount?.total;

    if (!questionnairesCountTotal) {
      const { data: questionnairesCount } = yield call(
        api.questionnaire.getQuestionnaires,
        {
          page: 0,
          limit: 0,
        }
      );
      questionnairesCountTotal = questionnairesCount.count;
    }

    if (!diagnosticsCountTotal) {
      const { data: diagnosticsCount } = yield call(
        api.diagnostics.getDiagnostics,
        {
          page: 0,
          limit: 0,
        }
      );
      diagnosticsCountTotal = diagnosticsCount.count;
    }

    let [firstFilter, seccondFilter] = getRemainingCount(
      questionnairesCountTotal,
      diagnosticsCountTotal,
      filter
    );

    firstFilter = formatFilter(firstFilter);
    seccondFilter = formatFilter(seccondFilter);

    const { data: questionnaires } = yield call(
      api.questionnaire.getQuestionnaires,
      firstFilter
    );
    const { data: diagnostics } = yield call(
      api.diagnostics.getDiagnostics,
      seccondFilter
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
        // const index = diagnosedQuestionnairesIds.indexOf(questionnaire.id);
        // diagnosedQuestionnairesIds.splice(index, 1);
        diagnostics.results.find(
          (diagnostic) => diagnostic.empresa_questionario === questionnaire.id
        ).empresa_questionario = questionnaire;
      }
    });

    let formatedDiagnostics = [...diagnostics.results];

    for (let i = 0; i < formatedDiagnostics.length; i++) {
      if (formatedDiagnostics[i].consultor) {
        const { data: consultant } = yield call(
          api.account.getConsultant,
          String(formatedDiagnostics[i].consultor)
        );
        formatedDiagnostics[i].consultor = consultant;
      }

      if (typeof formatedDiagnostics[i].empresa_questionario === "number") {
        // eslint-disable-next-line no-loop-func
        formatedDiagnostics.find((diagnostic) => {
          if (
            diagnostic.empresa_questionario?.id ===
            formatedDiagnostics[i].empresa_questionario
          ) {
            formatedDiagnostics[i].empresa_questionario =
              diagnostic.empresa_questionario;
          }
        });
      }

      if (
        typeof formatedDiagnostics[i].empresa_questionario.empresa === "number"
      ) {
        const { data: company } = yield call(
          api.companies.getCompany,
          formatedDiagnostics[i].empresa_questionario.empresa
        );
        formatedDiagnostics[i].empresa_questionario.empresa = company;
      }

      if (
        typeof formatedDiagnostics[i].empresa_questionario.empresa_master ===
        "number"
      ) {
        const { data: masterCompany } = yield call(
          api.companies.getMasterCompany,
          formatedDiagnostics[i].empresa_questionario.empresa_master
        );
        formatedDiagnostics[i].empresa_questionario.empresa_master =
          masterCompany;
      }
    }

    for (let i = 0; i < formatedQuestionnaires.length; i++) {
      if (formatedQuestionnaires[i].consultor) {
        const { data: consultant } = yield call(
          api.account.getConsultant,
          String(formatedQuestionnaires[i].consultor)
        );
        formatedQuestionnaires[i].consultor = consultant;
      }

      const { data: company } = yield call(
        api.companies.getCompany,
        formatedQuestionnaires[i].empresa_questionario.empresa
      );
      formatedQuestionnaires[i].empresa_questionario.empresa = company;

      const { data: masterCompany } = yield call(
        api.companies.getMasterCompany,
        formatedQuestionnaires[i].empresa_questionario.empresa_master
      );
      formatedQuestionnaires[i].empresa_questionario.empresa_master =
        masterCompany;
    }

    let allFilteredDiagnostics = [];

    if (params) {
      formatedDiagnostics = filterDiagnostics(formatedDiagnostics, params);
      formatedQuestionnaires = filterDiagnostics(
        formatedQuestionnaires,
        params
      );
    }

    allFilteredDiagnostics = [
      ...formatedDiagnostics,
      ...formatedQuestionnaires,
    ];

    yield put(
      DiagnosticsActions.getDiagnosticsSuccess(
        allFilteredDiagnostics,
        {
          total: params ? formatedDiagnostics.length : diagnostics.count,
          current: 0,
        },
        {
          total: params ? formatedQuestionnaires.length : questionnaires.count,
          current: 0,
        }
      )
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
