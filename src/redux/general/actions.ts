import { action } from "typesafe-actions";
import { GenericData } from "../../types";
import { GeneralActionTypes, GeneralTypes } from "./types";

export function getUfRequest(): GeneralActionTypes {
  return action(GeneralTypes.GET_UF_REQUEST);
}

export function getUfSuccess(data: GenericData[]): GeneralActionTypes {
  return action(GeneralTypes.GET_UF_SUCCESS, { data });
}

export function getUfFailure(): GeneralActionTypes {
  return action(GeneralTypes.GET_UF_FAILURE);
}
