import { select } from "redux-saga/effects";

import ApplicationState from "./types";

export function* getCompanies() {
  return yield select((state: ApplicationState) => state.companies);
}

export function* getAccount() {
  return yield select((state: ApplicationState) => state.account);
}

export function* getDiagnostics() {
  return yield select((state: ApplicationState) => state.diagnostics);
}

export function* getGeneral() {
  return yield select((state: ApplicationState) => state.general);
}

export function* getQuestionnaires() {
  return yield select((state: ApplicationState) => state.questionnaire);
}
