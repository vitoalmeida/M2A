interface Props {
  nome: string;
  empresa_vinculada: string;
  uf: string;
  acoes: string;
}

const Company = ({ nome, empresa_vinculada, uf, acoes }: Props) => {
  return (
    <div className='flex space-x-5'>
      <p>{nome}</p>
      <p>{empresa_vinculada}</p>
      <p>{uf}</p>
      <p>{acoes}</p>
    </div>
  );
};

export default Company;
