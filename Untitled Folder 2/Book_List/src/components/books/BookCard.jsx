import { Link } from "react-router-dom";
import ListButton from "./ListButton";
import PdfButton from "./PdfButton";
import Cover from "./Cover";

const BookCard = ({ book }) => (
  <article className="flex flex-col gap-3 rounded-lg border border-stone-200 bg-white p-4 shadow-sm transition hover:shadow-md">
    <Link to={`/books/${book.id}`} className="block">
      <Cover src={book.cover} title={book.title} className="h-64 w-full" />
      <h2 className="mt-3 font-serif text-lg font-semibold leading-snug text-stone-900">{book.title}</h2>
      <p className="text-sm text-stone-600">{book.authors.join(", ") || "Unknown author"}</p>
      {book.summary && <p className="mt-2 line-clamp-3 text-xs text-stone-500">{book.summary}</p>}
      {book.downloads !== null && (
        <p className="mt-2 text-xs text-stone-500">{book.downloads.toLocaleString()} downloads</p>
      )}
    </Link>
    <div className="mt-auto flex flex-col gap-3">
      <PdfButton book={book} compact />
      <ListButton book={book} className="w-full" />
    </div>
  </article>
);

export default BookCard;
