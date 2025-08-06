import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function About() {
  const [aboutData, setAboutData] = useState(null);
  const [BASE_URL, setBaseUrl] = useState("");

  useEffect(() => {
    fetch("/config.json")
      .then((res) => res.json())
      .then((config) => {
        setBaseUrl(config.BASE_URL);
      });
  }, []);

  useEffect(() => {
    if (BASE_URL) {
      fetch(`${BASE_URL}/api/about`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setAboutData(data);
          }
        })
        .catch((err) => console.error("Failed to fetch About data:", err));
    }
  }, [BASE_URL]);

  return (
    <section className="section About" id="About">
      <motion.div 
        className="sec-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Me
      </motion.div>

      <div className="About-right">
        {aboutData?.about_image_url ? (
          <motion.img
            src={`${BASE_URL}${aboutData.about_image_url}`}
            alt="About"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          />
        ) : (
          <p>Loading image...</p>
        )}
      </div>

      <div className="About-left">
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {aboutData?.title || "Loading title..."}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {aboutData?.description || "Loading description..."}
        </motion.p>

        <table>
          <tbody>
            <tr>
              <td><strong>Name:</strong></td>
              <td>{aboutData?.name || "Loading..."}</td>
            </tr>
            <tr>
              <td><strong>Email:</strong></td>
              <td>{aboutData?.email || "Loading..."}</td>
            </tr>
            <tr>
              <td><strong>Date of Birth:</strong></td>
              <td>{aboutData?.dob || "Loading..."}</td>
            </tr>
            <tr>
              <td><strong>Address:</strong></td>
              <td>{aboutData?.address?.split(',').map((line, i) => (
                <div key={i}>{line.trim()}</div>
              ))}</td>
            </tr>
          </tbody>
        </table>

        <div className="btn-link">
          <a href="#Contact">
            <button>Hire Me</button>
          </a>
          {aboutData?.CV_link && (
            <a href={aboutData.cv_link} target="_blank" rel="noopener noreferrer">
              <button>Download CV</button>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default About;


