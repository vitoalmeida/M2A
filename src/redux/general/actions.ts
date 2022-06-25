import { action } from "typesafe-actions";
import { GenericData } from "../../types";
import { GeneralActionTypes, GeneralTypes } from "./types";

export function getStaticValuesRequest(): GeneralActionTypes {
  return action(GeneralTypes.GET_STATIC_VALUES_REQUEST);
}

export function getStaticValuesSuccess(
  formatedUf: GenericData[],
  formatedCollections: GenericData[],
  formatedIndustryTypes: GenericData[],
  formatedSectors: GenericData[],
  formatedSegments: GenericData[]
): GeneralActionTypes {
  return action(GeneralTypes.GET_STATIC_VALUES_SUCCESS, {
    formatedUf,
    formatedCollections,
    formatedIndustryTypes,
    formatedSectors,
    formatedSegments,
  });
}

export function getStaticValuesFailure(): GeneralActionTypes {
  return action(GeneralTypes.GET_STATIC_VALUES_FAILURE);
}
