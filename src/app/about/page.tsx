import type { Metadata } from "next";
import { AboutIntro } from "@/components/about/AboutIntro";
import { ExperienceList } from "@/components/about/ExperienceList";
import { ProcessGrid } from "@/components/about/ProcessGrid";
import { ServicesBlock } from "@/components/about/ServicesBlock";
import { SplitScene } from "@/components/about/SplitScene";
import { TechStack } from "@/components/about/TechStack";
import { Contact } from "@/components/home/Contact";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Who Umair Farooq is, what he builds, where he has worked and how he works.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <SplitScene
        scenes={[
          {
            id: "about",
            image: site.images.portrait,
            label: "Portrait photo",
            content: <AboutIntro />,
          },
          {
            id: "services",
            image: site.images.workspace,
            label: "Workspace photo",
            content: <ServicesBlock />,
          },
          {
            id: "experience",
            image: site.images.desk,
            label: "Photo at the desk",
            content: <ExperienceList />,
          },
          {
            id: "stack",
            image: site.images.workspace,
            label: "Workspace photo",
            content: <TechStack />,
          },
        ]}
      />
      <ProcessGrid />
      <Contact />
    </>
  );
}
