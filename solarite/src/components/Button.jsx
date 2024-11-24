import PropTypes from "prop-types";

export function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-auto px-5 py-2 text-white transition-all duration-500 rounded-full bg-sky-950 hover:bg-transparent hover:border border-sky-950 hover:text-black"
    >
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func
};
