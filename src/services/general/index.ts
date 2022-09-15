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

function getFundamentals() {
  return client("fundamento/").get();
}

function getAddress(addressId: string) {
  return client(`endereco/${addressId}/`).get();
}

function editAddress(addressId: string, data: any) {
  return client(`endereco/${addressId}/`).data(data).put();
}

function registerAddress(data: any) {
  return client("endereco/").data(data).post();
}

function registerInvoicing(data: any) {
  return client("faturamento/").data(data).post();
}

export default {
  editAddress,
  registerInvoicing,
  getIndustryTypes,
  getCollectionValues,
  getSectors,
  getSegments,
  getFundamentals,
  getUf,
  getAddress,
  registerAddress,
};
