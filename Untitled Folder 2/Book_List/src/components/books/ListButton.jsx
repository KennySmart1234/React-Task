import { useDispatch, useSelector } from "react-redux";
import { addBook, removeBook, selectIsInList } from "./booksSlice";
import { normalizeBook } from "../../utils/book";

// Not in list  -> "Add" button.
// Already in list -> "In your list" badge (cannot be added again) + a separate Remove button.
const ListButton = ({ book, className = "" }) => {
  const dispatch = useDispatch();
  const data = normalizeBook(book);
  const inList = useSelector(selectIsInList(data?.id));
  if (!data) return null;

  if (inList) {
    return (
      <div className={`flex gap-2 ${className}`}>
        <span
          role="status"
          className="flex flex-1 items-center justify-center rounded-md border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800"
        >
          ✓ Already in your list
        </span>
        <button
          type="button"
          onClick={() => dispatch(removeBook(data.id))}
          aria-label={`Remove ${data.title} from reading list`}
          className="rounded-md border border-red-300 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 cursor-pointer"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => dispatch(addBook(data))}
      className={`rounded-md bg-amber-800 px-4 py-2 text-sm font-medium text-white hover:bg-amber-900 cursor-pointer ${className}`}
    >
      + Add to reading list
    </button>
  );
};

export default ListButton;
