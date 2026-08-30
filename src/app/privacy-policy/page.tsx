import { ComingNext } from "@/components/layout/ComingNext";

export const metadata = { title: "Privacy Policy" };

/**
 * Scaffold only. The quote form's consent line has to link somewhere, and a
 * dead link under a data-consent checkbox is worse than an honest placeholder.
 * Real policy text is the client's to supply — it is a legal document, not
 * copy to invent.
 */
export default function Page() {
  return (
    <ComingNext
      title="Privacy Policy"
      description="How enquiry details are stored and used. Awaiting the client's policy text."
    />
  );
}
