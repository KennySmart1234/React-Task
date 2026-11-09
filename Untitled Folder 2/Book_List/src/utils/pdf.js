// Tiny dependency-free PDF writer (plain text, Courier, US Letter).
const W = 612, H = 792, M = 72, SIZE = 10, LEADING = 12;
const COLS = Math.floor((W - 2 * M) / (SIZE * 0.6)); // Courier = 0.6em per char
const ROWS = Math.floor((H - 2 * M) / LEADING);

const CP1252 = { "€":128,"‚":130,"ƒ":131,"„":132,"…":133,"†":134,"‡":135,"ˆ":136,"‰":137,"Š":138,"‹":139,"Œ":140,"Ž":142,
  "‘":145,"’":146,"“":147,"”":148,"•":149,"–":150,"—":151,"˜":152,"™":153,"š":154,"›":155,"œ":156,"ž":158,"Ÿ":159 };

// Unicode -> single-byte WinAnsi, escaped for a PDF string.
const enc = (str) => {
  let out = "";
  for (const ch of str) {
    const c = ch.codePointAt(0);
    let b = c < 32 ? 32 : c < 128 || (c >= 160 && c < 256) ? c : CP1252[ch] ?? 63;
    const t = String.fromCharCode(b);
    out += t === "(" || t === ")" || t === "\\" ? "\\" + t : t;
  }
  return out;
};

const wrap = (text) => {
  const lines = [];
  for (const raw of text.replace(/\r\n?/g, "\n").replace(/\t/g, "    ").split("\n")) {
    let line = raw.replace(/\s+$/, "");
    if (!line) { lines.push(""); continue; }
    while ([...line].length > COLS) {
      let cut = line.lastIndexOf(" ", COLS);
      if (cut < COLS * 0.5) cut = COLS;
      lines.push(line.slice(0, cut).replace(/\s+$/, ""));
      line = line.slice(cut).replace(/^\s+/, "");
    }
    lines.push(line);
  }
  return lines;
};

export function buildPdf({ title, author, text }) {
  const bodyLines = wrap(text);
  const pages = [];
  // Cover page
  const cover = [`BT /F2 18 Tf ${M} ${H - 220} Td (${enc(title.slice(0, 60))}) Tj ET`];
  if (author) cover.push(`BT /F1 12 Tf ${M} ${H - 250} Td (${enc(author.slice(0, 80))}) Tj ET`);
  pages.push(cover.join("\n"));
  for (let i = 0; i < bodyLines.length; i += ROWS) {
    const chunk = bodyLines.slice(i, i + ROWS);
    let s = `BT /F1 ${SIZE} Tf ${LEADING} TL ${M} ${H - M} Td\n`;
    for (const l of chunk) s += `(${enc(l)}) '\n`;
    pages.push(s + "ET");
  }

  // Objects: 1 catalog, 2 pages, 3 Courier, 4 Courier-Bold, then (page, content) pairs.
  const objs = [];
  const kids = pages.map((_, i) => `${5 + i * 2} 0 R`).join(" ");
  objs[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objs[2] = `<< /Type /Pages /Kids [${kids}] /Count ${pages.length} >>`;
  objs[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>";
  objs[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold /Encoding /WinAnsiEncoding >>";
  pages.forEach((content, i) => {
    const n = 5 + i * 2;
    objs[n] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Contents ${n + 1} 0 R /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> >>`;
    objs[n + 1] = `<< /Length ${content.length} >>\nstream\n${content}\nendstream`;
  });

  const parts = ["%PDF-1.4\n"];
  const offsets = [];
  let pos = parts[0].length;
  for (let n = 1; n < objs.length; n++) {
    offsets[n] = pos;
    const chunk = `${n} 0 obj\n${objs[n]}\nendobj\n`;
    parts.push(chunk);
    pos += chunk.length;
  }
  let xref = `xref\n0 ${objs.length}\n0000000000 65535 f \n`;
  for (let n = 1; n < objs.length; n++) xref += `${String(offsets[n]).padStart(10, "0")} 00000 n \n`;
  parts.push(xref, `trailer\n<< /Size ${objs.length} /Root 1 0 R >>\nstartxref\n${pos}\n%%EOF`);

  const str = parts.join("");
  const bytes = new Uint8Array(str.length); // every char is 1 byte (see enc)
  for (let i = 0; i < str.length; i++) bytes[i] = str.charCodeAt(i) & 255;
  return bytes;
}
