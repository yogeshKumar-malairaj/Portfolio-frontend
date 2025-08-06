import React, { useEffect, useState } from "react";
import "../style/skills.css";

function SkillsGrid() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/config.json")
      .then((res) => res.json())
      .then((config) => {
        const apiUrl = config.BASE_URL;
        return fetch(`${apiUrl}/api/skills`);
      })
      .then((res) => res.json())
      .then((data) => {
        setSkills(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load skills:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="skills section" id="Skills">
      <h2 className="sec-title">Technical Skills</h2>

      <div className="skills-grid">
        {loading ? (
          <p className="loading-text">Loading skills...</p>
        ) : skills.length > 0 ? (
          skills.map((skill, index) => (
            <div className="skill-card" key={index}>
              <div className="skill-icon">
                <i className={skill.icon || "fas fa-code"}></i>
              </div>
              <div className="skill-title">{skill.name}</div>
              <div className="skill-desc">{skill.description}</div>
              <div className="progress-wrapper">
                <div className="progress-label">
                  <span>{skill.description}</span>
                  <span>{skill.level || 0}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${skill.level || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No skills found.</p>
        )}
      </div>
    </section>
  );
}

export default SkillsGrid;
