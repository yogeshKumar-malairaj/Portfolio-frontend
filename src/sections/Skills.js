import React, { useEffect, useState } from "react";
import "../style/skills.css";

function SkillsGrid() {
  const [skills, setSkills] = useState([]);
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    // Load API URL from public/config.json
    fetch("/config.json")
      .then((res) => res.json())
      .then((config) => {
        const apiUrl = config.BASE_URL;
        setBaseUrl(apiUrl);

        return fetch(`${apiUrl}/api/skills`);
      })
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((err) => console.error("Failed to load skills:", err));
  }, []);

  return (
    <section className="skills section" id="Skills">
      <h2 className="sec-title">Technical Skills</h2>

      <div className="skills-grid">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <div className="skill-card" key={index}>
              <div className="skill-icon">
                <i className={skill.icon || "fas fa-code"}></i>
              </div>
              <div className="skill-title">{skill.name || "Unnamed Skill"}</div>

              <div className="progress-wrapper">
                <div className="progress-label">
                  <span>{skill.description || "Proficiency"}</span>
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
          <p className="loading-text">Loading skills...</p>
        )}
      </div>
    </section>
  );
}

export default SkillsGrid;
