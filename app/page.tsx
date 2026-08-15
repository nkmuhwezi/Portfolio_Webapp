import About from "@/components/About";
import AIInPractice from "@/components/AIInPractice";
import Approach from "@/components/Approach";
import Capabilities from "@/components/Capabilities";
import CareerTrajectory from "@/components/CareerTrajectory";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/ExperienceLazy";
import Hero from "@/components/Hero";
import ImpactMetrics from "@/components/ImpactMetrics";
import Nav from "@/components/Nav";
import OtherSystems from "@/components/OtherSystems";
import SelectedWork from "@/components/SelectedWork";

export default function Home() {
  return (
    <>
      <a className="skipLink" href="#main">
        Skip to content
      </a>

      <Nav />

      <main id="main">
        <Hero />
        <CareerTrajectory />
        <ImpactMetrics />
        <SelectedWork />
        <OtherSystems />
        <Approach />
        <Experience />
        <AIInPractice />
        <About />
        <Education />
        <Capabilities />
        <Contact />
      </main>
    </>
  );
}
