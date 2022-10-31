import { action } from "typesafe-actions";
import { Filter } from "../../types";
import { CompaniesActionTypes, CompaniesTypes, Company, Count } from "./types";

export function getCompanyRequest(companyId: number): CompaniesActionTypes {
  return action(CompaniesTypes.GET_COMPANY_REQUEST, { companyId });
}

export function getCompanySuccess(data: Company[]): CompaniesActionTypes {
  return action(CompaniesTypes.GET_COMPANY_SUCCESS, { data });
}

export function getCompanyFailure(): CompaniesActionTypes {
  return action(CompaniesTypes.GET_COMPANY_FAILURE);
}

export function getMasterCompaniesRequest(
  filter: Filter
): CompaniesActionTypes {
  return action(CompaniesTypes.GET_MASTER_COMPANIES_REQUEST, { filter });
}

export function getMasterCompaniesSuccess(
  data: Company[]
): CompaniesActionTypes {
  return action(CompaniesTypes.GET_MASTER_COMPANIES_SUCCESS, { data });
}

export function getMasterCompaniesFailure(): CompaniesActionTypes {
  return action(CompaniesTypes.GET_MASTER_COMPANIES_FAILURE);
}

export function getCompaniesRequest(
  filter: Filter,
  params?: any
): CompaniesActionTypes {
  return action(CompaniesTypes.GET_COMPANIES_REQUEST, { filter, params });
}

export function getCompaniesSuccess(
  data: Company[],
  companiesCount: Count,
  masterCompaniesCount: Count
): CompaniesActionTypes {
  return action(CompaniesTypes.GET_COMPANIES_SUCCESS, {
    data,
    companiesCount,
    masterCompaniesCount,
  });
}

export function getCompaniesFailure(): CompaniesActionTypes {
  return action(CompaniesTypes.GET_COMPANIES_FAILURE);
}

export function registerCompanyRequest(data: Company): CompaniesActionTypes {
  return action(CompaniesTypes.REGISTER_COMPANY_REQUEST, { data });
}

export function registerCompanySuccess(data: Company): CompaniesActionTypes {
  return action(CompaniesTypes.REGISTER_COMPANY_SUCCESS, { data });
}

export function registerCompanyFailure(): CompaniesActionTypes {
  return action(CompaniesTypes.REGISTER_COMPANY_FAILURE);
}

export function deleteCompanyRequest(
  companyId: number,
  userId: number,
  type: number
): CompaniesActionTypes {
  return action(CompaniesTypes.DELETE_COMPANY_REQUEST, {
    companyId,
    userId,
    type,
  });
}

export function deleteCompanySuccess(): CompaniesActionTypes {
  return action(CompaniesTypes.DELETE_COMPANY_SUCCESS);
}

export function deleteCompanyFailure(): CompaniesActionTypes {
  return action(CompaniesTypes.DELETE_COMPANY_FAILURE);
}

export function setEditCompany(data: Company): CompaniesActionTypes {
  return action(CompaniesTypes.SET_EDIT_COMPANY_REQUEST, { data });
}
export function setEditCompanySuccess(data: Company): CompaniesActionTypes {
  return action(CompaniesTypes.SET_EDIT_COMPANY_SUCCESS, { data });
}
export function setEditCompanyFailure(): CompaniesActionTypes {
  return action(CompaniesTypes.SET_EDIT_COMPANY_FAILURE);
}

export function editCompanyRequest(data: Company): CompaniesActionTypes {
  return action(CompaniesTypes.EDIT_COMPANY_REQUEST, { data });
}
export function editCompanySuccess(): CompaniesActionTypes {
  return action(CompaniesTypes.EDIT_COMPANY_SUCCESS);
}
export function editCompanyFailure(): CompaniesActionTypes {
  return action(CompaniesTypes.EDIT_COMPANY_FAILURE);
}

export function removeEditCompany(): CompaniesActionTypes {
  return action(CompaniesTypes.REMOVE_EDIT_COMPANY);
}
export function clearError(): CompaniesActionTypes {
  return action(CompaniesTypes.CLEAR_ERROR);
}

export function clearData(): CompaniesActionTypes {
  return action(CompaniesTypes.CLEAR_DATA);
}
