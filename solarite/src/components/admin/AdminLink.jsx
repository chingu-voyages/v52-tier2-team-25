import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const AdminLink = ({ url, link, toggleSidebar }) => {
  return (
    <NavLink
      to={url}
      className="text-white font-bold hover:text-blue-200"
      onClick={toggleSidebar}
    >
      {link}
    </NavLink>
  );
};

export default AdminLink;

AdminLink.propTypes = {
  url: PropTypes.string,
  link: PropTypes.string,
};
