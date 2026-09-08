import { useId, useState, type ReactNode } from "react";
import { C } from "../theme/palette";

/** A click-to-open disclosure section. Closed by default. */
export function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <section
      className="mb-3 overflow-hidden rounded-md"
      style={{ border: `1px solid ${open ? C.woodDark : C.wood}`, background: C.white }}
    >
      <h3 className="m-0">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition-colors"
          style={{ background: "transparent" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = C.sky)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <span className="text-[17px] font-extrabold" style={{ color: C.ink }}>
            {title}
          </span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="shrink-0 transition-transform duration-200 motion-reduce:transition-none"
            style={{ transform: open ? "rotate(180deg)" : "none" }}
          >
            <path d="M6 9.5 L12 15.5 L18 9.5" stroke={C.inkSoft} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </h3>
      {open && (
        <div
          id={panelId}
          className="px-5 pt-5 pb-6 text-[14.5px] leading-relaxed"
          style={{ borderTop: `1px solid ${C.wood}` }}
        >
          {children}
        </div>
      )}
    </section>
  );
}
