import { ButtonLink } from "@/components/button-link";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="site-container not-found__inner">
        <p>404</p>
        <h1>
          This path went <em>somewhere else.</em>
        </h1>
        <p>
          The page may have moved, or it may not have existed in the first
          place.
        </p>
        <ButtonLink href="/">Return home</ButtonLink>
      </div>
    </section>
  );
}
