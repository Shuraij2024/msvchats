// import React from 'react' // Not needed with modern React
import { FaComments } from "react-icons/fa"; // Changed to chat icon
import "./Header.scss";

const Header = () => {
  return (
    <header>
      <div className="Countainer">
        <h1>MSv Chats</h1>
        <FaComments size={32} /> {/* Replaced FaShoppingCart with FaComments */}
      </div>
    </header>
  );
};

export default Header;