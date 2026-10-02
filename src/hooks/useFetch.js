import { useState, useEffect } from "react";
import { tmdb } from "../api/tmdb.js";

// CUSTOM HOOK: our own hook that bundles useState + useEffect.
// Any component can now write:  const { data, loading, error, retry } = useFetch("/movie/popular");
export default function useFetch(path) {
  const [state, setState] = useState({ data: null, loading: true, error: "" });
  const [tries, setTries] = useState(0); // changing this re-runs the effect (the Retry button)

  useEffect(() => {
    const controller = new AbortController(); // lets us cancel the request
    setState({ data: null, loading: true, error: "" });

    tmdb(path, controller.signal)
      .then((data) => setState({ data, loading: false, error: "" }))
      .catch((e) => {
        if (e.name !== "AbortError") setState({ data: null, loading: false, error: e.message });
      });

    // CLEANUP: runs when the component leaves the screen or "path" changes.
    // Without it, an old request could update a component that no longer exists.
    return () => controller.abort();
  }, [path, tries]);

  return { ...state, retry: () => setTries((t) => t + 1) };
}
