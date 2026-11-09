import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout, { RouteError } from "../components/layout/Layout";
import Books from "../components/books/Books";
import BookDetails from "../components/books/BookDetails";
import ReadingList from "../components/books/ReadingList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Navigate to="/books" replace /> },
      { path: "books", element: <Books /> },
      { path: "books/:id", element: <BookDetails /> },
      { path: "reading-list", element: <ReadingList /> },
      { path: "*", element: <RouteError /> },
    ],
  },
]);

export default router;
