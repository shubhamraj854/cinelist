import { useState, useEffect } from "react";

// Returns the value only after it stops changing for "delay" ms. Stops us calling the API on every keystroke.
export default function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}
