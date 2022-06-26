import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setOriginalNode } from "typescript";
import { AccountActions } from "../../redux/account";
import { CompaniesActions } from "../../redux/companies";
import { useSelector } from "../../redux/hooks";
import DadosDaEmpresa from "./DadosDaEmpresa";
import Endereco from "./Endereco";
import Faturamento from "./Faturamento";
import InformacoesComplementares from "./InformacoesComplementares";

interface Props {
  closeForm?: () => any;
  onSubmit?: () => any;
}

const CompanyForm = ({ closeForm, onSubmit }: Props) => {
  const dispatch = useDispatch();
  const { general, account, companies } = useSelector((state) => state);

  // const empty = companies.editCompany ? false : true;
  const empty = false;

  const [activeTab, setActiveTab] = useState<number>(0);
  const [tabs, setTabs] = useState([
    { name: "Dados da Empresa", mobileName: "1", id: 0, active: true },
    { name: "Endereço", mobileName: "2", id: 1, active: !empty ? true : false },
    {
      name: "Faturamento",
      mobileName: "3",
      id: 2,
      active: !empty ? true : false,
    },
    {
      name: "Informações Complementares",
      mobileName: "4",
      id: 3,
      active: !empty ? true : false,
    },
  ]);

  function handleNextTab() {
    let newTabs = [...tabs];
    newTabs[activeTab + 1].active = true;
    setActiveTab(activeTab + 1);
    setTabs(newTabs);
  }

  function handleSubmit() {
    if (onSubmit) {
      onSubmit();
    } else {
      console.log(companies.editCompany);
      // dispatch(
      //   AccountActions.registerAccountRequest({
      //     ...companies.editCompany,
      //     tipo: companies?.editCompany?.bool_master ? 4 : 3,
      //   })
      // );
    }
  }

  useEffect(() => {
    if (companies.error === false) closeForm();
  }, [companies.error]);

  const [isMobileScreen, setIsMobileScreen] = useState<boolean>();

  const updateMedia = () => {
    setIsMobileScreen(window.innerWidth < 640);
  };

  useEffect(() => {
    dispatch(CompaniesActions.clearError());

    updateMedia();
    window.addEventListener("resize", updateMedia, { passive: true });
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  return (
    <div className="w-full max-w-xl lg:max-w-3xl duration-500">
      <Tab.Group selectedIndex={activeTab}>
        <Tab.List className="flex border-b-[1px] space-x-9 sm:space-x-6 justify-center sm:justify-between bg-white">
          {tabs.map((tab) => (
            <Tab
              className={`${
                !tabs.find((t) => t.id === tab.id).active
                  ? "text-gray-400"
                  : tab.id === activeTab
                  ? "text-secondary-blue py-2 border-b border-secondary-blue"
                  : ""
              } font-medium`}
              disabled={!tabs.find((t) => t.id === tab.id).active}
              onClick={() => setActiveTab(tab.id)}
            >
              {isMobileScreen ? tab.mobileName : tab.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-3">
          <Tab.Panel>
            <DadosDaEmpresa changeTab={handleNextTab} />
          </Tab.Panel>

          <Tab.Panel>
            <Endereco changeTab={handleNextTab} />
          </Tab.Panel>

          <Tab.Panel>
            <Faturamento changeTab={handleNextTab} />
          </Tab.Panel>

          <Tab.Panel>
            <InformacoesComplementares onSubmit={handleSubmit} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default CompanyForm;