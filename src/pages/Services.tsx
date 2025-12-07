import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { CTA } from "@/components/sections/CTA";
import { Button } from "@/components/ui/button";
import { 
  Brain, GraduationCap, Users, Calendar, FileText, Building, BookOpen,
  ArrowRight, CheckCircle, Target, Lightbulb, Heart 
} from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "Mental Health & Wellness Services",
    description: "Creating safe spaces for emotional healing, awareness, and mental wellness across all demographics.",
    features: [
      "Psychoeducation sessions",
      "Stress management training",
      "Trauma-awareness workshops",
      "Emotional intelligence training",
      "Wellness consultations",
      "School mental health programs",
      "Awareness talks for youth, women, and men",
    ],
    color: "bg-primary",
  },
  {
    icon: GraduationCap,
    title: "Training & Capacity Building",
    description: "Empowering individuals and teams with essential skills for personal and professional excellence.",
    features: [
      "Leadership and personal development training",
      "Confidence-building & public speaking classes",
      "Team building sessions",
      "Professional skills training for organizations",
      "Communication & soft skills programs",
      "Motivation and empowerment workshops",
    ],
    color: "bg-accent",
  },
  {
    icon: Users,
    title: "Community Empowerment Programs",
    description: "Uplifting communities through education, mentorship, and collective growth initiatives.",
    features: [
      "Women & youth empowerment initiatives",
      "Parenting programs",
      "Social development projects",
      "GBV awareness and prevention programs",
      "Community dialogues & mentorship spaces",
    ],
    color: "bg-teal-light",
  },
  {
    icon: Calendar,
    title: "Event Consultancy & Program Design",
    description: "Professional event planning and program design for impactful empowerment and wellness events.",
    features: [
      "Event planning for empowerment, cultural & wellness events",
      "Theme development",
      "Program/timetable creation",
      "Script writing for hosts (MCs)",
      "Panel moderation & MC services",
      "Sponsorship proposal writing",
      "Event branding guidance",
    ],
    color: "bg-gold",
  },
  {
    icon: FileText,
    title: "Communication & Content Services",
    description: "Crafting compelling content and communications that inspire action and awareness.",
    features: [
      "Proposal writing",
      "Concept notes & project design",
      "Reports & documentation",
      "Speech writing",
      "Social campaign content",
      "Awareness materials creation (posters/messages)",
    ],
    color: "bg-primary",
  },
  {
    icon: Building,
    title: "Organizational Consultancy",
    description: "Strengthening organizational capabilities through strategic development and wellness integration.",
    features: [
      "Capacity development for NGOs, schools, and institutions",
      "Program development & coaching",
      "Monitoring & evaluation support",
      "Organizational culture improvement",
      "Staff wellness programs",
    ],
    color: "bg-accent",
  },
  {
    icon: BookOpen,
    title: "Educational & School-Based Services",
    description: "Nurturing young minds through mentorship, counselling awareness, and life skills development.",
    features: [
      "Student mentorship",
      "School counselling awareness",
      "Teacher wellness & training",
      "Mental health days in schools",
      "Life skills programs for teenagers",
    ],
    color: "bg-teal-light",
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-accent font-medium text-sm tracking-wider uppercase">
              Our Services
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-3 mb-6">
              Holistic Programs for Mental Wellness & Growth
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Comprehensive mental health-centered services designed to empower individuals, 
              strengthen organizations, and uplift communities on their journey to wellness and success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-6`}>
                    <service.icon size={32} className="text-primary-foreground" />
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <Button asChild variant="default">
                    <Link to="/contact">
                      Inquire About This Service
                      <ArrowRight className="ml-2" size={18} />
                    </Link>
                  </Button>
                </div>

                <div className={`card-elevated ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    What's Included
                  </h3>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle size={20} className="text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-accent font-medium text-sm tracking-wider uppercase">
              How It Works
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-3">
              Our Approach
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Target, title: "Discover", description: "We learn about your unique needs and goals" },
              { icon: Lightbulb, title: "Design", description: "We create a customized program for you" },
              { icon: Heart, title: "Deliver", description: "We implement with care and expertise" },
              { icon: Users, title: "Develop", description: "We support your ongoing growth journey" },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                  <step.icon size={28} className="text-accent-foreground" />
                </div>
                <div className="text-accent font-bold text-sm mb-2">Step {index + 1}</div>
                <h3 className="font-display text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-primary-foreground/70 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </Layout>
  );
};

export default Services;
