import PropTypes from "prop-types";

export function Card({ title }) {
  return (
    <div
      title={title}
      className="w-96 h-96 text-white bg-sky-100 rounded-full flex justify-center items-center hover:bg-amber-400 hover:w-80 hover:h-80"
    >
      <h3 className="text-2xl text-sky-950 font-semibold">{title}</h3>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
};
