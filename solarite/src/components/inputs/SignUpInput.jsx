import PropTypes from "prop-types";
import { useFormContext } from "@/context/FormContext";

export const SignUpInput = ({ label, name, type, required }) => {
  const { handleChangeValues, values } = useFormContext();

  return (
    <span className="flex flex-col gap-2">
      <label className="text-[1.1em]">{label}</label>
      <input
        required={required}
        name={name}
        type={type}
        onChange={handleChangeValues}
        value={values[name]}
        className="p-2 bg-white rounded border-0 ring-0 text-md focus:outline-none focus:ring-0 focus:border-0"
      />
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
};
