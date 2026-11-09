// Pull the links we care about out of the API's `formats` object.
// (Also understands the older saved-list shape: [{ ext, url }].)
export const pickLinks = (formats) => {
  const links = { pdfUrl: null, textUrl: null, htmlUrl: null };
  if (Array.isArray(formats)) {
    for (const f of formats) {
      if (f?.ext === "pdf") links.pdfUrl = f.url;
      if (f?.ext === "txt") links.textUrl = f.url;
      if (f?.ext === "html") links.htmlUrl = f.url;
    }
    return links;
  }
  if (!formats || typeof formats !== "object") return links;
  const find = (prefix, bad = /\.zip$/) =>
    Object.entries(formats).find(([t, u]) => t.startsWith(prefix) && typeof u === "string" && u && !bad.test(u))?.[1] ?? null;
  links.pdfUrl = find("application/pdf");
  links.textUrl = find("text/plain");
  links.htmlUrl = find("text/html");
  return links;
};

// Turns whatever the API returns into one small, predictable shape.
// Safe to run on an already-normalized (saved) book too.
export const normalizeBook = (b) => {
  if (!b || b.id === undefined || b.id === null) return null;
  const authors = Array.isArray(b.authors)
    ? b.authors.map((a) => (typeof a === "string" ? a : a?.name)).filter(Boolean)
    : [];
  const summary =
    (typeof b.summary === "string" && b.summary) ||
    (Array.isArray(b.summaries) && typeof b.summaries[0] === "string" && b.summaries[0]) ||
    "";
  return {
    id: String(b.id),
    title: b.title || "Untitled",
    authors,
    cover: b.cover || b.cover_image || b.formats?.["image/jpeg"] || null,
    summary,
    downloads: [b.downloads, b.download_count].find((n) => typeof n === "number") ?? null,
    ...(b.pdfUrl !== undefined || b.textUrl !== undefined
      ? { pdfUrl: b.pdfUrl ?? null, textUrl: b.textUrl ?? null, htmlUrl: b.htmlUrl ?? null }
      : pickLinks(b.formats)),
  };
};

export const errorMessage = (error) => {
  if (!error) return "Something went wrong.";
  if (error.status === "FETCH_ERROR") return "Can't reach the server. Check your internet connection.";
  if (error.status === 401 || error.status === 403) return "The API key was rejected. Check VITE_RAPIDAPI_KEY in your .env file.";
  if (error.status === 404) return "That book could not be found.";
  if (error.status === 429) return "API rate limit reached. Please wait a moment and retry.";
  if (error.status === "PARSING_ERROR") return "The server sent an unreadable response.";
  return `Something went wrong${error.status ? ` (${error.status})` : ""}.`;
};
