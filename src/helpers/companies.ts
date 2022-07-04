import { Company } from "../redux/companies/types";
import { Address } from "../redux/general/types";

export function verifyCompanyToEdit(oldCompany: Company, newCompany: Company) {
  const formatedCompany: any = oldCompany;

  if (newCompany.cnpj && newCompany.cnpj !== oldCompany.cnpj) {
    formatedCompany.cnpj = String(newCompany.cnpj);
  }

  if (
    newCompany.razao_social &&
    newCompany.razao_social !== oldCompany.razao_social
  ) {
    formatedCompany.razao_social = newCompany.razao_social;
  }

  if (newCompany.fantasia && newCompany.fantasia !== oldCompany.fantasia) {
    formatedCompany.fantasia = newCompany.fantasia;
  }

  if (
    newCompany.num_empregados &&
    newCompany.num_empregados !== oldCompany.num_empregados
  ) {
    formatedCompany.num_empregados = newCompany.num_empregados;
  }

  if (
    newCompany.dt_ano_inicio &&
    newCompany.dt_ano_inicio !== oldCompany.dt_ano_inicio
  ) {
    formatedCompany.dt_ano_inicio = newCompany.dt_ano_inicio;
  }

  if (newCompany.telefone && newCompany.telefone !== oldCompany.telefone) {
    formatedCompany.telefone = newCompany.telefone;
  }

  if (newCompany.celular && newCompany.celular !== oldCompany.celular) {
    formatedCompany.celular = newCompany.celular;
  }

  if (
    newCompany.inscricao_estadual &&
    newCompany.inscricao_estadual !== oldCompany.inscricao_estadual
  ) {
    formatedCompany.inscricao_estadual = newCompany.inscricao_estadual;
  }

  if (newCompany.fax && newCompany.fax !== oldCompany.fax) {
    formatedCompany.fax = newCompany.fax;
  }

  if (newCompany.master !== oldCompany.master) {
    formatedCompany.master = newCompany.master;
  }

  if (newCompany.bool_master !== oldCompany.bool_master) {
    formatedCompany.bool_master = newCompany.bool_master;
  }

  if (
    newCompany.ds_negocio &&
    newCompany.ds_negocio !== oldCompany.ds_negocio
  ) {
    formatedCompany.ds_negocio = newCompany.ds_negocio;
  }

  if (newCompany.missao && newCompany.missao !== oldCompany.missao) {
    formatedCompany.missao = newCompany.missao;
  }

  if (newCompany.visao && newCompany.visao !== oldCompany.visao) {
    formatedCompany.visao = newCompany.visao;
  }

  if (newCompany.valores && newCompany.valores !== oldCompany.valores) {
    formatedCompany.valores = newCompany.valores;
  }

  // if (newCompany.grupo && newCompany.grupo !== oldCompany.grupo) {
  //   formatedCompany.grupo = newCompany.grupo;
  // }

  if (newCompany.segmento && newCompany.segmento !== oldCompany.segmento) {
    formatedCompany.segmento = newCompany.segmento;
  }

  if (newCompany.setor && newCompany.setor !== oldCompany.setor) {
    formatedCompany.setor = newCompany.setor;
  }

  if (
    newCompany.tipo_industria &&
    newCompany.tipo_industria !== oldCompany.tipo_industria
  ) {
    formatedCompany.tipo_industria = newCompany.tipo_industria;
  }

  if (
    newCompany.faturamento &&
    newCompany.faturamento !== oldCompany.faturamento
  ) {
    formatedCompany.faturamento = newCompany.faturamento;
  }

  // if (newCompany.projeto && newCompany.projeto !== oldCompany.projeto) {
  //   formatedCompany.projeto = newCompany.projeto;
  // }

  if (
    newCompany.valor_arrecadacao &&
    newCompany.valor_arrecadacao !== oldCompany.valor_arrecadacao
  ) {
    formatedCompany.valor_arrecadacao = newCompany.valor_arrecadacao;
  }

  if (
    newCompany.resp_nome &&
    newCompany.resp_nome !== oldCompany.resp_nome
  ) {
    formatedCompany.resp_nome = newCompany.resp_nome;
  }

  if (
    newCompany.resp_sobrenome &&
    newCompany.resp_sobrenome !== oldCompany.resp_sobrenome
  ) {
    formatedCompany.resp_sobrenome = newCompany.resp_sobrenome;
  }

  if (
    newCompany.resp_email &&
    newCompany.resp_email !== oldCompany.resp_email
  ) {
    formatedCompany.resp_email = newCompany.resp_email;
  }

  if (
    newCompany.resp_sexo &&
    newCompany.resp_sexo !== oldCompany.resp_sexo
  ) {
    formatedCompany.resp_sexo = newCompany.resp_sexo;
  }

  if (
    newCompany.resp_formacao_academica &&
    newCompany.resp_formacao_academica !== oldCompany.resp_formacao_academica
  ) {
    formatedCompany.resp_formacao_academica = newCompany.resp_formacao_academica;
  }

  if (newCompany.endereco) {
    verifyAddressToEdit(oldCompany.endereco, newCompany.endereco);
  }

  return formatedCompany;
}

export function verifyAddressToEdit(oldAddress: Address, newAddress: Address) {
  const formatedAddress: any = oldAddress;

  if (newAddress.cep && newAddress.cep !== oldAddress.cep) {
    formatedAddress.cep = newAddress.cep;
  }
  if (newAddress.cep && newAddress.cep !== oldAddress.cep) {
    formatedAddress.cep = newAddress.cep;
  }

  if (
    newAddress.logradouro &&
    newAddress.logradouro !== oldAddress.logradouro
  ) {
    formatedAddress.logradouro = newAddress.logradouro;
  }

  if (newAddress.bairro && newAddress.bairro !== oldAddress.bairro) {
    formatedAddress.bairro = newAddress.bairro;
  }

  if (newAddress.bairro && newAddress.bairro !== oldAddress.bairro) {
    formatedAddress.bairro = newAddress.bairro;
  }

  if (newAddress.cidade && newAddress.cidade !== oldAddress.cidade) {
    formatedAddress.cidade = newAddress.cidade;
  }

  if (
    newAddress.complemento &&
    newAddress.complemento !== oldAddress.complemento
  ) {
    formatedAddress.complemento = newAddress.complemento;
  }

  if (newAddress.uf && newAddress.uf !== oldAddress.uf) {
    formatedAddress.uf = newAddress.uf;
  }

  return formatedAddress;
}
