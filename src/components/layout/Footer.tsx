import { Avatar } from "@/components/ui/Avatar";
import { Container } from "@/components/ui/Container";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="glass-footer text-foreground print:hidden">
      <Container className="py-10">
        <div className="grid gap-8 tablet:grid-cols-3">
          <div className="flex flex-col gap-2">
            <p>Email :</p>
            <a
              href={`mailto:${site.email}`}
              className="type-body-l font-semibold!"
            >
              {site.email}
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <p>Call Today :</p>
            <PhoneLink className="type-body-l font-semibold!" />
          </div>
          <div className="flex flex-col gap-2">
            <p>Social :</p>
            <SocialLinks />
          </div>
        </div>

        <hr className="my-10 border-current" />

        {/* No year: reading the clock fails prerender with Cache Components. */}
        <div className="type-small flex flex-wrap items-center justify-between gap-4">
          <p>© {site.name}. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Created by
            <Avatar
              image={site.images.avatar}
              name={site.name}
              size={24}
              className="text-[10px]!"
            />
            <span className="font-semibold">{site.name}</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
