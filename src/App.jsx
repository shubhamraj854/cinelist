import { Suspense, useLayoutEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar.jsx";
import SetupNotice from "./components/SetupNotice.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import OnlineBanner from "./components/OnlineBanner.jsx";
import { hasKey } from "./api/tmdb.js";

export default function App() {
  const mode = useSelector((s) => s.theme.mode);

  // useLayoutEffect runs BEFORE the screen is painted, so there is no flash of the wrong theme.
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("light", mode === "light");
  }, [mode]);

  return (
    <div className="min-h-dvh bg-zinc-950 pb-20 text-zinc-100 sm:pb-0">
      <OnlineBanner />
      <Navbar />
      <ErrorBoundary>
        {hasKey ? (
          // Suspense shows a fallback while a lazy-loaded page is still downloading
          <Suspense fallback={<div className="h-72 animate-pulse bg-zinc-900" />}><Outlet /></Suspense>
        ) : <SetupNotice />}
      </ErrorBoundary>
      <ScrollRestoration /> {/* going Back returns you to your old scroll position */}
    </div>
  );
}
