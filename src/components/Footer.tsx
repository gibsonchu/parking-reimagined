import { C } from "../theme/palette";

/** Site footer: creator credit, right aligned. */
export function Footer() {
  return (
    <footer className="mt-4" style={{ borderTop: `1px solid ${C.wood}` }}>
      <div className="mx-auto max-w-[1080px] px-4 py-5 sm:px-6">
        <p className="m-0 text-right text-[12.5px] leading-relaxed" style={{ color: C.inkSoft }}>
          Created by{" "}
          <a
            href="https://x.com/gibsontchu"
            target="_blank"
            rel="noreferrer"
            className="font-bold underline"
            style={{ color: C.leaf }}
          >
            Gibson Chu
          </a>
        </p>
      </div>
    </footer>
  );
}
