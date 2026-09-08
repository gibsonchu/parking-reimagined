import { useEffect, useState } from "react";
import type { PhotoCredit } from "../data/elements";
import { C } from "../theme/palette";
import { ImagePlaceholder } from "./ImagePlaceholder";

type Border = "full" | "bottom" | "none";

/**
 * Renders a real photo when `src` is set (and loads), otherwise falls back to
 * the blank ImagePlaceholder. Keeps aspect ratio and border treatment identical
 * to the placeholder so filled and unfilled spots line up in a grid. If the
 * image 404s, it also falls back rather than showing a broken-image icon.
 */
export function PhotoFrame({
  src,
  alt,
  aspect = "4 / 3",
  border = "full",
  className = "",
}: {
  src?: string;
  alt: string;
  aspect?: string;
  border?: Border;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]); // retry when the source changes

  if (!src || failed) {
    return <ImagePlaceholder label={`Placeholder image for ${alt}`} aspect={aspect} border={border} className={className} />;
  }
  const borderStyle =
    border === "full"
      ? { border: `1px solid ${C.wood}` }
      : border === "bottom"
        ? { borderBottom: `1px solid ${C.wood}` }
        : {};
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`block w-full object-cover ${className}`}
      style={{ aspectRatio: aspect, background: C.sky, ...borderStyle }}
    />
  );
}

/** Small attribution line shown under a licensed photo. Links to the source. */
export function PhotoCreditLine({ credit, className = "" }: { credit: PhotoCredit; className?: string }) {
  return (
    <div className={`text-[11px] leading-snug ${className}`} style={{ color: C.inkSoft }}>
      Photo:{" "}
      <a href={credit.href} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: C.inkSoft }}>
        {credit.author}
      </a>{" "}
      · {credit.license}
    </div>
  );
}
