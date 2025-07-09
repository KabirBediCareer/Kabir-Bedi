import { motion } from "framer-motion";
import { Briefcase, Palette, Code, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    title: "Full-Stack Rota System Developer",
    company: "King's College London Disability Department",
    period: "01/25 - Present",
    description: "Designed and developed a full-stack rota system using Microsoft Power Apps, SharePoint, and Power Automate. Secured funding grant after successfully pitching the project. Automated shift creation, tracking, and communication, eliminating manual scheduling while ensuring GDPR compliance.",
    skills: ["Microsoft Power Apps", "SharePoint", "Power Automate", "Full-Stack Development", "GDPR Compliance"],
    icon: Code
  },
  {
    title: "DJ & AV Business Owner",
    company: "Self-Employed",
    period: "01/24 - Present",
    description: "Founded and managed a team of DJs across London, coordinating events including corporate functions, formal events for large companies, and live classical performances. Performed confidently in front of over 1,000 people, provided professional sound services for charity events, and secured contracts with major London universities. This experience developed the confidence and integrity I bring to professional challenges.",
    skills: ["Business Management", "Event Coordination", "Team Leadership", "Financial Management"],
    icon: Briefcase
  },
  {
    title: "Python Coder",
    company: "Centre for Urban Science and Progress (CUSP)",
    period: "05/23 - 08/23",
    description: "Tested the Vizent Python Library developed by King's College London and CUSP London, which visualizes data entropy and complexity. Developed comprehensive test cases and contributed to projects involving UK National Grid, Transport for London, and international research collaborations.",
    skills: ["Python", "Data Visualization", "Testing", "Research"],
    icon: Code
  },
  {
    title: "KCL DJ Society President",
    company: "King's College London",
    period: "09/23 - 09/24",
    description: "Led a vibrant community of over 800 members, promoting artistic expression and social connection through electronic music. Organized high-quality events with meticulous planning, performed confidently in front of over 1,000 people, and successfully raised over £4,000 for multiple key charities. This experience built the confidence and integrity I bring to professional environments.",
    skills: ["Leadership", "Event Management", "Fundraising", "Community Building"],
    icon: Palette
  },
  {
    title: "Neuroscience Research Assistant",
    company: "Institute of Psychology, Psychiatry and Neurosciences",
    period: "11/23 - 11/24",
    description: "Provided disability support to a PhD student researching MicroFA scanning of the brain. Worked in an intellectually stimulating environment that deepened understanding of Physics, Computer Science, and Biology, paving the way toward a career integrating AI, Quantum Physics, and healthcare.",
    skills: ["Neuroscience", "Research Support", "Interdisciplinary Collaboration"],
    icon: Briefcase
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-6 bg-muted">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Professional Experience</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My journey through various roles that have shaped my expertise in design and technology
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <div className="bg-accent/10 p-3 rounded-lg">
                        <Icon className="text-accent h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                          <div>
                            <h3 className="text-2xl font-semibold">{exp.title}</h3>
                            <p className="text-lg text-muted-foreground">{exp.company}</p>
                          </div>
                          <div className="flex items-center text-muted-foreground mt-2 md:mt-0">
                            <Calendar className="h-4 w-4 mr-2" />
                            {exp.period}
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, skillIndex) => (
                            <Badge 
                              key={skillIndex} 
                              variant="secondary" 
                              className="bg-accent/10 text-accent hover:bg-accent/20"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
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
