import { motion } from "framer-motion";
import { Calendar, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const education = [
  {
    degree: "Bachelor of Science in Physics",
    institution: "King's College London",
    period: "2021 - 2025",
    description: "Pursuing degree with additional level 5 Introduction to Artificial Intelligence & level 6 Artificial Intelligence Decision Making and Planning modules. Dissertation: 'Exploring Quantum Computing and Quantum Machine Learning for Financial Fraud Detection: A Comparative Study of Quantum Support Vector Machines and Classical Models'",
    skills: ["Artificial Intelligence", "Quantum Computing", "Physics", "Machine Learning", "Financial Modeling"]
  }
];

export default function Academic() {
  return (
    <section id="academic" className="py-20 px-6 bg-muted">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Academic Background</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My educational journey has shaped my approach to design and problem-solving
          </p>
        </motion.div>
        
        <div className="space-y-8">
          {education.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold mb-2">{item.degree}</h3>
                      <p className="text-lg text-muted-foreground">{item.institution}</p>
                    </div>
                    <div className="flex items-center text-muted-foreground mt-2 md:mt-0">
                      <Calendar className="h-4 w-4 mr-2" />
                      {item.period}
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill, skillIndex) => (
                      <Badge 
                        key={skillIndex} 
                        variant="secondary" 
                        className="bg-accent/10 text-accent hover:bg-accent/20"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
