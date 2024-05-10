import React from "react";
import Navigation from "./Components/navigation";
import Banner from "./Components/Banner";
import About from "./Components/About";
import Achievements from "./Components/Achievements";
import Education from "./Components/Education";
import Experience from "./Components/Experience";
import Contact from "./Components/Contact";

function App() {
  return (
    <div className="">
      <Navigation />
      <Banner />
      <About />
      <Education />
      <Experience />
      <Achievements />
      <Contact />
    </div>
  );
}

export default App;
