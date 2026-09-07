import { PageIntro } from "@/components/page-intro";
import { createMetadata } from "@/lib/metadata";

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
          This website does not provide user accounts, accept payments or run
          analytics. Its contact and support forms collect only the information
          a visitor chooses to submit.
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
          OhmXact is designed as a local-first electrical and electronics
          workspace. Calculations, Projects, Workshop Library values, History,
          preferences and locally generated reports stay on the device unless
          you explicitly choose to export or share them. OhmXact does not
          provide an OhmXact account or sign-in service.
        </p>
        <p>
          OhmXact does not include advertising, tracking, analytics or
          crash-reporting SDKs, and it does not send calculator or workspace
          data to a Studio KRiX server. The Android app does not request the
          <code>INTERNET</code> permission. If that implementation changes,
          this policy and the applicable store disclosures will be updated
          before the change is released.
        </p>
        <p>
          On Android, cloud backup and device-transfer backup are disabled for
          OhmXact app data. Clearing app data or uninstalling the app removes
          its locally stored data, subject to normal device behaviour. Backup
          and retention behaviour on Apple platforms is governed by the
          applicable platform and device settings.
        </p>
      </>
    ),
  },
  {
    title: "Camera Reader Beta",
    content: (
      <>
        <p>
          Camera Reader Beta is optional. OhmXact requests camera permission
          only when you choose to use the feature. Camera frames and derived
          colour-recognition data are processed in memory on the device to
          assist with resistor-band recognition.
        </p>
        <p>
          OhmXact does not save, retain, upload or otherwise transmit camera
          frames or derived recognition images. Manual resistor tools remain
          available if you do not grant camera access or choose not to use the
          Beta feature.
        </p>
      </>
    ),
  },
  {
    title: "Documents, sharing and clipboard",
    content: (
      <>
        <p>
          Project files and PDF reports are generated locally. Importing a
          project, choosing an export destination and sharing a report use the
          operating system&apos;s document picker, file exporter or share sheet
          only after you select an action and destination. The receiving app,
          storage provider or service then handles the selected data under its
          own terms and privacy policy.
        </p>
        <p>
          When you choose Copy Result, OhmXact places the displayed result on
          the system clipboard. Other apps or system services may be able to
          read clipboard content according to their platform controls.
          OhmXact does not transmit clipboard content.
        </p>
      </>
    ),
  },
  {
    title: "Purchases",
    content: (
      <>
        <p>
          OhmXact offers optional one-time in-app purchases through the Apple
          App Store or Google Play, depending on your device. Payment details
          are collected and processed by the relevant store under its own
          terms and privacy policy; Studio KRiX and OhmXact do not receive or
          store payment-card information.
        </p>
        <p>
          The app asks the relevant store for product availability and
          owned-purchase status to apply the appropriate feature entitlement.
          OhmXact does not offer a subscription.
        </p>
      </>
    ),
  },
  {
    title: "Contact and support forms",
    content: (
      <>
        <p>
          A form submission may include your name, reply email, enquiry or
          product details, device and software versions, issue descriptions and
          reproduction steps. The forms do not accept file uploads and should
          not be used for sensitive personal information.
        </p>
        <p>
          That information is used only to respond, provide support and
          understand product issues. It is not added to a marketing list.
        </p>
      </>
    ),
  },
  {
    title: "Email delivery and anti-abuse processing",
    content: (
      <>
        <p>
          Resend processes submitted form content to deliver it to Studio KRiX.
          Cloudflare Turnstile processes browser and anti-abuse signals to help
          distinguish people from automated submissions.
        </p>
        <p>
          No advertising or marketing analytics are active. If analytics are
          introduced later, this policy and any required consent choices will
          be updated before that processing begins.
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
        Form submissions and resulting correspondence are kept only for as long
        as reasonably necessary to answer the enquiry, provide support and meet
        proportionate legal or record-keeping needs. Reasonable measures are
        used to protect information, but no internet or email system can be
        guaranteed to be completely secure.
      </p>
    ),
  },
  {
    title: "Your choices and rights",
    content: (
      <p>
        Depending on where you live, you may have rights to ask about, access,
        correct or delete personal information, or to object to or restrict
        certain processing. Contact Studio KRiX through the contact form. Some
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
        Privacy questions can be sent through the secure <a href="/contact">contact form</a>{" "}
        or to{" "}
        <a href="mailto:support@studiokrix.com.au">support@studiokrix.com.au</a>.
      </p>
    ),
  },
] as const;

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        description="How information is handled across the Studio KRiX website and software."
        index="Last updated 7 September 2026"
        title="Privacy, written to be understood."
      />
      <section className="policy">
        <div className="site-container policy__grid">
          <aside aria-label="Privacy policy summary">
            <p>Studio KRiX</p>
            <p>Sydney, Australia</p>
            <a href="/contact">Secure contact form</a>
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
