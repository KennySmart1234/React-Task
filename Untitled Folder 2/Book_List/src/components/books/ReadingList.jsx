import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearBooks, selectListItems } from "./booksSlice";
import BookCard from "./BookCard";

const ReadingList = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectListItems);

  const clearAll = () => {
    if (window.confirm(`Remove all ${items.length} books from your list?`)) dispatch(clearBooks());
  };

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-3xl font-bold text-stone-900">
          Books to read <span className="text-lg font-normal text-stone-500">({items.length})</span>
        </h1>
        {items.length > 0 && (
          <button onClick={clearAll} className="rounded-md border border-stone-300 px-4 py-2 text-sm hover:bg-stone-100 cursor-pointer">
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="py-20 text-center text-stone-600">
          <p className="text-lg">Your reading list is empty.</p>
          <Link to="/books" className="mt-4 inline-block rounded-md bg-amber-800 px-5 py-2 text-white hover:bg-amber-900">
            Browse books
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((book) => <BookCard key={book.id} book={{ ...book, authors: book.authors ?? [] }} />)}
        </div>
      )}
    </section>
  );
};

export default ReadingList;
