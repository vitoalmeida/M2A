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

function getAdminUsers() {
  return client("adm/").get();
}
function getColsultantUsers() {
  return client("consultor/").get();
}

export default {
  getAdminUsers,
  getColsultantUsers,
  login,
  registerAccount,
  getSelfAccount,
};
