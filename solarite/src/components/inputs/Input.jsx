import PropTypes from "prop-types";

export const Input = ({ label, name, type, required, onChange, value }) => {
  return (
    <span className="flex flex-col gap-2">
      <label className="text-[1.1em]">{label}</label>
      <input
        required={required}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
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
