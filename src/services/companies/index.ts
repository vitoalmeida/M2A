import client from "../client";

function getCompany(companyId: string) {
  return client("empresa/").id(companyId).get();
}

function getCompanies() {
  return client("empresa/").get();
}

function registerCompany(data: any) {
  return client("empresa/").data(data).post();
}

function deleteCompany(companyId: string) {
  return client("empresa").remoteMethod(companyId).delete();
}

export default {
  getCompanies,
  getCompany,
  registerCompany,
  deleteCompany,
};
