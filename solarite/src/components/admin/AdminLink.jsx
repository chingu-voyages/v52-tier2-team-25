import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const AdminLink = ({ url, link }) => {
  return (
    <NavLink to={url} className="text-white font-bold hover:text-blue-200">
      {link}
    </NavLink>
  );
};

export default AdminLink;

AdminLink.propTypes = {
  url: PropTypes.string,
  link: PropTypes.string,
};
