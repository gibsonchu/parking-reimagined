import type { Category } from "../data/elements";
import { CAT } from "../theme/palette";

/*
 * Floor-plan symbol library: thin ink linework in the style of architectural
 * site plans (door swings, chair circles, landscape tree symbols), with soft
 * category washes. Generated as SVG strings so one source drives both the DOM
 * toy box (inline <svg>) and the Konva canvas (rasterized via data: URL).
 */

const INK = "#2a2d31";
const PAPER = "#ffffff";

export function spriteInner(icon: string, cat: Category): string {
  const wash = CAT[cat].soft;
  // shared line style
  const ln = `stroke="${INK}" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"`;
  const solid = (fill: string, sw = 1.3) => `fill="${fill}" stroke="${INK}" stroke-width="${sw}"`;

  switch (icon) {
    case "table2": // round table, two chair circles
      return `<circle cx="12" cy="12" r="5.5" ${solid(PAPER)}/><circle cx="12" cy="4" r="2" ${solid(wash, 1.1)}/><circle cx="12" cy="20" r="2" ${solid(wash, 1.1)}/>`;
    case "table6": // rectangular table, six chairs
      return `<rect x="7.5" y="4" width="9" height="16" ${solid(PAPER)}/>` +
        [7, 12, 17].map((y) => `<circle cx="4.5" cy="${y}" r="1.7" ${solid(wash, 1)}/><circle cx="19.5" cy="${y}" r="1.7" ${solid(wash, 1)}/>`).join("");
    case "bench":
      return `<rect x="3" y="9" width="18" height="6" ${solid(PAPER)}/><line x1="3" y1="12" x2="21" y2="12" ${ln}/><line x1="6" y1="9" x2="6" y2="15" stroke="${INK}" stroke-width="0.8"/><line x1="18" y1="9" x2="18" y2="15" stroke="${INK}" stroke-width="0.8"/>`;
    case "counter":
      return `<rect x="3" y="8" width="18" height="4" ${solid(PAPER)}/>` +
        [6, 12, 18].map((x) => `<circle cx="${x}" cy="16.5" r="1.8" ${solid(wash, 1)}/>`).join("");
    case "planter":
      return `<rect x="4.5" y="6" width="15" height="12" ${solid(PAPER)}/><circle cx="9" cy="10" r="2.4" ${solid(wash, 1)}/><circle cx="15" cy="10" r="2.4" ${solid(wash, 1)}/><circle cx="12" cy="14.5" r="2.4" ${solid(wash, 1)}/>`;
    case "tree": // landscape-architecture tree symbol: circle, center dot, radial ticks
      return `<circle cx="12" cy="12" r="8" ${solid(wash)}/><circle cx="12" cy="12" r="1" fill="${INK}"/>` +
        [45, 135, 225, 315].map((a) => {
          const r1 = 4, r2 = 7.2, rad = (a * Math.PI) / 180;
          return `<line x1="${12 + r1 * Math.cos(rad)}" y1="${12 + r1 * Math.sin(rad)}" x2="${12 + r2 * Math.cos(rad)}" y2="${12 + r2 * Math.sin(rad)}" stroke="${INK}" stroke-width="0.9"/>`;
        }).join("");
    case "rain":
      return `<ellipse cx="12" cy="14" rx="9" ry="6" ${solid(wash, 1.1)} stroke-dasharray="2.4 1.8"/><path d="M12 4.5 Q9.5 8 12 10 Q14.5 8 12 4.5" ${solid(PAPER, 1.1)}/><circle cx="8.5" cy="14.5" r="0.9" fill="${INK}"/><circle cx="15" cy="15.5" r="0.9" fill="${INK}"/>`;
    case "lawn":
      return `<rect x="3" y="6" width="18" height="13" ${solid(wash, 1.2)}/>` +
        [6.5, 10, 13.5, 17].map((x) => `<path d="M${x} 16 L${x + 1} 12.5 M${x + 1} 16 L${x + 1.8} 13.5" stroke="${INK}" stroke-width="0.8" fill="none"/>`).join("");
    case "bike":
      return `<circle cx="8" cy="15" r="4" ${ln}/><circle cx="16" cy="15" r="4" ${ln}/><path d="M8 15 L11 8 L15 15 M11 8 L14 8" ${ln}/>`;
    case "shelter":
      return `<path d="M3 9 L21 9 L18 4 L6 4 Z" ${solid(PAPER)}/><rect x="5" y="9" width="14" height="11" ${solid(PAPER)}/><line x1="12" y1="9" x2="12" y2="20" stroke="${INK}" stroke-width="0.9"/><line x1="5" y1="15" x2="19" y2="15" stroke="${INK}" stroke-width="0.7" stroke-dasharray="1.6 1.4"/>`;
    case "scooter":
      return `<circle cx="6" cy="17" r="3" ${ln}/><circle cx="18" cy="17" r="3" ${ln}/><path d="M6 17 L14 17 L18 5 L20 5 M14 17 L16 8" ${ln}/>`;
    case "adu": // mini floor plan: walls, interior partition, door swing
      return `<rect x="4" y="4" width="16" height="16" ${solid(PAPER, 1.5)}/><line x1="13" y1="4" x2="13" y2="11" stroke="${INK}" stroke-width="1.2"/><line x1="9" y1="20" x2="9" y2="15.5" stroke="${INK}" stroke-width="1"/><path d="M9 15.5 A4.5 4.5 0 0 1 13.5 20" stroke="${INK}" stroke-width="0.8" fill="none"/><rect x="6" y="6.5" width="3.5" height="2.2" ${solid(wash, 0.8)}/>`;
    case "kiosk":
      return `<rect x="5" y="8" width="14" height="13" ${solid(PAPER)}/><path d="M3 8 L21 8 L19 3.5 L5 3.5 Z" ${solid(wash, 1.1)}/><line x1="8" y1="21" x2="16" y2="21" stroke="${INK}" stroke-width="2"/>`;
    case "trash": // two labeled container bins
      return `<rect x="4.5" y="6.5" width="7" height="12" ${solid(PAPER)}/><rect x="12.5" y="6.5" width="7" height="12" ${solid(PAPER)}/><line x1="4.5" y1="6.5" x2="11.5" y2="18.5" stroke="${INK}" stroke-width="0.7"/><line x1="12.5" y1="6.5" x2="19.5" y2="18.5" stroke="${INK}" stroke-width="0.7"/>`;
    case "book": // open book
      return `<rect x="5" y="5" width="14" height="15" ${solid(PAPER)}/><path d="M8 9 Q12 7.5 12 9 L12 16 Q12 14.5 8 16 Z" ${solid(wash, 0.8)}/><path d="M16 9 Q12 7.5 12 9 L12 16 Q12 14.5 16 16 Z" ${solid(wash, 0.8)}/>`;
    case "locker":
      return `<rect x="6" y="4" width="12" height="17" ${solid(PAPER)}/><line x1="12" y1="4" x2="12" y2="21" stroke="${INK}" stroke-width="0.9"/>` +
        [8, 13, 18].map((y) => `<circle cx="9.5" cy="${y}" r="0.8" fill="${INK}"/><circle cx="14.5" cy="${y}" r="0.8" fill="${INK}"/>`).join("");
    case "art": // sculpture symbol: asterisk in a dashed setback circle
      return `<circle cx="12" cy="12" r="8.5" stroke="${INK}" stroke-width="0.8" fill="none" stroke-dasharray="2.2 1.8"/>` +
        [0, 45, 90, 135].map((a) => {
          const rad = (a * Math.PI) / 180, r = 4.5;
          return `<line x1="${12 - r * Math.cos(rad)}" y1="${12 - r * Math.sin(rad)}" x2="${12 + r * Math.cos(rad)}" y2="${12 + r * Math.sin(rad)}" stroke="${INK}" stroke-width="1.3"/>`;
        }).join("") + `<circle cx="12" cy="12" r="1.4" ${solid(wash, 1)}/>`;
    case "daylight": // curb-radius arc with sightline hatching
      return `<path d="M5 19.5 Q5 5.5 19 5.5" ${ln}/><path d="M5 15 Q5 9.5 11 9.5" stroke="${INK}" stroke-width="0.7" fill="none" stroke-dasharray="1.8 1.6"/><circle cx="19" cy="5.5" r="1.8" ${solid(wash, 1)}/>`;
    default:
      return `<rect x="5" y="5" width="14" height="14" ${solid(wash)}/>`;
  }
}

export function spriteSvg(icon: string, cat: Category, size = 96): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">${spriteInner(icon, cat)}</svg>`;
}

export function spriteDataUrl(icon: string, cat: Category, size = 96): string {
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(spriteSvg(icon, cat, size));
}

/** Line-drawn top-down parked car for the "before" overlay (8×20 ft slot). */
export function carSvg(): string {
  const ln = `stroke="${INK}" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="120" viewBox="0 0 60 120">
    <rect x="9" y="6" width="42" height="108" rx="17" fill="${PAPER}" ${ln.replace('fill="none" ', "")}/>
    <path d="M14 36 Q30 26 46 36 L44 48 Q30 42 16 48 Z" ${ln}/>
    <path d="M16 78 Q30 84 44 78 L46 92 Q30 100 14 92 Z" ${ln}/>
    <line x1="9" y1="62" x2="4" y2="56" ${ln}/><line x1="51" y1="62" x2="56" y2="56" ${ln}/>
    <path d="M20 12 Q30 9 40 12" ${ln}/>
  </svg>`;
}

export function carDataUrl(): string {
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(carSvg());
}
