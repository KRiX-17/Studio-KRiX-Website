import type { ReactNode } from "react";

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
        <div className="page-intro__content">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
}
