import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/sections/CTA";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { client, urlFor } from "@/lib/sanity";

const Blog = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      return await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
                _id,
                title,
                slug,
                publishedAt,
                mainImage,
                excerpt,
                readTime,
                "author": author->{name, image},
                "categories": categories[]->{title}
            }`);
    }
  });

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
          {isLoading ? (
            <div className="text-center py-20 text-muted-foreground">Loading posts...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts?.map((post: any, index: number) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/blog/${post.slug?.current}`} className="block h-full">
                    <div className="card-elevated h-full flex flex-col overflow-hidden p-0">
                      <div className="relative overflow-hidden">
                        {post.mainImage && (
                          <img
                            src={urlFor(post.mainImage).width(800).url()}
                            alt={post.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                        {post.categories && post.categories.length > 0 && (
                          <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                            {post.categories[0].title}
                          </span>
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </span>
                          {post.readTime && (
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {post.readTime}
                            </span>
                          )}
                        </div>
                        <h2 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                          <span className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User size={14} />
                            {post.author?.name || 'Safe Haven Team'}
                          </span>
                          <span className="text-primary font-medium text-sm group-hover:gap-2 inline-flex items-center transition-all">
                            Read More
                            <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}

        </div>
      </section>

      <CTA />
    </Layout>
  );
};

export default Blog;
