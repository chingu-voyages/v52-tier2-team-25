import PropTypes from "prop-types";

export function SecondaryButton({ label }) {
  return (
    <button className="more bg-transparent text-white rounded-full px-5 py-2 hover:bg-white border hover:text-black transition-all duration-500">
      {label}
    </button>
  );
}

SecondaryButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
