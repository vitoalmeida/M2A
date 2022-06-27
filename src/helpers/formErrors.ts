import { ErrorType } from "../types/";

export const errorMessages = {
  required: "Campo necessário",
  answerRequired: "Escolha uma das alternativas",
  invalidEmail: "Digite um e-mail válido",
  shortPassword: "A senha deve conter no mínimo 6 dígitos",
  differentPassword: "A senhas não correspondem",
  mustBeGreater: "O valor deve ser maior que 0",
  mustBeLess: "O valor deve ser menor que 9999",
  cnpjMustBeLess: "CNPJ deve conter menos que 14 dígitos",
};

function parseLabel(key: string): string {
  switch (key) {
    case "cpf":
      return "CPF";
    case "password":
      return "Senha";
    default:
      return key;
  }
}

function translateError(codes: string[], label: string) {
  if (codes.length < 1) return `Erro no ${label}`;

  switch (codes[0]) {
    case "presence":
      return `Campo ${label} é necessário`;
    case "absence":
      return `Campo ${label} inválido`;
    case "format":
      return `Formato inválido do campo ${label}`;
    case "uniqueness":
      return `${label} já em uso`;
    case "numericality":
      return `${label} deve ser um número`;
    default:
      return `Erro no ${label}`;
  }
}

export function formatError(err: ErrorType) {
  if (!err.response) {
    return "Falha na operação";
  }
  const error = err.response;

  // if (error.status === 400) {
  //   return "Requisição invalida";
  // }
  if (error.status === 401) {
    return "Não autorizado";
  }
  if (error.status === 403) {
    return "Não autorizado";
  }
  if (error.status === 404) {
    return "Não encontrado";
  }
  if (error.status === 404) {
    return "Erro na aplicação";
  }
  if (error.status === 429) {
    return "Número de requisições excedidas";
  }

  if (error.status === 400) {
    const details = error.data;
    const keys = Object.keys(details);

    if (keys.length > 0) {
      const [key] = keys;
      const label = parseLabel(key);

      return translateError(details[key], label);
    }
  }
  return "Falha na operação";
}
