import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import StarryBackground from "./components/StarryBackground";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import ChatBot from "./components/ChatBot";

export default function Home() {
  return (
    <main className="relative">
      <ScrollProgress />
      <StarryBackground />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
      <ChatBot />
    </main>
  );
}