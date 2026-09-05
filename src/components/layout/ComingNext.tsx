import { ArrowRight, Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container, Eyebrow } from "@/components/ui/Section";

/**
 * TEMPORARY SCAFFOLD.
 *
 * Placeholder for routes that require client-supplied content. The privacy
 * policy currently uses it because legal policy text must not be invented.
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
            <Eyebrow>Coming next</Eyebrow>
            <h1 className="mt-5 text-display-lg uppercase text-navy-800">
              {title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-steel-600">
              {description}
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
