import React, { useEffect, useState } from "react";
import "../style/Footer.css";

function Footer() {
  const [footer, setFooter] = useState(null);

  // Load BASE_URL and fetch footer
  useEffect(() => {
    fetch("/config.json")
      .then((res) => res.json())
      .then((config) => {
        fetch(`${config.BASE_URL}/api/footer`)
          .then((res) => res.json())
          .then((data) => setFooter(data))
          .catch((err) => console.error("Footer fetch failed:", err));
      })
      .catch((err) => console.error("Failed to load config.json:", err));
  }, []);

  if (!footer) {
    return (
      <footer className="footer">
        <div className="footer-container">
          <p>Loading footer...</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1: About */}
        <div className="footer-column">
          <h3>Yogesh</h3>
          <p style={{ color: "#e2e8f0", lineHeight: 1.6 }}>
            Full stack developer specializing in modern web technologies and creating exceptional digital experiences.
          </p>
          <div className="footer-social">
            <a href={footer.github_link}><i className="fab fa-github"></i></a>
            <a href={footer.linkedin_link}><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#Home"><i className="fas fa-chevron-right"></i> Home</a></li>
            <li><a href="#About"><i className="fas fa-chevron-right"></i> About</a></li>
            <li><a href="#Service"><i className="fas fa-chevron-right"></i> Services</a></li>
            <li><a href="#Projects"><i className="fas fa-chevron-right"></i> Portfolio</a></li>
            <li><a href="#Contact"><i className="fas fa-chevron-right"></i> Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="footer-column footer-contact">
          <h3>Contact Info</h3>
          <p><i className="fas fa-map-marker-alt"></i> {footer.location}</p>
          <p><i className="fas fa-envelope"></i> {footer.email}</p>
          <p><i className="fas fa-phone-alt"></i> {footer.mobile}</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Yogesh. All Rights Reserved. | Designed with ❤️ by Yogesh</p>
      </div>
    </footer>
  );
}

export default Footer;
