/**
 * Renders a presentation slide (the SVG built by presentationSlide.ts) as a
 * responsive 16:9 block. Reused by the preview, the full-screen present view,
 * and — via the same SVG string — the PNG/PDF exports, so all four stay
 * visually identical.
 */
export function PresentationDesignView({ svg, className = "" }: { svg: string; className?: string }) {
  return (
    <div
      className={`w-full ${className}`}
      style={{ aspectRatio: `16 / 9` }}
      // the SVG is generated app-side from typed data, never user HTML
      dangerouslySetInnerHTML={{ __html: svg.replace(/width="\d+" height="\d+"/, 'width="100%" height="100%"') }}
    />
  );
}
