import { motion } from "framer-motion";
import { Camera, Mountain, Book, ChefHat, Sprout, Music } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const interests = [
  {
    title: "DJing",
    description: "As former President of KCL DJ Society and founder of my own DJ business, I'm passionate about electronic music and creating memorable experiences through sound. I've organized events for over 800 members and managed professional gigs across London.",
    icon: Music
  },
  {
    title: "Philosophy",
    description: "I have a deep interest in philosophical thinking, exploring questions about consciousness, reality, and the intersection of technology with human experience. This complements my academic work in physics and AI.",
    icon: Book
  },
  {
    title: "Gym & Wellness",
    description: "Maintaining physical fitness is important to me. Regular gym sessions help me stay focused and energized for my academic and professional pursuits.",
    icon: Sprout
  },
  {
    title: "Climbing",
    description: "Rock climbing challenges me both physically and mentally, requiring problem-solving skills and careful planning - qualities that translate well to my work in physics and technology.",
    icon: Mountain
  },
  {
    title: "Martial Arts (BJJ)",
    description: "Brazilian Jiu-Jitsu teaches discipline, strategy, and perseverance. The mental chess game aspect of BJJ complements my analytical thinking in physics and programming.",
    icon: ChefHat
  },
  {
    title: "Art & Theology",
    description: "I'm fascinated by the intersection of art, spirituality, and human expression. These interests provide a creative balance to my technical work and inspire innovative thinking.",
    icon: Camera
  }
];

export default function Personal() {
  return (
    <section id="personal" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Personal Life</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Beyond work, I'm passionate about exploring creativity, staying active, and connecting with the world around me
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {interests.map((interest, index) => {
            const Icon = interest.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <Card className="bg-muted p-8 hover:shadow-md transition-shadow duration-300 h-full">
                  <CardContent className="p-0">
                    <div className="mb-6">
                      <Icon className="h-12 w-12 text-accent mb-4 mx-auto" />
                      <h3 className="text-2xl font-semibold mb-3">{interest.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {interest.description}
                    </p>
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
