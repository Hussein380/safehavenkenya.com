import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center bg-secondary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <span className="text-8xl md:text-9xl font-display font-bold text-primary/20">
              404
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">
              Page Not Found
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              It seems you've wandered off the path. Don't worry—we'll help you 
              find your way back to a safe space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="default" size="lg">
                <Link to="/">
                  <Home className="mr-2" size={18} />
                  Return Home
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">
                  <ArrowLeft className="mr-2" size={18} />
                  Contact Support
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
