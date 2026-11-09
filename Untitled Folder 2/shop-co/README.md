# SHOP.CO
React (Vite) + Redux Toolkit + React Router + Tailwind CSS, using https://fakestoreapi.com/products.

    npm install
    npm run dev

Promo codes: SHOP20, SAVE30, HALFOFF. Cart persists in localStorage.

## Data loading (and the 523 / CORS error)
`523` is a Cloudflare error meaning fakestoreapi.com's own server was unreachable. The browser then also prints a
"blocked by CORS" message because Cloudflare's error page has no CORS headers - the CORS message is a side effect, not the cause.
`src/store.js` now tries, in order: the Vite proxy `/fakestore` -> `https://fakestoreapi.com` directly (7s timeout each) ->
the bundled offline catalog (`src/data/products.json`, images in `public/products/`). When the offline catalog is used a
notice with a Retry button appears under the header. Product photos also fall back to the bundled copy if the remote image fails.
For production hosting add a rewrite `/fakestore/*` -> `https://fakestoreapi.com/*` or set `VITE_API_BASE`.

## Notes
- Discounts, colors and sizes are derived from the product id (FakeStoreAPI doesn't provide them).
- The offline catalog images are the originals from the FakeStoreAPI GitHub repo; the offline text data is a reconstruction of the public dataset.
- Fonts: Archivo (wide/black) is bundled locally as a stand-in for Integral CF; Satoshi loads from Fontshare with DM Sans (bundled) as fallback.
