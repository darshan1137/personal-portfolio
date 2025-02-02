import React, { useRef } from "react";
import Navigation from "./Components/navigation";
import Banner from "./Components/Banner";
import About from "./Components/About";
import Achievements from "./Components/Achievements";
import Education from "./Components/Education";
import Experience from "./Components/Experience";
import Contact from "./Components/Contact";
import Projects from "./Components/Projects";
import ScrollToTopButton from "./Components/ScrollToTopButton";

function App() {
  return (
    <div className="">
      <ScrollToTopButton />
      <Navigation />
      <Banner />
      <About />
      <Education />
      <Experience />
      <Achievements />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
