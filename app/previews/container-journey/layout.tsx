import type { Metadata } from "next";
import PreviewSwitcher from "./PreviewSwitcher";


export const metadata: Metadata = {
  title: "Container Journey — Visual Comparison",
  robots: { index: false, follow: false },
};

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return <div className="flight-preview-layout"><PreviewSwitcher />{children}</div>;
}
