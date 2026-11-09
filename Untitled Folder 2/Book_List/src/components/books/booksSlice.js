import { createSlice } from "@reduxjs/toolkit";

export const STORAGE_KEY = "readingList:v1";

const dedupe = (list) => {
  const seen = new Set();
  return list.filter((b) => b && typeof b.id === "string" && !seen.has(b.id) && seen.add(b.id));
};

// Load safely: bad JSON, blocked storage, or wrong shape all fall back to [].
export const loadItems = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(parsed) ? dedupe(parsed) : [];
  } catch {
    return [];
  }
};

export const saveItems = (items) => {
  try {
    const json = JSON.stringify(items);
    if (localStorage.getItem(STORAGE_KEY) !== json) localStorage.setItem(STORAGE_KEY, json);
  } catch {
    /* storage full or blocked: the list still works for this session */
  }
};

const booksSlice = createSlice({
  name: "books",
  initialState: { items: loadItems() },

  reducers: {
    // Ignored if the book is already in the list.
    addBook: (state, action) => {
      const book = action.payload;
      if (!book || book.id === undefined || book.id === null) return;
      const id = String(book.id);
      if (!state.items.some((b) => b.id === id)) {
        state.items.push({ ...book, id, addedAt: Date.now() });
      }
    },
    removeBook: (state, action) => {
      const id = String(action.payload);
      state.items = state.items.filter((b) => b.id !== id);
    },
    clearBooks: (state) => {
      state.items = [];
    },
    // Used to sync the list when another browser tab changes it.
    setBooks: (state, action) => {
      state.items = dedupe(Array.isArray(action.payload) ? action.payload : []);
    },
  },
});

export const { addBook, removeBook, clearBooks, setBooks } = booksSlice.actions;
export const selectListItems = (state) => state.books.items;
export const selectIsInList = (id) => (state) =>
  state.books.items.some((b) => b.id === String(id));

export default booksSlice.reducer;
