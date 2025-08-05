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
            <li><a href="/#home"><Link to="/">Home</Link></a></li>
            <li><a href="/#about">About</a></li>
            <li><a href="/#services">Service</a></li>
            <li><a href="/#skills">Skills</a></li>
            <li><a href="/#projects">Project</a></li>
            <li><a href="/#reviews">Reviews</a></li>
            <li><a href="/#contact">Contact</a></li>
            <li className="mobile-DFM"><a href="/#dfm">DFM</a></li>
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


