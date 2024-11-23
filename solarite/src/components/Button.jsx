import PropTypes from "prop-types";

export function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-sky-950 text-white rounded-full w-auto px-5 py-2 hover:bg-transparent hover:border border-sky-950 hover:text-black transition-all duration-500"
    >
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
