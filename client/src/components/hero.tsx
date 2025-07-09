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
            I'm Kabir, a Physics graduate from King's College London. With a strong academic background in artificial intelligence, quantum computing, and technology-driven problem-solving, I bring leadership and creativity to everything I do. As former President of KCL DJ Society and founder of my own DJ business, I've honed my leadership and creative skills.
          </p>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
            Over the past four years, I've diversified my skillset. I've worked as a Python developer and project manager, creating entirely new systems for institutions. I've also gained a rigorous academic experience through my dissertation, which focusses on Quantum Mechanics and Financial Fraud. In my dissertation, I developed a Machine Learning Algorithm on a Quantum Computer to detect fraudulent transactions, aiming to bridge cutting-edge physics with practical application.
          </p>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
            I'm passionate about how physics and first principles thinking, combined with a creative approach, can be applied to all fields. I place a particular importance on communicating what I learn clearly to all types of audiences and building a well rounded character that will carry me to a fruitful career.
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
