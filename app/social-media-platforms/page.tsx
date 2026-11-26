import type { Metadata } from "next";
import SocialMediaPlatformsClient from "./SocialMediaPlatformsClient";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/social-media-platforms", {
  title: "Official Space BQS Channels and Profiles",
  description:
    "Directory of Space BQS profiles listed by the team across developer repositories, engineering publications, video channels, and community hubs.",
  keywords: [
    "Space BQS social media",
    "Space BQS official channels",
    "bunker surveyor software social",
    "bunker quantity survey software",
  ],
  openGraph: {
    title: "Official Space BQS Channels",
    description:
      "A directory of Space BQS profiles listed by the team across developer hubs, publications, and community platforms.",
    siteName: "Space BQS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Official Space BQS Channels",
    description:
      "Find Space BQS profiles listed by the team across social platforms, developer hubs, and publications.",
  },
});

export default function SocialMediaPlatformsPage() {
  return <SocialMediaPlatformsClient />;
}
