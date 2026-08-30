import { ArrowRight, Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container, Eyebrow } from "@/components/ui/Section";

/**
 * TEMPORARY SCAFFOLD.
 *
 * Placeholder for routes not yet built in this prototype pass, so navigation
 * never dead-ends during review. Each of these is replaced by a real screen as
 * it is built — delete this component once the last route is done.
 */
export function ComingNext({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <Header />
      <main className="flex min-h-[70vh] items-center bg-steel-50">
        <Container>
          <div className="max-w-2xl py-24">
            <Eyebrow>Prototype</Eyebrow>
            <h1 className="mt-5 text-display-lg uppercase text-navy-800">
              {title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-steel-600">
              {description}
            </p>
            <p className="mt-3 text-base leading-relaxed text-steel-600">
              This screen is part of the next build pass. The navigation, design
              system and data layer behind it are already in place.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/" variant="outline">
                Back to homepage
                <ArrowRight />
              </Button>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
