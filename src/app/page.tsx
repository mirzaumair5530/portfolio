import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { LatestPosts } from "@/components/sections/LatestPosts";
import { Skills } from "@/components/sections/Skills";
import { ProgressRail } from "@/components/ui/ProgressRail";
import { ScrollSpy } from "@/components/ui/ScrollSpy";

import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  description: site.seo.description,
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <FeaturedProjects />
      <LatestPosts />
      <Contact />
      <ProgressRail />
      <ScrollSpy />
    </>
  );
}
