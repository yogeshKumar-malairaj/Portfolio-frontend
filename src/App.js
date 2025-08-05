import React from "react";
import Navbar from "./components/Navbar"; 
import Home from "./sections/Home";
import SkillsAnim from "./sections/SkillAnime";
import About from "./sections/About";
import Services from "./sections/Services";
import SkillsGrid from "./sections/Skills";
import HireMe from "./sections/HireMe";
import Projects from "./sections/Projects";
import Reviews from "./sections/Reviews";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";




function App() {
  return (
    <div>
      <Navbar />
      <Home/>
      <SkillsAnim />
      <About />
      <Services />
      <SkillsGrid />
      <HireMe />
      <Projects />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
