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
  console.log(firstRemaining);
  console.log(seccondRemaining);

  if (firstRemaining < 5) {
    seccondFilter.newLimit = 10 - firstRemaining;
  } else if (seccondRemaining < 5) {
    firstFilter.newLimit = 10 - seccondRemaining;
  }

  return [firstFilter, seccondFilter];
};
