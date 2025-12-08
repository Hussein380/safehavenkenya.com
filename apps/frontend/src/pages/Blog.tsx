import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/sections/CTA";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "5 Daily Habits for Better Mental Health",
    excerpt: "Simple yet powerful practices you can incorporate into your daily routine to support your mental wellbeing and build resilience.",
    category: "Mental Health",
    author: "Safe Haven Team",
    date: "Dec 5, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Leadership in Times of Uncertainty",
    excerpt: "How to lead with confidence and compassion when the path forward isn't clear. Strategies for resilient leadership.",
    category: "Leadership",
    author: "Safe Haven Team",
    date: "Dec 1, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "The Power of Vulnerability in Growth",
    excerpt: "Why embracing vulnerability is essential for personal development and how to practice it safely in your journey.",
    category: "Personal Growth",
    author: "Safe Haven Team",
    date: "Nov 28, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&auto=format&fit=crop",
  },
];

const Blog = () => {
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
              Blog & Insights
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-3 mb-6">
              Wisdom for Your Journey
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Explore articles, insights, and resources on mental health, leadership, 
              and personal growth from our team of experts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="card-elevated h-full flex flex-col overflow-hidden p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User size={14} />
                        {post.author}
                      </span>
                      <span className="text-primary font-medium text-sm group-hover:gap-2 inline-flex items-center transition-all">
                        Read More
                        <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Coming Soon Notice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-secondary">
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                More Insights Coming Soon
              </h3>
              <p className="text-muted-foreground mb-6">
                We're preparing more valuable content on mental health, leadership, and 
                personal growth. Subscribe to stay updated.
              </p>
              <Button asChild variant="default">
                <Link to="/contact">Stay Connected</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <CTA />
    </Layout>
  );
};

export default Blog;
