import { ButtonLink } from "@/components/button-link";

export function HomeAbout() {
  return (
    <section className="home-about" id="about">
      <div className="site-container home-about__grid">
        <h2>About</h2>
        <div>
          <p>
            Christopher Helene is a Sydney-based technician, developer,
            electronic music producer and photographer working across software, automotive and
            electrical systems, networking, connected environments, automation
            and local AI. Studio KRiX brings these disciplines together through
            practical tools, photography, experimental systems and creative projects.
          </p>
          <ButtonLink href="/about" variant="text">
            More about Christopher
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
