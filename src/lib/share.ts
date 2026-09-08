import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";
import type { Project } from "../state/useProject";

/*
 * Shareable projects via URL-encoded state: the whole project JSON is
 * compressed into the URL hash, so a link fully reconstructs a design with no
 * backend.
 */

const HASH_PREFIX = "#p=";

export function encodeShareHash(project: Project): string {
  return HASH_PREFIX + compressToEncodedURIComponent(JSON.stringify(project));
}

export function shareUrl(project: Project): string {
  return location.origin + location.pathname + encodeShareHash(project);
}

export function decodeShareHash(hash: string): Project | null {
  if (!hash.startsWith(HASH_PREFIX)) return null;
  try {
    const json = decompressFromEncodedURIComponent(hash.slice(HASH_PREFIX.length));
    if (!json) return null;
    const p = JSON.parse(json);
    if (typeof p?.name !== "string" || typeof p?.scaleId !== "string" || !Array.isArray(p?.items)) return null;
    return {
      id: typeof p.id === "string" ? p.id : undefined,
      name: p.name,
      scaleId: p.scaleId,
      customDims: p.customDims && typeof p.customDims.wFt === "number" && typeof p.customDims.lFt === "number"
        ? { wFt: p.customDims.wFt, lFt: p.customDims.lFt }
        : undefined,
      items: p.items
        .filter((it: unknown): it is Record<string, unknown> => !!it && typeof it === "object")
        .map((it: Record<string, unknown>, i: number) => ({
          uid: typeof it.uid === "string" ? it.uid : `shared-${i}`,
          ref: String(it.ref ?? ""),
          x: Number(it.x ?? 0),
          y: Number(it.y ?? 0),
          rotation: Number(it.rotation ?? 0),
        })),
    };
  } catch {
    return null;
  }
}
