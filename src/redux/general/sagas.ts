// eslint-disable-next-line no-unused-vars
import { all, call, put, takeLatest } from "redux-saga/effects";
import { GeneralActions } from ".";
import { GeneralTypes } from "./types";
import * as api from "../../services/index";
import * as helpers from "../../helpers/index";

function* getUf() {
  try {
    const { data } = yield call(api.general.getUf);
    const formatedUf = helpers.formData.formatUf(data.results);

    yield put(GeneralActions.getUfSuccess(formatedUf));
  } catch (err) {
    yield put(GeneralActions.getUfFailure());
    console.log(err);
  }
}

function* generalSaga() {
  yield all([takeLatest(GeneralTypes.GET_UF_REQUEST, getUf)]);
}

export default generalSaga;
