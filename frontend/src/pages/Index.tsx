import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <Testimonials />
      <CTA />
    </Layout>
  );
};

export default Index;
