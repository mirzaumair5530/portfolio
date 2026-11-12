import { BlogPreview } from "@/components/home/BlogPreview";
import { Faq } from "@/components/home/Faq";
import { Testimonials } from "@/components/home/Testimonials";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/home/Contact";
import { Experience } from "@/components/sections/Experience";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { ProgressRail } from "@/components/ui/ProgressRail";
import { ScrollSpy } from "@/components/ui/ScrollSpy";

import { JsonLd } from "@/components/ui/JsonLd";
import { resume } from "@/data/resume";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  description: site.seo.description,
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: site.name,
          jobTitle: resume.headline,
          description: site.tagline,
          url: site.url,
          sameAs: resume.links.map((link) => link.url),
        }}
      />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <FeaturedProjects />
      <Testimonials />
      <Faq />
      <BlogPreview />
      <Contact />
      <ProgressRail />
      <ScrollSpy />
    </>
  );
}
