import { ArrowRightIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";

const contactItems = [
  {
    label: "General contact",
    email: siteConfig.email,
  },
  {
    label: "Application and product support",
    email: siteConfig.supportEmail,
  },
] as const;

export function HomeContact() {
  return (
    <section className="home-contact" id="contact">
      <div className="site-container">
        <div className="home-contact__intro">
          <h2>Contact</h2>
          <p>
            For professional enquiries, creative collaborations or a
            thoughtful introduction.
          </p>
        </div>
        <div className="home-contact__grid">
          {contactItems.map((item) => (
            <div className="contact-option" key={item.email}>
              <p>{item.label}</p>
              <a href={`mailto:${item.email}`}>
                <span>{item.email}</span>
                <ArrowRightIcon />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
