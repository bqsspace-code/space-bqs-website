import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Skew-panel interaction adapted to the site's light glass cards. */
export default function GradientCardShowcase({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div {...props} data-glass-depth data-glass-surface className={cn("gradient-interactive-card", className)}>
      <span aria-hidden="true" className="gradient-card-panel pointer-events-none" />
      <span aria-hidden="true" className="gradient-card-panel gradient-card-halo pointer-events-none" />
      <span aria-hidden="true" className="gradient-card-float gradient-card-float-top pointer-events-none" />
      <span aria-hidden="true" className="gradient-card-float gradient-card-float-bottom pointer-events-none" />
      {children}
    </div>
  );
}
