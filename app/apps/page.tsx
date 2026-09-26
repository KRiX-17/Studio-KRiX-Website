import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { DeviceMockups } from "@/components/device-mockups";
import { PageIntro } from "@/components/page-intro";
import { lakazProject } from "@/data/projects";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Apps | Studio KRiX",
  description: "Practical software by Studio KRiX, including OhmXact and Lakaz.",
  path: "/apps",
});

export default function AppsPage() {
  return (
    <>
      <PageIntro title="Apps" description="Practical tools, built from real problems." />
      <section className="apps-feature">
        <div className="site-container apps-feature__grid">
          <div className="apps-feature__copy">
            <p className="section-label">Featured app</p>
            <h2>OhmXact</h2>
            <p>Resistor calculations for the workshop, the bench and your pocket. Designed to make an everyday electrical task faster and clearer.</p>
            <ButtonLink href="/ohmxact">Explore OhmXact</ButtonLink>
          </div>
          <div className="apps-feature__media"><DeviceMockups /></div>
        </div>
      </section>
      <section className="apps-next">
        <div className="site-container apps-next__grid">
          <div><p className="section-label">In development</p><h2>{lakazProject.name}</h2></div>
          <div><p>{lakazProject.description}</p><ButtonLink href={lakazProject.href} variant="secondary">Explore Lakaz</ButtonLink></div>
        </div>
      </section>
      <section className="apps-more">
        <div className="site-container apps-next__grid">
          <div><p className="section-label">The wider studio</p><h2>Systems, experiments and collaborations.</h2></div>
          <div><p>Explore the connected systems, software ideas and creative infrastructure behind the apps.</p><Link href="/projects" className="apps-more__link">View all projects <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>
    </>
  );
}
