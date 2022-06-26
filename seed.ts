const admin = {
  id: 1,
  username: "MarceloAdmin",
  password: "123456",
  ativo: true,
  email: "marceloadmin@gmail.com",
  tipo: 1,
  user_inf: {
    nome: "Marcelo",
    sobrenome: "Silva",
    cpf: "00000000000",
  },
};

const consultor = {
  id: 2,
  username: "MarceloConsultor",
  password: "123456",
  ativo: true,
  email: "marceloconsultor@gmail.com",
  tipo: 2,
  user_inf: {
    nome: "Marcelo",
    sobrenome: "Silva",
    cpf: "00000000000",
    formacao: "superior",
    uf: 2,
    telefone: "00000000",
  },
};

export const empresaMaster = {
  id: 3,
  username: "empresamaster",
  password: "123456",
  ativo: true,
  email: "empresamaster@email.com",
  tipo: 4,
  user_inf: {
    cnpj: "0",
    razao_social: "vazio",
    fantasia: "vazio",
    num_empregados: 1,
    dt_ano_inicio: "2022-06-06",
    telefone: "0",
    resp_nome: "vazio",
    resp_sobrenome: "vazio",
    resp_email: "vazio",
    resp_sexo: "vazio",
    resp_formacao_academica: "vazio",
    endereco: 1,
    segmento: 1,
    setor: 1,
    tipo_industria: 1,
    valor_arrecadacao: 1,
  },
};
