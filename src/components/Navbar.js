import React, { useState } from "react";

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
            <li><a href="#Home">Home</a></li>
            <li><a href="#About">About</a></li>
            <li><a href="#Service">Service</a></li>
            <li><a href="#Skills">Skills</a></li>
            <li><a href="#Project">Project</a></li>
            <li><a href="#Reviews">Reviews</a></li>
            <li><a href="#Contact">Contact</a></li>
            <li className="mobile-DFM"><a href="#">DFM</a></li>
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
