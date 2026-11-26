import { SITE_URL } from "../lib/site";

const offerings = {
  deployment: { name: "Deployment planning", description: "Scope public-cloud, private-cloud or on-premises deployment, connectivity and operational responsibilities." },
  "data-migration": { name: "Data migration services", description: "Map, trial-import and reconcile survey and warehouse records for Space BQS and Cargo WMS implementations." },
};

export default function ServiceSchema({ offering }: { offering: keyof typeof offerings }) {
  const url = new URL(`/services/${offering}`, SITE_URL).href;
  const { name, description } = offerings[offering];
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    url, name, description,
    provider: { "@id": `${SITE_URL}/#organization` },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service).replace(/</g, "\\u003c") }} />;
}
