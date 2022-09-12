import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthCard = () => {
  const [currentScreen, setCurrentScreen] = useState("login");

  return (
    <div className="self-center bg-white md:shadow-xl min-h-[45rem] flex max-w-6xl rounded-2xl overflow-hidden duration-500">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 md:px-20 lg:px-20 xl:px-24 duration-500">
        <div className="mx-auto w-full max-w-sm lg:max-w-lg duration-500">
          <div className="flex flex-col items-center">
            <img
              className="h-20 mx-auto w-auto"
              src={require("../../assets/images/logo.png")}
              alt="Workflow"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              {currentScreen === "login"
                ? "Faça login em sua conta"
                : "Registre-se agora"}
            </h2>
          </div>

          <div className="mt-8">
            {currentScreen === "login" ? <LoginForm /> : <RegisterForm />}
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
                onClick={() =>
                  setCurrentScreen((state) =>
                    state === "login" ? "register" : "login"
                  )
                }
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

export default AuthCard;
