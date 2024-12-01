import PropTypes from "prop-types";
import { useFormContext } from "@/context/FormContext";

export const SignUpInput = ({ label, name, type, required, setInput }) => {
  const { handleChangeValues, values, errors, handleBlur } = useFormContext();

  return (
    <span
      className={`flex flex-col gap-2 ${errors[name] ? "text-red-500" : ""}`}
    >
      <label className="text-[1.1em]">{label}</label>
      <input
        required={required}
        name={name}
        type={type}
        onChange={(e) => {
          handleChangeValues(e);
          setInput(e.target.value);
        }}
        value={values[name]}
        onBlur={(e) => handleBlur(name, e.target.value)}
        className={`p-2 bg-white rounded border-0 ring-0 text-black text-md focus:outline-none 
          focus:ring-0 focus:border-0 ${errors[name] ? "border-red-500" : ""}`}
      />
      {errors[name] && (
        <span className="text-sm text-red-500">{errors[name]}</span>
      )}
    </span>
  );
};

SignUpInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
  setInput: PropTypes.func,
};
