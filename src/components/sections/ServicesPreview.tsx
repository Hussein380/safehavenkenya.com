import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Brain, GraduationCap, Users, Calendar, Building, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Brain,
    title: "Mental Health & Wellness",
    description: "Psychoeducation, stress management, trauma-awareness, and wellness consultations for individuals and communities.",
    color: "bg-primary",
  },
  {
    icon: GraduationCap,
    title: "Training & Capacity Building",
    description: "Leadership development, public speaking, team building, and professional skills training programs.",
    color: "bg-accent",
  },
  {
    icon: Users,
    title: "Community Empowerment",
    description: "Women & youth empowerment, parenting programs, GBV awareness, and mentorship initiatives.",
    color: "bg-teal-light",
  },
  {
    icon: Calendar,
    title: "Event Consultancy",
    description: "Event planning, program design, MC services, and sponsorship proposal writing for impactful events.",
    color: "bg-gold",
  },
  {
    icon: Building,
    title: "Organizational Consultancy",
    description: "Capacity development for NGOs and institutions, staff wellness programs, and M&E support.",
    color: "bg-primary",
  },
];

export const ServicesPreview = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent font-medium text-sm tracking-wider uppercase">
            What We Offer
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
            Mental Health-Centered Services
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Comprehensive programs centered on mental wellness, designed to empower individuals, 
            teams, and communities on their journey to healing and growth.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="card-elevated h-full flex flex-col hover:border-primary/20 border border-transparent">
                <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-5`}>
                  <service.icon size={28} className="text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-1">
                  {service.description}
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center text-primary font-medium mt-4 text-sm group-hover:gap-2 transition-all"
                >
                  Learn more
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Button asChild variant="default" size="lg">
            <Link to="/services">View All Services</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
