// eslint-disable-next-line no-unused-vars
import { all, call, put, takeLatest } from "redux-saga/effects";
import { GeneralActions } from ".";
import { GeneralTypes } from "./types";
import * as api from "../../services/index";
import * as helpers from "../../helpers/index";

function* getStaticValues() {
  try {
    const { data: ufs } = yield call(api.general.getUf);
    const formatedUf = helpers.formData.formatUf(ufs.results);

    const { data: collectionsValues } = yield call(
      api.general.getCollectionValues
    );
    const formatedCollections = helpers.formData.formatGenericData(
      collectionsValues.results
    );

    const { data: industryTypes } = yield call(api.general.getIndustryTypes);
    const formatedIndustryTypes = helpers.formData.formatGenericData(
      industryTypes.results
    );

    const { data: sectors } = yield call(api.general.getSectors);
    const formatedSectors = helpers.formData.formatGenericData(sectors.results);

    const { data: segments } = yield call(api.general.getSegments);
    const formatedSegments = helpers.formData.formatGenericData(
      segments.results
    );

    yield put(
      GeneralActions.getStaticValuesSuccess(
        formatedUf,
        formatedCollections,
        formatedIndustryTypes,
        formatedSectors,
        formatedSegments
      )
    );
  } catch (err) {
    yield put(GeneralActions.getStaticValuesFailure());
    console.log(err);
  }
}

function* generalSaga() {
  yield all([
    takeLatest(GeneralTypes.GET_STATIC_VALUES_REQUEST, getStaticValues),
  ]);
}

export default generalSaga;
