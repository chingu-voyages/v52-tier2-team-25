import { FaCheckCircle } from "react-icons/fa";
import { BiSolidErrorCircle } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import PropTypes from "prop-types";

export function Toast({ message, isSuccess }) {
  return (
    <div className="flex items-center justify-between w-96 h-auto p-3 bg-white rounded-sm">
      <div id="icon--wrapper">
        {isSuccess ? (
            <FaCheckCircle style={{color: "#22c55e", fontSize: "1.5em"}}/>
        ) : (
            <BiSolidErrorCircle style={{color: "#ef4444", fontSize: "1.5em"}}/>
        )}
      </div>

      <div id="msg--wrapper">{message}</div>

      <div id="close--wrapper">
        <IoIosClose className="text-2xl cursor-pointer"/>
      </div>
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  isSuccess: PropTypes.element
};
