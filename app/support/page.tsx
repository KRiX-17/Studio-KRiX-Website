import { ButtonLink } from "@/components/button-link";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Support",
  description:
    "Troubleshooting and email support for OhmXact and Studio KRiX software.",
  path: "/support",
});

const troubleshooting = [
  {
    title: "Update the app",
    body: "Check that you are running the latest available version of the Studio KRiX app.",
  },
  {
    title: "Restart the app",
    body: "Close the app fully, reopen it and try the same action again.",
  },
  {
    title: "Restart the device",
    body: "A device restart can clear temporary system issues that affect app behaviour.",
  },
  {
    title: "Check for OS updates",
    body: "If practical, confirm that your iPhone or iPad is running a current operating system version.",
  },
] as const;

const reportDetails = [
  "Device model",
  "OS version",
  "App name and version",
  "A clear description of the issue",
  "Steps to reproduce it",
  "Screenshots, if they help explain the problem",
] as const;

export default function SupportPage() {
  return (
    <>
      <PageIntro
        description="Straightforward help for OhmXact and future Studio KRiX software."
        title="Support, without the runaround."
      />

      <section className="support-section">
        <div className="site-container support-grid">
          <div>
            <p className="section-label">Troubleshooting</p>
            <h2>Start with the simple things.</h2>
          </div>
          <div className="support-steps">
            {troubleshooting.map((item, index) => (
              <Reveal className="support-step" key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bug-report-section">
        <div className="site-container bug-report-section__grid">
          <Reveal>
            <p className="section-label">Bug reports</p>
            <h2>Useful detail helps find a useful answer.</h2>
            <p>
              If the issue continues, send an email and include as much of the
              following information as you can.
            </p>
          </Reveal>
          <ol className="report-details">
            {reportDetails.map((detail, index) => (
              <li key={detail}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {detail}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="support-contact">
        <Reveal className="site-container support-contact__inner">
          <div>
            <p className="section-label">Email support</p>
            <h2>Still need help?</h2>
          </div>
          <div>
            <p>
              Send the details to {siteConfig.supportEmail}. Replies are
              handled personally and may take a little time.
            </p>
            <ButtonLink href={`mailto:${siteConfig.supportEmail}`} external>
              Email support
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
