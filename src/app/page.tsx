import Hero from "@/components/Hero";
import Education from "@/components/Education";
import AboutMe from "@/components/AboutMe";
import Stack from "@/components/Stack";
import Experience from "@/components/Experience";
import Achievements from "@/components/Achievements";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutMe />
      <Education />
      <Stack />
      <Experience />
      <Achievements />
      <Projects />
      <Testimonials />
      <ContactForm />
    </>
  );
}
