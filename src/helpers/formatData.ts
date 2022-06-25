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
