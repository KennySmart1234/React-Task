import { useState } from "react";
import { useGetBooksQuery } from "../../api/gutenbergApi";
import { normalizeBook, errorMessage } from "../../utils/book";
import useDebounce from "../../utils/useDebounce";
import BookCard from "./BookCard";
import { Loading, ErrorBox } from "./Status";

const Books = () => {
  const [input, setInput] = useState("");
  const search = useDebounce(input.trim(), 400); // searches ~0.4s after you stop typing

  // Page is remembered together with the search it belongs to,
  // so a new search automatically starts back at page 1.
  const [pageState, setPageState] = useState({ search: "", page: 1 });
  const page = pageState.search === search ? pageState.page : 1;
  const goToPage = (n) => setPageState({ search, page: n });

  const { data, isFetching, isError, error, refetch } = useGetBooksQuery({ page, search });

  const books = (Array.isArray(data?.results) ? data.results : []).map(normalizeBook).filter(Boolean);
  const searching = isFetching || input.trim() !== search;

  return (
    <section>
      <h1 className="font-serif text-3xl font-bold text-stone-900">Browse books</h1>

      <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex gap-2" role="search">
        <input
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Start typing a title or author…"
          aria-label="Search books"
          autoFocus
          className="flex-1 rounded-lg border border-stone-300 bg-white px-4 py-2"
        />
        {input && (
          <button type="button" onClick={() => setInput("")} className="rounded-lg border border-stone-300 px-4 py-2 hover:bg-stone-100 cursor-pointer">
            Clear
          </button>
        )}
      </form>

      <p className="mt-3 h-5 text-sm text-stone-600" aria-live="polite">
        {searching ? "Searching…" : search ? `Results for “${search}”` : ""}
      </p>

      {isError ? (
        <ErrorBox message={errorMessage(error)} onRetry={refetch} />
      ) : !data && isFetching ? (
        <Loading text="Loading books…" />
      ) : books.length === 0 ? (
        <p className="py-16 text-center text-stone-500">
          {search ? `No books found for “${search}”.` : "No books found."}
        </p>
      ) : (
        <div className={`mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-opacity ${isFetching ? "opacity-60" : ""}`}>
          {books.map((book) => <BookCard key={book.id} book={book} />)}
        </div>
      )}

      <div className="mt-8 flex items-center gap-4">
        <button disabled={page === 1 || isFetching} onClick={() => goToPage(page - 1)}
          className="rounded border border-stone-300 px-4 py-2 enabled:hover:bg-stone-100 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed">Previous</button>
        <span className="text-stone-600">Page {page}</span>
        <button disabled={!data?.next || isFetching} onClick={() => goToPage(page + 1)}
          className="rounded border border-stone-300 px-4 py-2 enabled:hover:bg-stone-100 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed">Next</button>
      </div>
    </section>
  );
};

export default Books;
