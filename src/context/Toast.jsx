import { createContext, useContext, useState, useCallback } from "react";

// CONTEXT: share a function (show a message) with any component without passing props down.
const ToastContext = createContext(() => {});
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState("");
  const show = useCallback((m) => {
    setMsg(m);
    setTimeout(() => setMsg(""), 2000);
  }, []);
  return (
    <ToastContext.Provider value={show}>
      {children}
      {msg && (
        <div role="status" className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-zinc-950 shadow-lg sm:bottom-6">
          {msg}
        </div>
      )}
    </ToastContext.Provider>
  );
}
