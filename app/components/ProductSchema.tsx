import { SITE_NAME, SITE_URL } from "../lib/site";

export default function ProductSchema() {
  const product = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/#product`,
    name: SITE_NAME,
    url: `${SITE_URL}/solutions/space-bqs`,
    category: "Bunker quantity survey software",
    description:
      "Bunker quantity survey software for marine survey teams to capture tank readings offline, review survey calculations, and prepare PDF and Excel reports.",
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(product).replace(/</g, "\\u003c"),
      }}
    />
  );
}
