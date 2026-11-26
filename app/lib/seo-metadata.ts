import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./site";

type RouteMetadataInput = Metadata & {
  title: string;
  description: string;
};

/** Build consistent per-route canonical and social metadata for public pages. */
export function routeMetadata(path: string, input: RouteMetadataInput): Metadata {
  const url = new URL(path, SITE_URL).toString();

  return {
    ...input,
    alternates: {
      ...input.alternates,
      canonical: url,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: input.title,
      description: input.description,
      images: [`${SITE_URL}/opengraph-image`],
      ...input.openGraph,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [`${SITE_URL}/opengraph-image`],
      ...input.twitter,
    },
  };
}
