import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/config";

export const CTA = () => {
  return (
    <section className="section-padding bg-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Begin Your{" "}
            <span className="text-primary">Transformation</span>?
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Take the first step towards a more empowered, mentally healthy, and fulfilling life.
            Our team is here to guide you every step of the way.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild variant="default" size="xl">
              <Link to="/contact">
                <Mail className="mr-2" size={20} />
                Contact Us
              </Link>
            </Button>
            <Button asChild variant="whatsapp" size="xl">
              <a href={SITE_CONFIG.whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2" size={20} />
                WhatsApp Us
              </a>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link to="/services">
                Explore Programs
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
