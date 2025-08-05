import React, { useState } from "react";
import { Link } from 'react-router-dom';


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <h1>Portfolio</h1>
        </div>

        <div className={`pages ${isOpen ? "active" : ""}`}>
          <ul className="nav-links">
            <li><a href="/"><Link to="/">Home</Link></a></li>
            <li><a href="/">About</a></li>
            <li><a href="/">Service</a></li>
            <li><a href="/">Skills</a></li>
            <li><a href="/">Project</a></li>
            <li><a href="/">Reviews</a></li>
            <li><a href="/">Contact</a></li>
            <li className="mobile-DFM"><a href="/">DFM</a></li>
          </ul>
        </div>

        <div className="DFM">
          <a href="#">DFM</a>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

