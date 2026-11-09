# SHOP.CO
React (Vite) + Redux Toolkit + React Router + Tailwind CSS, using https://fakestoreapi.com/products.

    npm install
    npm run dev

Promo codes: SHOP20, SAVE30, HALFOFF. Cart persists in localStorage.
CORS: fakestoreapi.com blocks browser calls from other origins, so requests go through a Vite proxy at /fakestore (dev + preview). For production hosting, add a rewrite from /fakestore/* to https://fakestoreapi.com/*, or set VITE_API_BASE.
Notes: discounts, colors and sizes are derived from product id (FakeStoreAPI doesn't provide them).
Fonts: Archivo (wide/black) stands in for Integral CF; Satoshi loads from Fontshare (DM Sans fallback).
