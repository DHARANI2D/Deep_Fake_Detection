// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import "./Nav.css";
const Navbar = () => {
  return (
    <nav>
      <ul>
        <li style={{float:"left"}}>
          <Link to="/">Video Analyzer</Link>
        </li><center>
        <li style={{marginLeft:"450px"}}>
          <Link to="/audio">Audio Analyzer</Link>
        </li></center>
        <li style={{marginLeft:"450px"}}>
          <Link to="/text">Text Analyzer</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
