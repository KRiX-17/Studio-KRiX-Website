import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

type PageIntroProps = {
  title: ReactNode;
  description: string;
  index?: string;
  align?: "left" | "wide";
};

export function PageIntro({
  title,
  description,
  index = "Studio KRiX",
  align = "left",
}: PageIntroProps) {
  return (
    <section className={`page-intro page-intro--${align}`}>
      <div className="site-container page-intro__grid">
        <p className="page-intro__index">{index}</p>
        <Reveal className="page-intro__content">
          <h1>{title}</h1>
          <p>{description}</p>
        </Reveal>
      </div>
    </section>
  );
}
