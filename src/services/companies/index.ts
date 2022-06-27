import client from "../client";

function getCompany(companyId: string) {
  return client(`empresa/${companyId}`).get();
}

function getMasterCompany(companyId: string) {
  return client(`empresa_master/${companyId}`).get();
}

function getCompanies() {
  return client("empresa/").get();
}

function getMasterCompanies() {
  return client("empresa_master/").get();
}

function registerCompany(data: any) {
  return client("empresa/").data(data).post();
}

function deleteCompany(companyId: string) {
  return client("empresa").remoteMethod(companyId).delete();
}

function deleteMasterCompany(companyId: string) {
  return client("empresa_master").remoteMethod(companyId).delete();
}

export default {
  getCompanies,
  getMasterCompanies,
  getCompany,
  getMasterCompany,
  registerCompany,
  deleteCompany,
  deleteMasterCompany,
};
