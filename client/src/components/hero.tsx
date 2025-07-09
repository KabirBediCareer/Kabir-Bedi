import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Kabir Bedi
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Physics Graduate, Software Development Project Lead
          </p>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
            I'm Kabir—a Physics graduate from King's College London specializing in AI, quantum computing, and tech-driven problem solving. I pair rigorous analytical skill with creative leadership, sharpened as President of the KCL DJ Society and founder of a thriving DJ business. Over the past four years I've engineered full-stack systems as a Python developer and project manager, and my dissertation merged quantum mechanics with finance by training a quantum-powered machine-learning model to detect fraud. I tackle challenges from first principles, communicate complex ideas in plain language, and keep building a well-rounded perspective that fuels innovative, real-world solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Button
              size="lg"
              onClick={() => handleNavClick("#projects")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3"
            >
              View My Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleNavClick("#contact")}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3"
            >
              Get in Touch
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
