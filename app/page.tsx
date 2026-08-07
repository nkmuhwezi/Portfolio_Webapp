import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Profile from "@/components/Profile";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <>
      <a className="skipLink" href="#profile">
        Skip to content
      </a>

      <Nav />

      <main id="main">
        <Hero />
        <Profile />
        <Experience />
        <Education />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
