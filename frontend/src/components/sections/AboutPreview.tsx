import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Users, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Heart,
    title: "Empowerment",
    description: "Building confidence and capability in every individual we serve.",
  },
  {
    icon: Shield,
    title: "Trust & Confidentiality",
    description: "Creating safe spaces where you can openly share and grow.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Fostering connections that support lasting transformation.",
  },
  {
    icon: Sparkles,
    title: "Integrity",
    description: "Committed to excellence and ethical practice in all we do.",
  },
];

export const AboutPreview = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-medium text-sm tracking-wider uppercase">
              About Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
              A Haven for Your Personal & Professional Growth
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Safe Haven Consultancy is a wellness and professional empowerment firm 
              dedicated to creating environments where men, women, and youth can access 
              knowledge, healing, and tools to thrive personally and professionally.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our vision is a confident, mentally healthy, empowered community capable 
              of leading meaningful lives. Through consultancy, training, and support 
              services, we address emotional wellbeing, leadership development, and 
              community empowerment.
            </p>
            <Button asChild variant="default">
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </motion.div>

          {/* Right Values Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-elevated group cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <value.icon size={24} className="text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
