import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../style/Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    fetch("/config.json")
      .then((res) => res.json())
      .then((config) => {
        setBaseUrl(config.BASE_URL);
        return fetch(`${config.BASE_URL}/api/projects`);
      })
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Failed to fetch projects", err));
  }, []);

  const handleFilter = (category) => {
    setActiveFilter(category);
  };

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "all") return true;
    return p.tech_stack.toLowerCase().includes(activeFilter);
  });

  return (
    <section className="section Projects" id="Project">
      <motion.div
        className="sec-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </motion.div>

      <motion.div
        className="project-filters"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {["all", "web", "design", "mobile", "python"].map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
            onClick={() => handleFilter(filter)}
          >
            {filter === "all"
              ? "All"
              : filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </motion.div>

      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <motion.div
            className="project-card"
            key={index}
            data-category={activeFilter}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="project-img">
              <img
                src={
                  project.image_url
                    ? `${baseUrl}${project.image_url}`
                    : "https://via.placeholder.com/600x400"
                }
                alt={project.title}
              />
              <div className="project-links">
                {project.demo_link && (
                  <a
                    href={project.demo_link}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link"
                  >
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                )}
                {project.github_link && (
                  <a
                    href={project.github_link}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link"
                  >
                    <i className="fas fa-code"></i>
                  </a>
                )}
              </div>
            </div>
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tech_stack.split(",").map((tag, idx) => (
                  <span key={idx}>{tag.trim()}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="view-more"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <button className="view-more-btn">
          View More Projects <i className="fas fa-arrow-right"></i>
        </button>
      </motion.div>
    </section>
  );
}

export default Projects;
