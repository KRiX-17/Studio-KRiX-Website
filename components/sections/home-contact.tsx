import { ButtonLink } from "@/components/button-link";

export function HomeContact() {
  return (
    <section className="home-contact" id="contact">
      <div className="site-container home-contact__cta">
        <div>
          <h2>Contact</h2>
          <p>
            For professional opportunities, creative collaboration or
            OhmXact support.
          </p>
        </div>
        <ButtonLink href="/contact">Choose a contact option</ButtonLink>
      </div>
    </section>
  );
}
