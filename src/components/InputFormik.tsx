import { Field, useFormikContext } from "formik";
import React, { useState, useRef, useEffect } from "react";

interface Props {
  autoFocus?: any;
  type?: string;
  name: string;
  label?: string;
  width?: number;
  placeholder?: string;
  disableErrorMessage?: boolean;
  multiline?: boolean;
  secureTextEntry?: boolean;
  description?: string;
  mask?: string;
  descriptionMarginBottom?: number;
  textArea?: boolean;
  required?: boolean;
}

const InputFormik: React.FC<Props> = ({
  required,
  autoFocus,
  name,
  label,
  placeholder,
  disableErrorMessage,
  secureTextEntry,
  description,
  multiline,
  descriptionMarginBottom,
  type,
  textArea,
}) => {
  const { values, errors, touched, setFieldValue, setErrors } =
    useFormikContext<any>();
  const [focus, setFocus] = useState<boolean>(false);
  const [pressed, setPress] = useState<boolean>(false);

  const error = errors[name];
  const showError = touched[name] && !!error;

  const showContent = secureTextEntry && pressed;

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
          {required && <span className="ml-1 text-red-400">*</span>}
        </label>
      )}
      <div className="">
        <Field
          className={`${textArea && "h-24"} ${
            error ? "border-red-400" : "mb-5 border-gray-300"
          } appearance-none block w-full px-3 py-2 border text-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          name={name}
          error={!disableErrorMessage ? error : undefined}
          ref={inputRef}
          onFocus={() => {
            setFocus(true);
            const newErrors = { ...errors };
            delete newErrors[name];
            setErrors(newErrors);
          }}
          type={type}
          onBlur={() => setFocus(false)}
          value={values[name]}
          placeholder={placeholder}
          as={textArea ? "textarea" : "input"}
        />
      </div>
      {error || description ? (
        <div className="text-red-400 text-xs mb-4">{`${
          error || description || ""
        }`}</div>
      ) : null}
    </>
  );
};

export default InputFormik;
