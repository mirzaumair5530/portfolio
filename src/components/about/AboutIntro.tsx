import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { site } from "@/data/site";

// The first section of /about. It holds the page's <h1>, so nothing here
// waits for a reveal.
export function AboutIntro() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="type-display">About me</h1>
        <p className="type-h3">{site.name}</p>
      </div>
      <div className="type-body-l flex flex-col gap-5">
        <p>{site.copy.about}</p>
        <p>{site.copy.story}</p>
      </div>
      <SocialLinks />
      <div>
        <Button href="/resume">View resume</Button>
      </div>
    </>
  );
}
