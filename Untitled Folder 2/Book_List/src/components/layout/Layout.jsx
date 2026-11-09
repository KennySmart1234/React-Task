import { NavLink, Outlet, Link, useRouteError, isRouteErrorResponse } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectListItems } from "../books/booksSlice";

const link = ({ isActive }) =>
  `rounded-md px-3 py-1.5 text-sm font-medium ${isActive ? "bg-amber-800 text-white" : "text-stone-700 hover:bg-stone-200"}`;

const Shell = ({ children }) => (
  <div className="min-h-screen bg-stone-50 text-stone-800">{children}</div>
);

const Layout = () => {
  const count = useSelector(selectListItems).length;
  return (
    <Shell>
      <header className="border-b border-stone-200 bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/books" className="font-serif text-xl font-bold text-amber-900">📚 Book List</Link>
          <div className="flex gap-2">
            <NavLink to="/books" className={link}>Browse</NavLink>
            <NavLink to="/reading-list" className={link}>
              To read
              <span className="ml-2 rounded-full bg-stone-200 px-2 py-0.5 text-xs text-stone-800">{count}</span>
            </NavLink>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8"><Outlet /></main>
    </Shell>
  );
};

// Used for unknown URLs and for any unexpected render crash.
export const RouteError = () => {
  const err = useRouteError();
  const notFound = isRouteErrorResponse(err) && err.status === 404;
  return (
    <Shell>
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-serif text-3xl font-bold">{notFound ? "Page not found" : "Something went wrong"}</h1>
        {!notFound && <p className="mt-3 text-stone-600">{err?.message || "An unexpected error occurred."}</p>}
        <Link to="/books" className="mt-6 inline-block rounded-md bg-amber-800 px-5 py-2 text-white hover:bg-amber-900">Back to books</Link>
      </div>
    </Shell>
  );
};

export default Layout;
