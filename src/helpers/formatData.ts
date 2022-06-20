export const formatUf = (ufs) => {
  const formatedUf = ufs.map((uf) => {
    return { id: uf.id, label: uf.nome_uf, value: uf.sg_uf };
  });
  return formatedUf;
};
