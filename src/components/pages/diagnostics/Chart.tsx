const Chart = ({ risco }) => {
  const riscoClassname = {
    Extremo: "left-full",
    Alto: "left-3/4",
    Médio: "left-2/4",
    Baixo: "left-1/4",
    Nenhum: "left-0",
  };

  return (
    <div className="items-center rounded-md flex relative my-10 h-10 w-full bg-gradient-to-r to-[#FF6169] via-[#FDF094] from-[#9BF562]">
      <div
        className={`absolute w-2 h-[115%] bg-[#ffffff] indicator-shadow rounded-lg ${
          riscoClassname[String(risco)]
        }`}
      />
    </div>
  );
};

export default Chart;
