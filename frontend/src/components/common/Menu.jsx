import React from "react";
import { Link } from "react-router-dom";

const Menu = ({ isOpen, onClose }) => {
  return (
    <div className={`menu w-full h-25 flex flex-row justify-center items-center p-4 gap-20 bg-gray-50 fixed top-0 left-0 transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="button">
        <Link to="/patients-login" >
          <button
            type="button"
            className="border-2 border-gray-500 p-2 bg-white rounded-2xl w-32"
          >
            Patients Login
          </button>
        </Link>
      </div>

      <div className="button">
        <Link to="/doctors-login">
          <button
            type="button"
            className="border-2 border-gray-500 p-2 bg-white rounded-2xl w-32"
          >
            Doctors Login
          </button>
        </Link>
      </div>

      <div className="close-menu absolute top-4 right-9 cursor-pointer" onClick={onClose}>
        <p className="text-5xl">x</p>
      </div>
    </div>
  );
};

export default Menu;
