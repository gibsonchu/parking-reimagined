import type { Category } from "../data/elements";
import { spriteInner } from "../lib/sprites";

/** Inline SVG sprite for DOM contexts (toy box, lists). */
export function Sprite({ icon, cat, size = 30 }: { icon: string; cat: Category; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: spriteInner(icon, cat) }}
    />
  );
}
