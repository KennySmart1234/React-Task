import { configureStore } from "@reduxjs/toolkit";
import { gutenbergApi } from "../api/gutenbergApi";
import booksReducer, { saveItems, loadItems, setBooks, STORAGE_KEY } from "../components/books/booksSlice";

export const store = configureStore({
  reducer: {
    [gutenbergApi.reducerPath]: gutenbergApi.reducer,
    books: booksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gutenbergApi.middleware),
});

// Persist the reading list whenever it changes.
let last = store.getState().books.items;
store.subscribe(() => {
  const next = store.getState().books.items;
  if (next !== last) {
    last = next;
    saveItems(next);
  }
});

// Keep several open tabs in sync (also prevents duplicates across tabs).
window.addEventListener("storage", (e) => {
  if (e.key === STORAGE_KEY || e.key === null) store.dispatch(setBooks(loadItems()));
});
