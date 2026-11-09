import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = import.meta.env.VITE_APP_BASEURL;
const RAPIDAPI_HOST = import.meta.env.VITE_RAPIDAPI_HOST;
const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

const rawBaseQuery = fetchBaseQuery({
  baseUrl: URL,
  prepareHeaders: (headers) => {
    headers.set("X-RapidAPI-Host", RAPIDAPI_HOST);
    headers.set("X-RapidAPI-Key", RAPIDAPI_KEY);
    return headers;
  },
});

/* ---------- helpers ---------- */

// Accept the common response shapes: { results }, { books }, { data } or a bare array.
export const listOf = (d) =>
  Array.isArray(d) ? d : [d?.results, d?.books, d?.data].find(Array.isArray) ?? [];

const wordsOf = (q) => q.toLowerCase().split(/\s+/).filter(Boolean);

export const matchesQuery = (book, q) => {
  const authors = Array.isArray(book?.authors)
    ? book.authors.map((a) => (typeof a === "string" ? a : a?.name ?? "")).join(" ")
    : "";
  const hay = `${book?.title ?? ""} ${authors}`.toLowerCase();
  return wordsOf(q).every((w) => hay.includes(w));
};

const toPage = (d, list) => ({
  results: list,
  count: d?.count ?? list.length,
  next: d?.next ?? (d?.next === undefined && list.length >= 10 ? "assumed" : null),
});

/* ---------- search ----------
   The docs for this RapidAPI wrapper don't say which query parameter does the
   searching, so we try the usual ones once, remember the one that works, and
   reuse it. As a last resort we scan a few pages and filter them locally. */

const STRATEGIES = [
  (q, page) => ({ url: "/books", params: { page, search: q } }),
  (q, page) => ({ url: "/books", params: { page, query: q } }),
  (q, page) => ({ url: "/books", params: { page, q } }),
  (q, page) => ({ url: "/books", params: { page, title: q } }),
  (q, page) => ({ url: "/search", params: { page, query: q } }),
  (q, page) => ({ url: "/search", params: { page, q } }),
  (q, page) => ({ url: "/books/search", params: { page, query: q } }),
  (q, page) => ({ url: `/search/${encodeURIComponent(q)}`, params: { page } }),
];

const CACHE_KEY = "searchStrategy:v1";
const readLearned = () => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw === null || raw === "") return null; // Number(null) would be 0!
    const n = Number(raw);
    return Number.isInteger(n) && n >= 0 && n < STRATEGIES.length ? n : null;
  } catch { return null; }
};
const writeLearned = (n) => { try { localStorage.setItem(CACHE_KEY, String(n)); } catch { /* ignore */ } };

// Errors that mean "this attempt was wrong, try another" vs. real problems.
const isFatal = (err) => !(typeof err?.status === "number" && [400, 404, 405, 422].includes(err.status));

async function searchBooks(q, page, baseQuery) {
  const learned = readLearned();
  if (learned !== null) {
    const r = await baseQuery(STRATEGIES[learned](q, page));
    if (r.error) return { error: r.error };
    return { data: toPage(r.data, listOf(r.data)) };
  }

  // The unfiltered list, so we can tell "filtered" from "parameter ignored".
  const base = await baseQuery({ url: "/books", params: { page } });
  if (base.error) return { error: base.error };
  const ids = (d) => listOf(d).map((b) => b?.id).join(",");
  const baseIds = ids(base.data);

  for (let i = 0; i < STRATEGIES.length; i++) {
    const r = await baseQuery(STRATEGIES[i](q, page));
    if (r.error) {
      if (isFatal(r.error)) return { error: r.error };
      continue;
    }
    const list = listOf(r.data);
    // Empty answer = the filter was honoured and nothing matched.
    // Different from the unfiltered list + a real match = the filter worked.
    // Same as the unfiltered list = the parameter was ignored.
    if (list.length === 0 || (ids(r.data) !== baseIds && list.some((b) => matchesQuery(b, q)))) {
      writeLearned(i);
      return { data: toPage(r.data, list) };
    }
  }

  // Last resort: scan the first few pages and filter here.
  const found = [];
  for (let p = 1; p <= 5; p++) {
    const r = await baseQuery({ url: "/books", params: { page: p } });
    if (r.error) return found.length ? { data: toPage({ next: null }, found) } : { error: r.error };
    const list = listOf(r.data);
    for (const b of list) {
      if (matchesQuery(b, q) && !found.some((f) => f.id === b.id)) found.push(b);
    }
    if (!r.data?.next && !Array.isArray(r.data)) break;
  }
  return { data: toPage({ next: null }, found) };
}

/* ---------- API ---------- */

export const gutenbergApi = createApi({
  reducerPath: "gutenbergApi",
  baseQuery: rawBaseQuery,

  endpoints: (builder) => ({
    // { page, search } -> { results, count, next }
    getBooks: builder.query({
      async queryFn({ page = 1, search = "" } = {}, _api, _extra, baseQuery) {
        const q = String(search).trim();
        if (!q) {
          const r = await baseQuery({ url: "/books", params: { page } });
          return r.error ? { error: r.error } : { data: toPage(r.data, listOf(r.data)) };
        }
        return searchBooks(q, page, baseQuery);
      },
    }),

    getBookById: builder.query({
      query: (id) => `/books/${encodeURIComponent(id)}`,
    }),
  }),
});

export const { useGetBooksQuery, useGetBookByIdQuery, useLazyGetBookByIdQuery } = gutenbergApi;
