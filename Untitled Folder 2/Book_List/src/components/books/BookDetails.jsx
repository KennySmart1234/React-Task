import { useParams, Link } from "react-router-dom";
import { useGetBookByIdQuery } from "../../api/gutenbergApi";
import { normalizeBook, errorMessage } from "../../utils/book";
import ListButton from "./ListButton";
import PdfButton from "./PdfButton";
import Cover from "./Cover";
import { Loading, ErrorBox } from "./Status";

const BookDetails = () => {
  const { id } = useParams();
  const { data: raw, isLoading, isError, error, refetch } = useGetBookByIdQuery(id);
  const book = normalizeBook(raw);

  const subjects = Array.isArray(raw?.subjects) ? raw.subjects : [];

  return (
    <section>
      <Link to="/books" className="text-amber-800 hover:underline">← Back to books</Link>

      {isLoading ? <Loading text="Loading book…" />
        : isError ? <ErrorBox message={errorMessage(error)} onRetry={refetch} />
        : !book ? <ErrorBox message="That book could not be found." />
        : (
        <div className="mt-8 flex flex-col gap-8 md:flex-row">
          <div className="w-full max-w-xs shrink-0">
            <Cover src={book.cover} title={book.title} className="h-96 w-full" />
            <ListButton book={raw} className="mt-4 w-full" />
          </div>

          <div>
            <h1 className="font-serif text-3xl font-bold text-stone-900">{book.title}</h1>
            <p className="mt-2 text-stone-600">{book.authors.join(", ") || "Unknown author"}</p>
            {book.summary && <p className="mt-4 leading-relaxed">{book.summary}</p>}
            {book.downloads !== null && (
              <p className="mt-4"><strong>Downloads:</strong> {book.downloads.toLocaleString()}</p>
            )}
            {raw.reading_ease_score !== undefined && raw.reading_ease_score !== null && (
              <p className="mt-2"><strong>Reading ease score:</strong> {raw.reading_ease_score}</p>
            )}
            {subjects.length > 0 && (
              <p className="mt-2"><strong>Subjects:</strong> {subjects.join(", ")}</p>
            )}
            <div className="mt-6 space-y-3">
              <PdfButton book={book} />
              {book.htmlUrl && (
                <a href={book.htmlUrl} target="_blank" rel="noreferrer" className="inline-block text-sm text-amber-800 hover:underline">
                  Read online →
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BookDetails;
