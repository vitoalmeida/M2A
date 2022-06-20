import client from "../client";

function getUf() {
  return client("uf/").get();
}

function getAddress(addressId: string) {
  return client("endereco/").id(addressId).get();
}

function registerAddress(data: any) {
  return client("endereco/").data(data).post();
}

export default {
  getUf,
  getAddress,
  registerAddress,
};
