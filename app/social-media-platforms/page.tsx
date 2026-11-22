import type { Metadata } from "next";
import SocialMediaPlatformsClient from "./SocialMediaPlatformsClient";
import { SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  title: "Official Social Media Platforms & Verified Channels",
  description:
    "Official directory of verified Space BQS channels across the web: developer repositories, engineering publications, video walkthroughs, and community hubs.",
  keywords: [
    "Space BQS social media",
    "Space BQS official channels",
    "bunker surveyor software social",
    "marine fuel calculation community",
    "ASTM D1250 Table 54B GitHub",
    "bunker quantity survey software",
  ],
  openGraph: {
    title: "Official Social Media Platforms — Space BQS",
    description:
      "A verified directory of all official and registered Space BQS accounts. Connect with us across every platform.",
    url: `${SITE_URL}/social-media-platforms`,
    siteName: "Space BQS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Official Social Media Platforms — Space BQS",
    description:
      "Find and follow Space BQS across all verified social platforms, developer hubs, and publications.",
  },
};

export default function SocialMediaPlatformsPage() {
  return <SocialMediaPlatformsClient />;
}
