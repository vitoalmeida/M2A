import client from "../client";

function getCompany(companyId: string) {
  return client(`empresa/${companyId}/`).get();
}

function getMasterCompany(companyId: string) {
  return client(`empresa_master/${companyId}/`).get();
}

function getCompanies(filter: any) {
  return client("empresa/").filter(filter).get();
}

function editCompany(companyId: string, data: any) {
  return client(`empresa/${companyId}/`).data(data).put();
}

function editMasterCompany(companyId: string, data: any) {
  return client(`empresa_master/${companyId}/`).data(data).put();
}

function getMasterCompanies(filter: any) {
  return client("empresa_master/").filter(filter).get();
}

function registerCompany(data: any) {
  return client("empresa/").data(data).post();
}

function deleteCompany(companyId: string) {
  return client(`empresa/${companyId}/`).delete();
}

function deleteMasterCompany(companyId: string) {
  return client(`empresa_master/${companyId}/`).delete();
}

export default {
  editCompany,
  editMasterCompany,
  getCompanies,
  getMasterCompanies,
  getCompany,
  getMasterCompany,
  registerCompany,
  deleteCompany,
  deleteMasterCompany,
};
