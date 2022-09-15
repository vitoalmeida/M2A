import client from "../client";

function login(data: any) {
  return client("login/").data(data).post();
}

function registerAccount(data: any) {
  return client("usuario/").data(data).post();
}

function getSelfAccount(data: any) {
  return client("usuario/").data(data).post();
}

function getAccount(profileId: string) {
  return client("usuario").id(profileId).get();
}

function deleteAccount(profileId: string) {
  return client("usuario").id(profileId).delete();
}

function getAdminUsers() {
  return client("adm/").get();
}

function getColsultantUsers() {
  return client("consultor/").get();
}

function setAccount(accountId: string, data: any) {
  return client(`usuario/${accountId}/`).data(data).put();
}

function setAdminAccount(accountId: string, data: any) {
  return client(`adm/${accountId}/`).data(data).put();
}

function setColsultantAccount(accountId: string, data: any) {
  return client(`consultor/${accountId}/`).data(data).put();
}

function deleteAdmin(profileId: string) {
  return client("adm").id(profileId).delete();
}
function deleteColsultant(profileId: string) {
  return client("consultor").id(profileId).delete();
}

function getConsultant(consultantId: string) {
  return client(`consultor/${consultantId}/`).get();
}

export default {
  deleteAdmin,
  deleteColsultant,
  setAccount,
  setAdminAccount,
  setColsultantAccount,
  getConsultant,
  deleteAccount,
  getAccount,
  getAdminUsers,
  getColsultantUsers,
  login,
  registerAccount,
  getSelfAccount,
};
