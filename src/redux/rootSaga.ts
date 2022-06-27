import { all, fork } from "redux-saga/effects";

import accountSaga from "./account/sagas";
import generalSaga from "./general/sagas";
import companiesSaga from "./companies/sagas";
import questionnaireSaga from "./questionnaire/sagas";
import diagnosticsSaga from "./diagnostics/sagas";

export default function* rootSaga() {
  yield all([
    fork(accountSaga),
    fork(generalSaga),
    fork(companiesSaga),
    fork(questionnaireSaga),
    fork(diagnosticsSaga),
  ]);
}
