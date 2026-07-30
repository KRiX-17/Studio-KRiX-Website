import { PageIntro } from "@/components/page-intro";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";

export const metadata = createMetadata({
  title: "Privacy",
  description:
    "Privacy information for the Studio KRiX website, OhmXact and future Studio KRiX services.",
  path: "/privacy",
});

const sections = [
  {
    title: "About this policy",
    content: (
      <>
        <p>
          This policy explains how Studio KRiX handles information in
          connection with this website, OhmXact and future Studio KRiX
          software or services.
        </p>
        <p>
          It will be updated when the way information is handled changes. The
          “Last updated” date above identifies the current version.
        </p>
      </>
    ),
  },
  {
    title: "The Studio KRiX website",
    content: (
      <>
        <p>
          This is currently a static website. It does not provide user
          accounts, accept payments or use an embedded contact form.
        </p>
        <p>
          The hosting provider may process routine technical information such
          as IP addresses, request times, browser details and requested URLs
          for security, reliability and operational logging.
        </p>
      </>
    ),
  },
  {
    title: "OhmXact",
    content: (
      <>
        <p>
          OhmXact’s core resistor calculations are designed to be performed on
          the device. Calculation inputs are not intended to be sent to Studio
          KRiX as part of that core function.
        </p>
        <p>
          The App Store privacy information shown for the version you install
          should be read with this policy. If optional diagnostics or analytics
          are introduced, the relevant disclosure and this policy will be
          updated before that processing begins.
        </p>
      </>
    ),
  },
  {
    title: "Email",
    content: (
      <>
        <p>
          When you contact Studio KRiX by email, the message may include your
          email address, name, device details, screenshots and any other
          information you choose to provide.
        </p>
        <p>
          That information is used to respond, provide support, understand
          product issues and keep an appropriate record of the conversation.
          Please avoid sending sensitive personal information that is not
          necessary for the request.
        </p>
      </>
    ),
  },
  {
    title: "Future analytics and contact forms",
    content: (
      <>
        <p>
          Studio KRiX may add privacy-conscious analytics or contact forms in
          the future. Before doing so, this policy will be updated to explain
          what is collected, why it is needed, the service providers involved,
          the relevant choices and any applicable retention period.
        </p>
        <p>
          Where consent is legally required, the feature will not be activated
          for a visitor until that consent is obtained.
        </p>
      </>
    ),
  },
  {
    title: "Sharing and service providers",
    content: (
      <p>
        Information is not sold. It may be processed by service providers that
        support website hosting, email delivery, app distribution, security or
        product support. Information may also be disclosed where required by
        law or where reasonably necessary to protect people, systems or rights.
      </p>
    ),
  },
  {
    title: "Retention and security",
    content: (
      <p>
        Information is kept only for as long as it is reasonably needed for
        the purpose for which it was collected, including support, security,
        legal and record-keeping needs. Reasonable measures are used to protect
        information, but no internet or email system can be guaranteed to be
        completely secure.
      </p>
    ),
  },
  {
    title: "Your choices and rights",
    content: (
      <p>
        Depending on where you live, you may have rights to ask about, access,
        correct or delete personal information, or to object to or restrict
        certain processing. Contact Studio KRiX using the address below. Some
        information may need to be retained where the law permits or requires
        it.
      </p>
    ),
  },
  {
    title: "Children’s privacy",
    content: (
      <p>
        Studio KRiX products and this website are not directed to children for
        the purpose of collecting personal information. If you believe a child
        has provided personal information unnecessarily, please get in touch
        so the situation can be reviewed.
      </p>
    ),
  },
  {
    title: "Contact",
    content: (
      <p>
        Privacy questions can be sent to{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
    ),
  },
] as const;

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        description="How information is handled across the Studio KRiX website and software."
        index="Last updated 30 July 2026"
        title={
          <>
            Privacy, written to be <em>understood.</em>
          </>
        }
      />
      <section className="policy">
        <div className="site-container policy__grid">
          <aside aria-label="Privacy policy summary">
            <p>Studio KRiX</p>
            <p>Sydney, Australia</p>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </aside>
          <div className="policy__content">
            {sections.map((section, index) => (
              <section className="policy-section" key={section.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{section.title}</h2>
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
