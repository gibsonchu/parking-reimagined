import { C } from "../theme/palette";

type Border = "full" | "bottom" | "none";

/**
 * Consistent blank placeholder used everywhere real photography will later go
 * (Library cards, the precedent modals). Announced to assistive tech via
 * role="img" + aria-label since there is no real image yet.
 */
export function ImagePlaceholder({
  label,
  aspect = "4 / 3",
  border = "full",
  className = "",
}: {
  label: string; // e.g. "Placeholder image for Lorem ipsum project"
  aspect?: string;
  border?: Border;
  className?: string;
}) {
  const borderStyle =
    border === "full"
      ? { border: `1px solid ${C.wood}` }
      : border === "bottom"
        ? { borderBottom: `1px solid ${C.wood}` }
        : {};
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center ${className}`}
      style={{ aspectRatio: aspect, background: C.sky, ...borderStyle }}
    >
      <span className="text-[11px] font-bold tracking-[0.18em]" style={{ color: C.inkSoft }} aria-hidden="true">
        IMAGE
      </span>
    </div>
  );
}
