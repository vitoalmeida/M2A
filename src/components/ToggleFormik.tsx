/* This example requires Tailwind CSS v2.0+ */
import { useEffect, useRef, useState } from "react";
import { Switch } from "@headlessui/react";
import { useFormikContext } from "formik";
import { IoCloseSharp } from "react-icons/io5";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  autoFocus?: any;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
}

const ToggleFormik: React.FC<Props> = ({
  autoFocus,
  name,
  label,
  placeholder,
  description,
  disabled,
}) => {
  const { values, errors, touched, setFieldValue, setErrors } =
    useFormikContext<any>();
  const [enabled, setEnabled] = useState(values.bool_master);
  const [focus, setFocus] = useState<boolean>(false);

  const error = errors[name];
  const showError = touched[name] && !!error;

  const inputRef = useRef<any>(null);

  const onFocusHandler = () => {
    inputRef.current && inputRef.current.focus();
  };

  useEffect(() => {
    if (autoFocus) onFocusHandler();
  }, []);

  function handleChangeValue() {
    setErrors({});
    setEnabled(!enabled);
    setFieldValue(name, !enabled);
  }
  return (
    <>
      <Switch.Group
        as="div"
        className="flex relative items-center justify-between col-span-12"
      >
        {/* <div className="z-50 absolute -ml-2  glass w-[103%] h-[120%]"></div> */}
        <span className="flex-grow flex flex-col">
          <Switch.Label
            as="span"
            className="text-sm font-medium text-gray-900 whitespace-nowrap"
            passive
          >
            {label}
          </Switch.Label>
          <Switch.Description
            as="span"
            className="text-sm text-gray-500 whitespace-nowrap"
          >
            É uma empresa que contém demais empresas asociadas.
          </Switch.Description>
        </span>
        <Switch
          disabled={disabled}
          checked={enabled}
          onChange={handleChangeValue}
          className={classNames(
            enabled ? "bg-indigo-600" : "bg-gray-200",
            "relative right-0 inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none"
          )}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={classNames(
              enabled ? "translate-x-5" : "translate-x-0",
              disabled ? "bg-gray-100" : "",
              "flex pointer-events-none justify-center items-center h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
            )}
          >
            {disabled && (
              <IoCloseSharp className={`${disabled ? "text-red-300" : ""}`} />
            )}
          </span>
        </Switch>
      </Switch.Group>
    </>
  );
};

export default ToggleFormik;
