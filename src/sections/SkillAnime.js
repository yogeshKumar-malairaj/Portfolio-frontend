import React from "react";

function SkillsAnim() {
  return (
    <section className="skill-anim" id="Skills">
      <div className="skills-container">
        <ul className="skills-track">
          <li><i className="fab fa-html5"></i> HTML</li>
          <li><i className="fab fa-css3-alt"></i> CSS</li>
          <li><i className="fab fa-js-square"></i> JavaScript</li>
          <li><i className="fab fa-react"></i> React</li>
          <li><i className="fab fa-python"></i> Python</li>
          <li><i className="fas fa-database"></i> SQL</li>
          <li><i className="fab fa-git-alt"></i> Git</li>
          <li><i className="fas fa-memory"></i> Redis</li>

          {/* Duplicated items for smooth loop */}
          <li><i className="fab fa-html5"></i> HTML</li>
          <li><i className="fab fa-css3-alt"></i> CSS</li>
          <li><i className="fab fa-js-square"></i> JavaScript</li>
          <li><i className="fab fa-react"></i> React</li>
          <li><i className="fab fa-python"></i> Python</li>
          <li><i className="fas fa-database"></i> SQL</li>
          <li><i className="fab fa-git-alt"></i> Git</li>
          <li><i className="fas fa-memory"></i> Redis</li>
        </ul>
      </div>
    </section>
  );
}

export default SkillsAnim;
