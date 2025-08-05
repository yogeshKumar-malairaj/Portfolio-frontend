import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../style/Reviews.css";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    rating: 0,
    message: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    fetch("/config.json")
      .then((res) => res.json())
      .then((config) => {
        setBaseUrl(config.BASE_URL);
        return fetch(`${config.BASE_URL}/api/reviews`);
      })
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRating = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    fetch(`${baseUrl}/api/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        role: formData.role,
        rating: formData.rating,
        message: formData.message,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return setError(data.error);
        setSuccess("Review submitted successfully!");
        setFormData({
          name: "",
          email: "",
          role: "",
          rating: 0,
          message: "",
        });
      })
      .catch(() => setError("Failed to submit review"));
  };

  return (
    <section className="section Reviews" id="Reviews">
      <motion.div
        className="sec-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Client Testimonials
      </motion.div>

      <div className="reviews-container">
        {/* Reviews */}
        <motion.div
          className="r-con"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3>Client Satisfactions</h3>
          <div className="reviews-track">
            {reviews.map((r, i) => (
              <motion.div
                className="review-card"
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <div className="review-header">
                  <i className="fas fa-user-tie"></i>
                  <div>
                    <h4>{r.name}</h4>
                    <p>{r.created_at}</p>
                    <div className="stars">
                      {"★".repeat(r.rating)}
                      {"☆".repeat(5 - r.rating)}
                    </div>
                  </div>
                </div>
                <p className="review-text">"{r.message}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Review Form */}
        <motion.div
          className="review-form"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3>Post a Review</h3>
          <form onSubmit={handleSubmit}>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email Address"
              required
            />
            <input
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Company / Role"
              required
            />

            <div className="star-rating">
              {[5, 4, 3, 2, 1].map((r) => (
                <React.Fragment key={r}>
                  <input
                    type="radio"
                    id={`star${r}`}
                    name="rating"
                    value={r}
                    checked={formData.rating === r}
                    onChange={() => handleRating(r)}
                  />
                  <label htmlFor={`star${r}`} title={`${r} stars`}>
                    ★
                  </label>
                </React.Fragment>
              ))}
            </div>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your feedback..."
              required
            ></textarea>

            <button type="submit">Submit Review</button>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default Reviews;
