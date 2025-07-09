import { motion } from "framer-motion";
import { ExternalLink, Github, CheckSquare, ShoppingBag, TrendingUp, Bot, Monitor } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Personal Portfolio Website",
    description: "Built this minimalist portfolio website from scratch using modern web technologies. Features elegant design, smooth animations, responsive layout, and optimized performance to showcase my professional journey.",
    icon: Monitor,
    gradient: "from-slate-50 to-gray-100",
    iconColor: "text-slate-600",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    liveDemo: "#",
    code: "#"
  },
  {
    title: "Full-Stack Rota System",
    description: "A comprehensive rota management system for King's College London Disability Department, eliminating manual scheduling and improving workflow efficiency through automation and real-time synchronization.",
    icon: CheckSquare,
    gradient: "from-blue-50 to-indigo-100",
    iconColor: "text-blue-600",
    technologies: ["Microsoft Power Apps", "SharePoint", "Power Automate", "Office 365"],
    liveDemo: "#",
    code: "#"
  },
  {
    title: "Quantum ML Fraud Detection",
    description: "Dissertation project exploring quantum computing and quantum machine learning for financial fraud detection, comparing quantum support vector machines with classical models.",
    icon: Bot,
    gradient: "from-purple-50 to-pink-100",
    iconColor: "text-purple-600",
    technologies: ["Quantum Computing", "Machine Learning", "Python", "Financial Modeling"],
    liveDemo: "#",
    code: "#"
  },
  {
    title: "NHS Behavioral Prediction App",
    description: "Developed a predictive application for NHS primary care that estimates and predicts patient temperament based on historical behavioral patterns and medication cycles.",
    icon: TrendingUp,
    gradient: "from-green-50 to-teal-100",
    iconColor: "text-green-600",
    technologies: ["Python", "Data Analytics", "Machine Learning", "Healthcare"],
    liveDemo: "#",
    code: "#"
  },
  {
    title: "Vizent Python Library Testing",
    description: "Comprehensive testing of the Vizent Python Library for data entropy and complexity visualization, contributing to projects involving UK National Grid and Transport for London.",
    icon: CheckSquare,
    gradient: "from-orange-50 to-red-100",
    iconColor: "text-orange-600",
    technologies: ["Python", "Data Visualization", "Testing", "Research"],
    liveDemo: "#",
    code: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A selection of work that demonstrates my approach to solving complex design challenges
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:-translate-y-2">
                  <div className={`h-64 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                    <div className="text-center">
                      <Icon className={`h-12 w-12 ${project.iconColor} mb-4 mx-auto`} />
                      <p className="text-muted-foreground">{project.title}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-accent hover:text-accent/80 p-0 h-auto"
                        asChild
                      >
                        <a href={project.liveDemo}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-accent hover:text-accent/80 p-0 h-auto"
                        asChild
                      >
                        <a href={project.code}>
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
