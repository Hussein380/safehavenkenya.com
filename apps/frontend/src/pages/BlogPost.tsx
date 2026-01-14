import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/sections/CTA";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();

    const { data: post, isLoading, error } = useQuery({
        queryKey: ['post', slug],
        queryFn: async () => {
            return await client.fetch(`*[_type == "post" && slug.current == $slug][0] {
                _id,
                title,
                slug,
                publishedAt,
                mainImage,
                body,
                readTime,
                "author": author->{name, image, bio},
                "categories": categories[]->{title}
            }`, { slug });
        },
        enabled: !!slug,
    });

    if (isLoading) {
        return (
            <Layout>
                <div className="pt-32 pb-16 min-h-screen flex items-center justify-center">
                    <div className="text-muted-foreground">Loading post...</div>
                </div>
            </Layout>
        );
    }

    if (error || !post) {
        return (
            <Layout>
                <div className="pt-32 pb-16 min-h-screen flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold text-foreground mb-4">Post not found</h1>
                    <Button asChild>
                        <Link to="/blog">Back to Blog</Link>
                    </Button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-secondary">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto"
                    >
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
                        >
                            <ArrowLeft size={16} />
                            Back to Blog
                        </Link>

                        {post.categories && post.categories.length > 0 && (
                            <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full mb-4">
                                {post.categories[0].title}
                            </span>
                        )}

                        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-2">
                                <User size={16} />
                                {post.author?.name || 'Safe Haven Team'}
                            </span>
                            <span className="flex items-center gap-2">
                                <Calendar size={16} />
                                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                            {post.readTime && (
                                <span className="flex items-center gap-2">
                                    <Clock size={16} />
                                    {post.readTime}
                                </span>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Image */}
            {post.mainImage && (
                <section className="bg-background">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="max-w-4xl mx-auto -mt-8"
                        >
                            <img
                                src={urlFor(post.mainImage).width(1200).url()}
                                alt={post.title}
                                className="w-full rounded-2xl shadow-lg"
                            />
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Content */}
            <section className="section-padding bg-background">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="max-w-3xl mx-auto prose prose-lg prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 dark:prose-invert"
                    >
                        {post.body && <PortableText value={post.body} />}
                    </motion.div>
                </div>
            </section>

            {/* Author Section */}
            {post.author && (
                <section className="py-12 bg-secondary">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="max-w-3xl mx-auto flex items-center gap-6"
                        >
                            {post.author.image && (
                                <img
                                    src={urlFor(post.author.image).width(100).height(100).url()}
                                    alt={post.author.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                            )}
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Written by</p>
                                <h3 className="font-display text-lg font-semibold text-foreground">
                                    {post.author.name}
                                </h3>
                                {post.author.bio && (
                                    <p className="text-sm text-muted-foreground mt-1">{post.author.bio}</p>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            <CTA />
        </Layout>
    );
};

export default BlogPost;
