import { Company } from "../redux/companies/types";
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
    const pattern = new RegExp(params.query.toLowerCase(), "g");
    filteredCompanies = filteredCompanies.filter((company) => {
      console.log(company);
      if (
        company.razao_social &&
        pattern.test(company.razao_social.toLowerCase())
      ) {
        return company;
      } else if (
        company.fantasia &&
        pattern.test(company.fantasia.toLowerCase())
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

  return filteredCompanies;
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
