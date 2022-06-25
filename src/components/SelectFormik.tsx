import { Field, useFormikContext } from "formik";
import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

interface Item {
  id: number | string;
  label: string;
}

interface Props {
  data: Item[];
  autoFocus?: any;
  name: string;
  label?: string;
  width?: number;
  placeholder?: string;
  disableErrorMessage?: boolean;
  description?: string;
  mask?: string;
  descriptionMarginBottom?: number;
  vertical?: boolean;
  required?: boolean;
}

const SelectFormik: React.FC<Props> = ({
  autoFocus,
  data,
  name,
  label,
  placeholder,
  disableErrorMessage,
  description,
  required,
}) => {
  const { values, errors, touched, setFieldValue, setErrors } =
    useFormikContext<any>();
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

  return (
    <>
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-300">*</span>}
        </label>
      )}
      <div className={`${error ? "" : "pb-6"} relative flex`}>
        <Field
          className={`${
            error ? "border-red-300" : "border-gray-300"
          } appearance-none block w-full px-3 py-2 border text-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          as="select"
          name={name}
          error={!disableErrorMessage ? error : undefined}
          ref={inputRef}
          onFocus={() => {
            setFocus(true);
            const newErrors = { ...errors };
            delete newErrors[name];
            setErrors(newErrors);
          }}
          onBlur={() => setFocus(false)}
          value={values[name]}
          placeholder={placeholder}
        >
          <>
            <option value="" selected={values[name] ? true : false}>
              Selecione
            </option>

            {data &&
              data.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
          </>
        </Field>
        <FaChevronDown color={"#989898"} className="absolute right-3 top-3" />
      </div>
      {error || description ? (
        <div className="text-red-300 text-xs pb-2">{`${
          error || description
        }`}</div>
      ) : null}
    </>
  );
};

export default SelectFormik;
