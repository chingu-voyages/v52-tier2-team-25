import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const AdminLink = ({ url, link }) => {
  return (
    <NavLink to={url} className="text-black">
      {link}
    </NavLink>
  );
};

export default AdminLink;

AdminLink.propTypes = {
  url: PropTypes.string,
  link: PropTypes.string,
};
