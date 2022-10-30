import { Profile } from "../redux/account/types";
import { Company } from "../redux/companies/types";
import { Diagnostic } from "../redux/diagnostics/types";
import { Questionnaire } from "../redux/questionnaire/types";
import { Filter } from "../types";

export const formatUf = (ufs) => {
  const formatedUf = ufs.map((uf) => {
    return { id: uf.id, label: uf.nome_uf, optional: uf.sg_uf };
  });
  return formatedUf;
};

export const formatGenericData = (data) => {
  const formatedData = data.map((item) => {
    item["label"] = item[Object.keys(item)[1]];
    delete item[Object.keys(item)[1]];
    if (Object.keys(item)[2]) {
      item["optional"] = item[Object.keys(item)[2]];
      delete item[Object.keys(item)[2]];
    }
    return item;
  });
  return formatedData;
};

export const formatFilter = (filter: Filter) => {
  if (!filter.offset) filter.offset = 0;

  if (filter.page) {
    filter.offset += filter.limit * filter.page;
    delete filter["page"];
  }

  if (filter.newLimit) {
    filter.limit = filter.newLimit;
    delete filter["newLimit"];
  }

  return filter;
};

export const getRemainingCount = (
  firstTotal: number,
  seccondTotal: number,
  filter: Filter
) => {
  const firstFilter = { ...filter };
  const seccondFilter = { ...filter };

  const firstRemaining = firstTotal - filter.limit * filter.page;
  const seccondRemaining = seccondTotal - filter.limit * filter.page;

  if (firstRemaining < 5) {
    seccondFilter.newLimit = 10 - firstRemaining;
  } else if (seccondRemaining < 5) {
    firstFilter.newLimit = 10 - seccondRemaining;
  }

  return [firstFilter, seccondFilter];
};

export const getRouterParams = (query: string) => {
  if (!query.length) return "";

  const params: any = {};

  query
    .replaceAll("?", "")
    .replaceAll("%20", " ")
    .split("&")
    .map((param) => {
      const separeteParam = param.split("=");
      params[separeteParam[0]] = separeteParam[1];
    });

  return params;
};

export function filterCompanies(companies: Company[], params: any) {
  let filteredCompanies = [...companies];

  if (params.query) {
    const pattern = new RegExp(
      params.query
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase(),
      "g"
    );
    filteredCompanies = filteredCompanies.filter((company) => {
      if (
        company.razao_social &&
        pattern.test(
          company.razao_social
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
        )
      ) {
        return company;
      } else if (
        company.fantasia &&
        pattern.test(
          company.fantasia
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
        )
      ) {
        return company;
      } else {
        return null;
      }
    });
  }

  if (params.uf) {
    filteredCompanies = filteredCompanies.filter((company) => {
      if (
        company.endereco &&
        Number(company.endereco?.uf) === Number(params.uf)
      ) {
        return company;
      } else {
        return null;
      }
    });
  }

  if (params.empresa_vinculada) {
    filteredCompanies = filteredCompanies.filter((company) => {
      if (
        company.master &&
        Number(company.master) === Number(params.empresa_vinculada)
      ) {
        return company;
      } else {
        return null;
      }
    });
  }

  if (params.setor) {
    filteredCompanies = filteredCompanies.filter((company) => {
      if (company.setor && Number(company.setor) === Number(params.setor)) {
        return company;
      } else {
        return null;
      }
    });
  }
  if (params.arrecadacao) {
    filteredCompanies = filteredCompanies.filter((company) => {
      if (
        company.valor_arrecadacao &&
        Number(company.valor_arrecadacao) === Number(params.arrecadacao)
      ) {
        return company;
      } else {
        return null;
      }
    });
  }

  return filteredCompanies;
}

export function filterUsers(users: Profile[], params: any) {
  let filteredUsers = [...users];

  if (params.nome) {
    const words = params.nome
      .replace(/\s\s+/g, " ")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .split(" ");
    filteredUsers = filteredUsers.filter((user) => {
      if (
        words.includes(user.nome.toLowerCase()) ||
        words.includes(user.sobrenome.toLowerCase())
      ) {
        return user;
      } else {
        return null;
      }
    });
  }

  if (params.email) {
    const pattern = new RegExp(params.email.toLowerCase(), "g");
    filteredUsers = filteredUsers.filter((user) => {
      if (pattern.test(user.email)) {
        return user;
      } else {
        return null;
      }
    });
  }

  if (params.perfil) {
    filteredUsers = filteredUsers.filter((user) => {
      if (Number(params.perfil) === Number(user.tipo)) {
        return user;
      } else {
        return null;
      }
    });
  }

  return filteredUsers;
}

export function filterDiagnostics(diagnostics: Diagnostic[], params: any) {
  let filteredDiagnostics = [...diagnostics];

  if (params.tempo) {
    const tempo = params.tempo.replace(/\D/g, "");
    filteredDiagnostics = filteredDiagnostics.filter((diagnostic) => {
      if (tempo === params.tempo) {
        return diagnostic;
      } else {
        return null;
      }
    });
  }

  if (params.status) {
    filteredDiagnostics = filteredDiagnostics.filter((diagnostic) => {
      if (Number(params.status) === 1 && diagnostic.consultor) {
        return diagnostic;
      } else if (Number(params.status) === 2 && !diagnostic.consultor) {
        return diagnostic;
      } else {
        return null;
      }
    });
  }

  if (params.consultor) {
    filteredDiagnostics = filteredDiagnostics.filter((diagnostic) => {
      // @ts-ignore
      if (Number(params.consultor) === Number(diagnostic.consultor?.id)) {
        return diagnostic;
      } else {
        return null;
      }
    });
  }

  if (
    params.query ||
    params.uf ||
    params.empresa_vinculada ||
    params.arrecadacao ||
    params.setor
  ) {
    filteredDiagnostics = filteredDiagnostics.filter((diagnostic) => {
      const filteredCompany = filterCompanies(
        [(diagnostic.empresa_questionario as Questionnaire).empresa as Company],
        params
      );

      const filteredMasterCompany = filterCompanies(
        [
          (diagnostic.empresa_questionario as Questionnaire)
            .empresa_master as Company,
        ],
        params
      );
      if (filteredCompany.length || filteredMasterCompany.length)
        return diagnostic;
      else return null;
    });
  }

  return filteredDiagnostics;
}

export function formatQueryString(params: any, values: any) {
  let queryString = "?";

  Object.keys(params).forEach((prop) => {
    if (params[prop] && !Object.keys(values).includes(prop)) {
      queryString += `${queryString.length > 1 ? "&" : ""}${prop}=${
        params[prop]
      }`;
    }
  });

  Object.keys(values).forEach((prop) => {
    if (values[prop]) {
      queryString += `${queryString.length > 1 ? "&" : ""}${prop}=${
        values[prop]
      }`;
    }
  });

  return queryString.length > 1 ? queryString : "";
}
