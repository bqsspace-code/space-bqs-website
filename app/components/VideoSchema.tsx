import { SITE_NAME, SITE_URL } from "../lib/site";

type VideoSchemaProps = {
  pagePath?: string;
  id?: string;
  name?: string;
  description?: string;
  thumbnailUrl?: string;
  contentUrl?: string;
  embedUrl?: string;
  duration?: string;
};

export default function VideoSchema({
  pagePath = "/videos",
  id = "app-demo-video",
  name = "The Space BQS mobile app walkthrough",
  description = "A recording of the Space BQS mobile app workflow, showing vessel selection, tank-reading entry, and calculation review.",
  thumbnailUrl = `${SITE_URL}/assets/videos/bqs-app-demo-screen-poster.webp`,
  contentUrl = `${SITE_URL}/assets/videos/bqs-app-demo-screen.mp4`,
  embedUrl = `${SITE_URL}/videos#app-demo`,
  duration = "PT3M14S",
}: VideoSchemaProps = {}) {
  const video = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${SITE_URL}${pagePath}#${id}`,
    name,
    description,
    thumbnailUrl,
    ...(contentUrl ? { contentUrl } : {}),
    embedUrl,
    duration,
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(video).replace(/</g, "\\u003c"),
      }}
    />
  );
}
