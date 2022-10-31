import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { CompanyForm } from "../../";
import { CompaniesActions } from "../../../redux/companies";
import { useSelector } from "../../../redux/hooks";
import LoginForm from "./LoginForm";
import PasswordForm from "./PasswordForm";

const AuthRegion = () => {
  const dispatch = useDispatch();
  const { companies } = useSelector((state) => state);

  const [currentScreen, setCurrentScreen] = useState("login");
  const [registerFinalStep, setRegisterFinalStep] = useState(false);

  function handleSubmit() {
    // dispatch(AccountActions.registerAccountRequest({}));
  }

  return (
    <div className="relative self-center bg-white md:shadow-xl min-h-[45rem] flex rounded-2xl overflow-x-hidden duration-500">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 md:px-20 lg:px-20 xl:px-24 duration-500">
        <div className="mx-auto duration-500">
          {registerFinalStep && (
            <span
              onClick={() => setRegisterFinalStep(false)}
              className="cursor-pointer top-16 left-4 md:left-20 lg:left-20 xl:left-24 absolute flex items-center text-gray-500"
            >
              <FaChevronLeft className="text-gray-500 mr-2" />
              Voltar
            </span>
          )}
          <div className="flex relative flex-col items-center duration-500">
            {currentScreen === "login" && (
              <img
                className="h-20 mx-auto w-auto"
                src={require("../../../assets/images/logo.png")}
                alt="Workflow"
              />
            )}
            {currentScreen === "register" && !registerFinalStep && (
              <span
                onClick={() => setCurrentScreen("login")}
                className="cursor-pointer top-8 left-0 absolute flex items-center text-gray-500"
              >
                <FaChevronLeft className="text-gray-500 mr-2" />
                Voltar
              </span>
            )}
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              {currentScreen === "login"
                ? "Faça login em sua conta"
                : registerFinalStep
                ? "Falta pouco..."
                : "Registre-se agora"}
            </h2>
            {registerFinalStep && (
              <p className="text-gray-500">
                Estabeleça uma senha para sua conta.
              </p>
            )}
          </div>

          <div className="mt-8 duration-500">
            {currentScreen === "login" ? (
              <LoginForm />
            ) : registerFinalStep ? (
              <PasswordForm onSubmit={() => handleSubmit} />
            ) : (
              <CompanyForm onSubmit={() => setRegisterFinalStep(true)} />
            )}
          </div>
        </div>
        <div className="mt-6 relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Ou{" "}
              <span
                className="cursor-pointer text-blue-700"
                onClick={() => {
                  if (currentScreen === "login") {
                    dispatch(CompaniesActions.removeEditCompany());
                  }
                  setCurrentScreen((state) =>
                    state === "login" ? "register" : "login"
                  );
                }}
              >
                {currentScreen === "login"
                  ? "registre-se"
                  : "entre com sua conta"}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthRegion;
