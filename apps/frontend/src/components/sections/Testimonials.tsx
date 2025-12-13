import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Safe Haven Consultancy transformed the way our team approaches leadership. The workshops were insightful, practical, and deeply impactful.",
    author: "Abdiwahab M.",
    role: "HR Director",
    company: "Tawheed Globals",
  },
  {
    quote: "The mental health awareness program opened my eyes to self-care practices I never knew I needed. I feel more equipped to handle life's challenges.",
    author: "James K.",
    role: "Entrepreneur",
    company: "Nadjam Travel",
  },
  {
    quote: "A truly safe space where I could explore my potential without judgment. The personal empowerment sessions changed my career trajectory.",
    author: "Amara T.",
    role: "student",
    company: "Garissa University",
  },
];

export const Testimonials = () => {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
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
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">
            Stories of Transformation
          </h2>
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            Hear from individuals and organizations whose lives have been touched 
            by our programs.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-primary-foreground/5 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-all duration-300"
            >
              <Quote size={40} className="text-accent/60 mb-4" />
              <p className="text-primary-foreground/90 leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-primary-foreground/10 pt-4">
                <p className="font-semibold text-primary-foreground">
                  {testimonial.author}
                </p>
                <p className="text-sm text-primary-foreground/60">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
