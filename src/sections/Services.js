import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Load backend URL dynamically from config.json
    fetch("/config.json")
      .then((res) => res.json())
      .then((config) => {
        // Fetch services from backend
        return fetch(`${config.BASE_URL}/api/services`);
      })
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Failed to load services:", err));
  }, []);

  return (
    <section className="section Service" id="Service">
      <motion.div
        className="sec-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        What Can I Do?
      </motion.div>

      <div className="service-content">
        <div className="content-list">
          {services.length > 0 ? (
            services.map((service, index) => (
              <motion.div
                className="service-card"
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.div>
            ))
          ) : (
            <p className="loading-text">Loading services...</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Services;
