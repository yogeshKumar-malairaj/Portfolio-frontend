import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../style/Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [BASE_URL, setBaseUrl] = useState("");

  useEffect(() => {
    fetch("/config.json")
      .then((res) => res.json())
      .then((config) => setBaseUrl(config.BASE_URL))
      .catch(() => setStatus("Failed to load backend config."));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!BASE_URL) {
      setStatus("Backend URL not loaded.");
      return;
    }

    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus(data.error || "Something went wrong.");
    }
  };

  return (
    <section className="section contact" id="Contact">
      <motion.div
        className="sec-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Get in Touch
      </motion.div>

      <div className="contact-dual-container">
        {/* Left - Info */}
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Contact Details</h2>

          <div className="contact-item">
            <div className="contact-icon"><i className="fas fa-envelope"></i></div>
            <div className="contact-details">
              <h4>Email</h4>
              <a href="mailto:hello@example.com">hello@example.com</a>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon"><i className="fas fa-phone-alt"></i></div>
            <div className="contact-details">
              <h4>Phone</h4>
              <a href="tel:+1234567890">+1 (234) 567-890</a>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
            <div className="contact-details">
              <h4>Location</h4>
              <p>Bengaluru, India</p>
            </div>
          </div>

          <div className="social-links">
            <a href="https://github.com/yogeshKumar-malairaj?tab=repositories" className="social-link"><i className="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/m-yogesh-kumar-676400245" className="social-link"><i className="fab fa-linkedin-in"></i></a>
            <a href="https://wa.me/916383512153" className="social-link"><i className="fa-brands fa-whatsapp"></i></a>
          </div>
        </motion.div>

        {/* Right - Form */}
        <motion.div
          className="contact-container"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Contact Form</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              <i className="fas fa-paper-plane"></i> Send Message
            </button>

            {status && <p className="form-status">{status}</p>}
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
