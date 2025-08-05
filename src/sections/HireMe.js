import React, { useState, useEffect } from "react";
import "../style/HireMe.css";

function HireMe() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "",
    message: ""
  });

  const [status, setStatus] = useState("");
  const [baseUrl, setBaseUrl] = useState("");

  // Load config.json on component mount
  useEffect(() => {
    fetch("/config.json")
      .then((res) => res.json())
      .then((config) => setBaseUrl(config.BASE_URL))
      .catch((err) => console.error("Failed to load config:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!baseUrl) {
      setStatus("⚠️ Backend URL not loaded.");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Thanks for your inquiry!");
        setForm({ name: "", email: "", type: "", message: "" });
      } else {
        setStatus(data.error || "❌ Failed to send message.");
      }
    } catch (error) {
      console.error("Form submission failed:", error);
      setStatus("❌ Network or server error.");
    }
  };

  return (
    <section className="Hire-Me" id="Contact">
      <div className="hire-container">
        <div className="hire-left">
          <div className="availability-badge">
            <div className="pulse-dot"></div>
            <span>Available for Freelance Projects</span>
          </div>

          <h2>Let's Build Something Amazing Together</h2>
          <p className="subtext">
            I'm ready to bring your ideas to life. Tell me about your project vision and preferences, and let's create something extraordinary.
          </p>

          <div className="project-story">
            <div className="story-icon">
              <i className="fas fa-lightbulb"></i>
            </div>
            <div className="story-content">
              <h3>Your Project Story</h3>
              <p>
                Every great project starts with a story. Share yours and I'll help craft the perfect digital solution tailored to your needs.
              </p>
            </div>
          </div>

          <button className="hire-btn pulse">
            <i className="fas fa-paper-plane"></i> Hire Me Now
          </button>
        </div>

        <div className="hire-right">
          <div className="project-form">
            <h3>Project Inquiry</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  value={form.name}
                  onChange={handleChange}
                />
                <i className="fas fa-user"></i>
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
                <i className="fas fa-envelope"></i>
              </div>

              <div className="form-group">
                <select
                  name="type"
                  required
                  value={form.type}
                  onChange={handleChange}
                >
                  <option value="" disabled>Project Type</option>
                  <option>Web Development</option>
                  <option>UI/UX Design</option>
                  <option>Full Stack Project</option>
                  <option>Consultation</option>
                  <option>Other</option>
                </select>
                <i className="fas fa-folder"></i>
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Tell me about your project..."
                  rows="4"
                  required
                  value={form.message}
                  onChange={handleChange}
                ></textarea>
                <i className="fas fa-comment-dots"></i>
              </div>

              <button type="submit" className="submit-btn">
                <i className="fas fa-rocket"></i> Send Project Details
              </button>

              {status && <p className="form-status">{status}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HireMe;
