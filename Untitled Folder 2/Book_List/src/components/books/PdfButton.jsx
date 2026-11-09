import { useState } from "react";
import { useLazyGetBookByIdQuery } from "../../api/gutenbergApi";
import { normalizeBook } from "../../utils/book";
import { buildPdf } from "../../utils/pdf";

const safeName = (t) => t.replace(/[^\w\- ]+/g, "").trim().slice(0, 80) || "book";

const save = (blob, filename) => {
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(href), 3000);
};

// gutenberg.org blocks direct browser downloads (CORS), so in dev these requests
// go through Vite's proxy (see vite.config.js).
const viaProxy = (url) => url.replace(/^https?:\/\/(www\.)?gutenberg\.org/i, "/gutenberg");

// Try each URL in turn and return the first successful response.
async function fetchFirst(urls) {
  let last;
  for (const url of urls) {
    try {
      const res = await fetch(import.meta.env.DEV ? viaProxy(url) : url);
      if (res.ok) return res;
      last = new Error(`HTTP ${res.status}`);
    } catch (e) { last = e; }
  }
  throw last ?? new Error("Download failed");
}

// The API's own file paths can be outdated (404), so try Gutenberg's stable
// plain-text address for the book first.
const textUrls = (book) =>
  [
    /^\d+$/.test(book.id) && `https://www.gutenberg.org/cache/epub/${book.id}/pg${book.id}.txt`,
    book.textUrl,
  ].filter(Boolean);

const PdfButton = ({ book, compact = false, className = "" }) => {
  const [state, setState] = useState({ busy: false, msg: "" });
  const [loadBook] = useLazyGetBookByIdQuery();

  const run = async () => {
    setState({ busy: true, msg: "Preparing…" });
    try {
      // Browse lists may not include file links, so look the book up if needed.
      let b = book;
      if (!b.pdfUrl && !b.textUrl) {
        b = normalizeBook(await loadBook(book.id, true).unwrap()) ?? book;
      }
      const name = `${safeName(b.title)}.pdf`;

      if (b.pdfUrl) {
        try {
          save(await (await fetchFirst([b.pdfUrl])).blob(), name);
        } catch {
          window.open(b.pdfUrl, "_blank", "noopener");
        }
        setState({ busy: false, msg: "" });
        return;
      }
      if (textUrls(b).length === 0) throw new Error("no-source");

      setState({ busy: true, msg: "Building PDF…" });
      const text = await (await fetchFirst(textUrls(b))).text();
      await new Promise((r) => setTimeout(r, 30)); // let the UI repaint first
      const bytes = buildPdf({ title: b.title, author: b.authors.join(", "), text });
      save(new Blob([bytes], { type: "application/pdf" }), name);
      setState({ busy: false, msg: "" });
    } catch (e) {
      setState({
        busy: false,
        msg: e?.message === "no-source"
          ? "No PDF or readable text is available for this book."
          : "Couldn't download this book. Please try again.",
      });
    }
  };

  return (
    <div className={className}>
      <button
        type="button"
        onClick={run}
        disabled={state.busy}
        aria-label={`Download ${book.title} as PDF`}
        className={`rounded-md border border-stone-300 bg-white font-medium text-stone-800 hover:bg-stone-100 disabled:cursor-wait disabled:opacity-60 cursor-pointer ${
          compact ? "w-full px-3 py-2 text-sm" : "px-4 py-2 text-sm"
        }`}
      >
        {state.busy ? state.msg : "⬇ Download PDF"}
      </button>
      {!state.busy && state.msg && (
        <p role="alert" className="mt-1 text-xs text-red-700">{state.msg}</p>
      )}
    </div>
  );
};

export default PdfButton;
