import { SITE_URL } from "../lib/site";

export default function ServiceSchema({ path, name, description }: { path: string; name: string; description: string }) {
  const url = new URL(path, SITE_URL).href;
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    url, name, description,
    provider: { "@id": `${SITE_URL}/#organization` },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service).replace(/</g, "\\u003c") }} />;
}
