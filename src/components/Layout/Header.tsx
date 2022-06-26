import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "../../redux/hooks";
import Modal from "../Modal";
import Perfil from "./Perfil";
import { FaChevronDown } from "react-icons/fa";
import { BsFillGearFill } from "react-icons/bs";
import { Company } from "../../redux/companies/types";
import { Profile } from "../../redux/account/types";

const tabs = [
  { name: "Empresas", href: "/companies", allowed: [1, 2] },
  { name: "Questionários", href: "/questionnaires", allowed: [1, 2, 3, 4] },
  { name: "Diagnósticos", href: "/diagnostics", allowed: [1, 2] },
  { name: "Perguntas", href: "/questions", allowed: [1, 2] },
  { name: "Usuários", href: "/users", allowed: [1] },
];

const Header = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const { account } = useSelector((state) => state);
  const activeTab = location.pathname;

  const [isProfileOpen, setProfileOpen] = useState(false);

  return (
    <div>
      <Modal
        showModal={isProfileOpen}
        onCloseModal={() => setProfileOpen(false)}
        closeButton
      >
        <Perfil />
      </Modal>
      <div className="flex justify-between my-5">
        <img
          src={require("../../assets/images/logo.png")}
          alt="logo"
          className="h-8 md:h-14 xl:h-20"
        />
        <div
          onClick={() => {
            setProfileOpen(!isProfileOpen);
          }}
          className="flex items-center cursor-pointer"
        >
          <p className="mr-2 text-xs xl:text-lg">
            {account.data.isCompany
              ? (account.data.user_inf as Company).fantasia
              : `${(account?.data?.user_inf as Profile).nome} ${
                  (account?.data?.user_inf as Profile).sobrenome
                }`}
          </p>
          <FaChevronDown color={"#474747"} />

          <span className="ml-4 inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
            <svg
              className="h-full w-full text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
        </div>
      </div>
      <div className="md:hidden mt-10 mb-5">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          onChange={(event) =>
            navigate(tabs.find((tab) => tab.name === event.target.value).href)
          }
          className="bg-main-blue text-white p-5 block w-full border border-gray-300 rounded-lg duration-500"
          defaultValue={tabs.find((tab) => tab.href === activeTab).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden md:block">
        <nav
          className="relative flex z-0 rounded-lg overflow-hidden shadow-md divide-x divide-gray-200 duration-500"
          aria-label="Tabs"
        >
          {tabs.map((tab) => {
            // if (tab.allowed.includes(account.data.tipo))
            return (
              <Link to={tab.href} className="flex-1">
                <div
                  key={tab.name}
                  className={`${
                    tab.href === activeTab
                      ? "text-white border-secondary-blue"
                      : "text-[#cccccc] hover:text-[#e8e8e8] border-transparent border-[#99c3dd]"
                  } group relative min-w-0 flex-1 overflow-hidden bg-main-blue hover:bg-[#00558a]  py-[0.75rem] px-4 text-sm font-medium text-center border-b-2 focus:z-10 duration-500`}
                  aria-current={tab.href === activeTab ? "page" : undefined}
                >
                  {tab.name}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
export default Header;
