/* eslint-disable import/no-anonymous-default-export */
// eslint-disable-next-line no-unused-vars
import { all, call, put, takeLatest } from "redux-saga/effects";
import { GeneralActions } from ".";
import { GeneralTypes } from "./types";
import * as api from "../../services/index";
import * as helpers from "../../helpers/index";
import { perguntas } from "../../services/seed";

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

    const { data: fundamentals } = yield call(api.general.getFundamentals);
    const formatedFundamentals = helpers.formData.formatGenericData(
      fundamentals.results
    );

    yield put(
      GeneralActions.getStaticValuesSuccess(
        formatedUf,
        formatedCollections,
        formatedIndustryTypes,
        formatedSectors,
        formatedSegments,
        formatedFundamentals,
      )
    );
  } catch (err) {
    yield put(GeneralActions.getStaticValuesFailure());
    console.log(err);
  }
}

function* seedBackend() {
  const { data } = yield call(api.questionnaire.getQuestions);
  // console.log()
  if (!data.results.length) {
    for (let i = 0; i < perguntas.length; i++) {
      yield call(api.questionnaire.registerQuestion, perguntas[i]);
    }
  }
}

export default [
  takeLatest(GeneralTypes.GET_STATIC_VALUES_REQUEST, getStaticValues),
  takeLatest(GeneralTypes.SEED_BACKEND, seedBackend),
]
