import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { CTA } from "@/components/sections/CTA";
import { Heart, Eye, Target, Shield, Users, Sparkles, CheckCircle, Award } from "lucide-react";

const coreValues = [
  {
    icon: Shield,
    title: "Confidentiality & Trust",
    description: "We create safe environments where you can share openly, knowing your privacy is protected.",
  },
  {
    icon: Award,
    title: "Professionalism",
    description: "We deliver excellence in all our services, maintaining the highest standards of practice.",
  },
  {
    icon: Users,
    title: "Cultural Sensitivity",
    description: "We honor and respect diverse backgrounds, tailoring our approach to each unique context.",
  },
  {
    icon: Heart,
    title: "Empowerment",
    description: "We believe in your potential and work to unlock the power within you.",
  },
  {
    icon: Sparkles,
    title: "Integrity",
    description: "We operate with transparency, honesty, and ethical practice in everything we do.",
  },
];

const About = () => {
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
              About Us
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-3 mb-6">
              Creating Safe Spaces for Growth
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Safe Haven Consultancy is more than a consultancy—it's a sanctuary where 
              individuals and communities discover their strength, heal, and thrive.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card-elevated"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-6">
                <Target size={32} className="text-primary-foreground" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To provide consultancy, training, and support services that address:
              </p>
              <ul className="space-y-3">
                {[
                  "Emotional and mental wellbeing",
                  "Leadership and personal growth",
                  "Community empowerment",
                  "Organisational capacity building",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground">
                    <CheckCircle size={20} className="text-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card-elevated"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-6">
                <Eye size={32} className="text-accent-foreground" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Our Vision
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A confident, mentally healthy, empowered community capable of leading 
                meaningful lives. We envision a world where every individual has access 
                to the resources, support, and knowledge they need to overcome challenges 
                and reach their full potential.
              </p>
              <div className="mt-6 p-4 bg-secondary rounded-xl">
                <p className="text-foreground italic font-display">
                  "Creating a safe haven where men, women, and youth can access knowledge, 
                  healing, growth, and tools to thrive personally and professionally."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Safe Haven */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="text-accent font-medium text-sm tracking-wider uppercase">
              Our Purpose
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-6">
              Why Safe Haven Exists
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              In a world where mental health struggles often go unaddressed and professional 
              growth can feel out of reach, we created Safe Haven as a bridge—connecting 
              individuals with the tools, support, and community they need to flourish.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "For Individuals",
                description: "Personal coaching and mental health support tailored to your unique journey.",
              },
              {
                title: "For Organizations",
                description: "Leadership training and capacity building that transforms workplace culture.",
              },
              {
                title: "For Communities",
                description: "Empowerment programs that create lasting positive change at scale.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-8 bg-primary-foreground/5 rounded-2xl border border-primary-foreground/10"
              >
                <h3 className="font-display text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-primary-foreground/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-accent font-medium text-sm tracking-wider uppercase">
              What We Stand For
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-elevated group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-300">
                  <value.icon size={28} className="text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </Layout>
  );
};

export default About;
