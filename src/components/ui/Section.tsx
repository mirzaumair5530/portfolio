import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

/** A page section: the container plus 120 px above and below (80 on phones). */
export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Container
      as="section"
      id={id}
      className={cn("py-20 tablet:py-[120px]", className)}
    >
      {children}
    </Container>
  );
}
