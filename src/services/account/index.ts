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

function getUsers() {
  return client("usuario/").get();
}

export default {
  getUsers,
  login,
  registerAccount,
  getSelfAccount,
};
