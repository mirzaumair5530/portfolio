import { AboutPanel } from "@/components/home/AboutPanel";
import { BlogPreview } from "@/components/home/BlogPreview";
import { Contact } from "@/components/home/Contact";
import { Faq } from "@/components/home/Faq";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { HeroPanel } from "@/components/home/HeroPanel";
import { PinnedScene } from "@/components/home/PinnedScene";
import { ServicesPanel } from "@/components/home/ServicesPanel";
import { Testimonials } from "@/components/home/Testimonials";
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
          sameAs: site.socials.map((social) => social.href),
        }}
      />
      <PinnedScene>
        <HeroPanel />
        <ServicesPanel />
        <AboutPanel />
      </PinnedScene>
      <FeaturedProjects />
      <Testimonials />
      <Faq />
      <BlogPreview />
      <Contact />
    </>
  );
}
