import PropTypes from "prop-types";
import { useFormContext } from "@/context/FormContext";

export const SignUpInput = ({ label, name, type, required }) => {
  const { handleChangeValues, values, errors, handleBlur } = useFormContext();

  return (
    <div
      className={`flex flex-col gap-2 ${errors[name] ? "text-red-500" : ""}`}
    >
      <label className="text-sm sm:text-base md:text-lg">{label}</label>
      <input
        required={required}
        name={name}
        type={type}
        onChange={handleChangeValues}
        value={values[name]}
        onBlur={(e) => handleBlur(name, e.target.value)}
        className={`p-2 bg-white rounded border-0 ring-0 text-black text-md focus:outline-none 
          focus:ring-0 focus:border-0 ${errors[name] ? "border-red-500" : ""}`}
        autoComplete="address-line1"
      />
      {errors[name] && (
        <span className="text-sm text-red-500">{errors[name]}</span>
      )}
    </div>
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
