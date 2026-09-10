// The Show 3D modal: a native <dialog> with the study's own page in an iframe. The iframe is
// mounted only while the modal is open — an anatomy study pulls a 169 MB mesh set, so it must never
// load behind the gallery — and a loading line stands in until the frame reports back. Escape, the
// backdrop and the close button all close; the gallery returns focus to the pill that opened it.
// On a phone the dialog fills the viewport so the study is not trapped in a 16:9 letterbox, and
// the iframe asks for `?embed=1` so the study does not draw a second title over the model.
import { useEffect, useRef, useState } from 'react';
import type { Example } from '../types/generated-data';

export interface StudyModalProps {
  /** The open study, or null when the modal is closed. */
  study: Example | null;
  onClose: () => void;
}

/** Study pages are served under `/examples/<id>/`; keep that path and add the embed flag. */
export function embedSrc(href: string): string {
  const url = new URL(href, 'https://3dviz.dev');
  url.searchParams.set('embed', '1');
  return `${url.pathname}${url.search}`;
}

/** Keyed by study id, so a new study starts with its own loading state. */
function StudyFrame({ study }: { study: Example }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-video max-h-[calc(92vh-84px)] w-full overflow-hidden rounded-b-[26px] bg-ink max-md:aspect-auto max-md:max-h-none max-md:min-h-0 max-md:flex-1 max-md:rounded-none">
      <iframe
        src={embedSrc(study.href)}
        title={`${study.title} — runnable study`}
        onLoad={() => setLoaded(true)}
        className="h-full w-full border-0"
      />
      {loaded ? null : (
        <p
          role="status"
          className="pointer-events-none absolute inset-0 m-0 flex items-center justify-center font-mono text-[11px] tracking-wide whitespace-nowrap text-dark-mute"
        >
          Loading…
        </p>
      )}
    </div>
  );
}

export default function StudyModal({ study, onClose }: StudyModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  // The dialog element is the external system here: open it while a study is selected, close it
  // and give the page its scrollbar back on the way out (Strict Mode runs this pair twice).
  useEffect(() => {
    const element = dialog.current;
    if (!element || !study) return undefined;
    element.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
      if (element.open) element.close();
    };
  }, [study]);

  return (
    <dialog
      ref={dialog}
      aria-labelledby="study-modal-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialog.current) dialog.current?.close();
      }}
      className="m-auto w-[min(96vw,1400px)] max-w-none border-0 bg-transparent p-0 backdrop:bg-ink/60 max-md:fixed max-md:inset-0 max-md:m-0 max-md:h-dvh max-md:max-h-dvh max-md:w-full"
    >
      {study ? (
        <div className="overflow-hidden rounded-[26px] bg-white shadow-[0_24px_60px_#1c2a2352] max-md:flex max-md:h-full max-md:flex-col max-md:rounded-none">
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 max-md:flex-nowrap max-md:gap-2 max-md:px-3 max-md:py-2.5">
            <div className="flex min-w-0 items-baseline gap-2.5">
              <h2
                id="study-modal-title"
                className="m-0 truncate text-[17px] font-bold tracking-[-0.3px] text-ink"
              >
                {study.title}
              </h2>
              <span className="flex-none font-mono text-[10.5px] text-mono-dim">{study.id}</span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <a
                href={study.href}
                target="_blank"
                rel="noopener"
                className="whitespace-nowrap rounded-full border border-line-strong px-4 py-2 font-mono text-[11px] tracking-[0.6px] text-green hover:bg-wash max-md:px-3"
              >
                Open in new tab ↗
              </a>
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                aria-label="Close the study"
                className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-line-strong bg-white text-ink transition-colors duration-150 hover:bg-wash"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M5 5 19 19M19 5 5 19" />
                </svg>
              </button>
            </div>
          </div>
          <StudyFrame key={study.id} study={study} />
        </div>
      ) : null}
    </dialog>
  );
}
