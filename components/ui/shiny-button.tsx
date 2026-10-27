import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Link semantics are preserved for navigation CTAs. */
export function ShinyButton({ className, variant = "primary", ...props }: ComponentProps<typeof Link> & { variant?: "primary" | "secondary" }) {
  return <Link {...props} className={cn("marine-shiny", `marine-shiny--${variant}`, className)} />;
}
