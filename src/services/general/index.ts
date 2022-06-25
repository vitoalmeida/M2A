import client from "../client";

function getUf() {
  return client("uf/").get();
}

function getIndustryTypes() {
  return client("tipo_industria/").get();
}

function getCollectionValues() {
  return client("valor_arrecadacao/").get();
}

function getSectors() {
  return client("setor/").get();
}

function getSegments() {
  return client("segmento/").get();
}

function getAddress(addressId: string) {
  return client("endereco/").id(addressId).get();
}

function registerAddress(data: any) {
  return client("endereco/").data(data).post();
}

export default {
  getIndustryTypes,
  getCollectionValues,
  getSectors,
  getSegments,
  getUf,
  getAddress,
  registerAddress,
};
