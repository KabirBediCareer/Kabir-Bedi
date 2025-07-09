import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import Academic from "@/components/academic";
import Projects from "@/components/projects";
import Experience from "@/components/experience";
import Personal from "@/components/personal";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <Academic />
      <Projects />
      <Experience />
      <Personal />
      <Contact />
      <Footer />
    </div>
  );
}
