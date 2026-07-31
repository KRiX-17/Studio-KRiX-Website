import { ButtonLink } from "@/components/button-link";

export function HomeAbout() {
  return (
    <section className="home-about" id="about">
      <div className="site-container home-about__grid">
        <h2>About</h2>
        <div>
          <p>
            Christopher Helene is a Sydney-based automotive technician,
            developer and electronic music producer. Studio KRiX brings those
            interests together through practical software, automotive
            technology and creative projects.
          </p>
          <ButtonLink href="/about" variant="text">
            More about Christopher
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
