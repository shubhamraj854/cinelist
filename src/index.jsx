import { lazy } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store/store.js";
import { ToastProvider } from "./context/Toast.jsx";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import "./styles.css";

// lazy(): these pages download only when first visited, so the first load is smaller.
const Movie = lazy(() => import("./pages/Movie.jsx"));
const Search = lazy(() => import("./pages/Search.jsx"));
const Watchlist = lazy(() => import("./pages/Watchlist.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "movie/:id", element: <Movie /> },
      { path: "search", element: <Search /> },
      { path: "login", element: <Login /> },
      { path: "watchlist", element: <ProtectedRoute><Watchlist /></ProtectedRoute> }, // login required
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </Provider>
);
