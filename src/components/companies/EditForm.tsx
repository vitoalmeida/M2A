import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CompaniesActions } from "../../redux/companies";
import { useSelector } from "../../redux/hooks";
import DadosDaEmpresa from "./DadosDaEmpresa";
import Endereco from "./Endereco";
import InformacoesComplementares from "./InformacoesComplementares";

interface Props {
  closeForm: () => any;
}

const EditForm = ({ closeForm }: Props) => {
  const dispatch = useDispatch();
  const { general, account, companies } = useSelector((state) => state);

  const empty = companies.editCompany ? false : true;

  const [activeTab, setActiveTab] = useState<number>(0);
  const [tabs, setTabs] = useState([
    { name: "Dados da Empresa", mobileName: "1", id: 0, active: true },
    { name: "Endereço", mobileName: "2", id: 1, active: !empty ? true : false },
    {
      name: "Informações Complementares",
      mobileName: "3",
      id: 2,
      active: !empty ? true : false,
    },
  ]);

  function handleNextTab() {
    let newTabs = [...tabs];
    newTabs[activeTab + 1].active = true;
    setActiveTab(activeTab + 1);
    console.log(newTabs);
    setTabs(newTabs);
  }

  function handleSubmit() {
    dispatch(CompaniesActions.registerCompanyRequest(companies.editCompany));
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
    <div className="sm:mx-12 mx-5 mt-8 mb-10">
      <Tab.Group selectedIndex={activeTab}>
        <Tab.List className="flex border-b-[1px] sm:mx-10 space-x-9 sm:space-x-0 justify-center sm:justify-between bg-white">
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
        <Tab.Panels>
          <Tab.Panel>
            <DadosDaEmpresa changeTab={handleNextTab} />
          </Tab.Panel>

          <Tab.Panel>
            <Endereco changeTab={handleNextTab} />
          </Tab.Panel>

          <Tab.Panel>
            <InformacoesComplementares onSubmit={handleSubmit} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default EditForm;
