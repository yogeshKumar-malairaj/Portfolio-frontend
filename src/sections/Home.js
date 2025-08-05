import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Home() {
  const [data, setData] = useState(null);
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    fetch("/config.json")
      .then((res) => res.json())
      .then((config) => {
        setBaseUrl(config.BASE_URL);
        return fetch(`${config.BASE_URL}/api/welcome`);
      })
      .then((res) => res.json())
      .then((resData) => {
        if (!resData.error) {
          setData(resData);
        }
      })
      .catch((err) => console.error("Error fetching welcome content:", err));
  }, []);

  return (
    <section className="section Home" id="Home">
      <div className="home_content">
        <div className="left">
          <div className="ctn-ali">
            <h4>Hello,</h4>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span>I am</span> {data?.name || "Loading..."}
            </motion.h1>
            <br />
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {data?.title || ""}
            </motion.h3>

            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {data?.sub_title || ""}
            </motion.h3>
            <br />
            <a href="#Contact">
              <button className="Btn-Hire">HIRE</button>
            </a>
          </div>
        </div>

        <div className="right">
          {data?.profile_image_url ? (
            <motion.img
              src={`${baseUrl}${data.profile_image_url}`}
              alt="profile"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Home;
