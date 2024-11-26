import PropTypes from "prop-types";
import { useFormContext } from "../context/FormContext";

export const Input = ({ label, name, type, required, onChange, value }) => {
  const context = useFormContext();
  console.log(context);
  const inputValue = value !== undefined ? value : context?.values[name];
  const handleChange = onChange || context?.handleChangeValues;
  return (
    <span className="flex flex-col gap-2">
      <label className="text-[1.1em]">{label}</label>
      <input
        required={required}
        name={name}
        type={type}
        onChange={handleChange}
        value={inputValue}
        className="p-2 bg-white rounded border-0 ring-0 text-md focus:outline-none focus:ring-0 focus:border-0"
      />
    </span>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
};
