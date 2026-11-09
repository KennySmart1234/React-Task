# Book List

Browse Project Gutenberg books, keep a reading list, and download books as PDF.

## Run
    npm install
    npm run dev

Needs a `.env` with `VITE_APP_BASEURL`, `VITE_RAPIDAPI_HOST`, `VITE_RAPIDAPI_KEY`.

## Features
- Live search (about 0.4s after you stop typing). The app finds the API's working search
  parameter on first use and remembers it.
- Add / remove books; a book already in the list can't be added twice
- "To read" page, saved in localStorage and synced across tabs
- PDF download: uses a PDF from the API when there is one, otherwise builds a PDF from the
  book's text. Fetching the text goes through the Vite dev proxy (`/gutenberg`), so use
  `npm run dev`; a production deployment needs an equivalent proxy.
