import { useSyncExternalStore } from "react";

// useSyncExternalStore: read a value that lives OUTSIDE React (the browser's online status).
const subscribe = (cb) => {
  window.addEventListener("online", cb);
  window.addEventListener("offline", cb);
  return () => { window.removeEventListener("online", cb); window.removeEventListener("offline", cb); };
};
export default function useOnline() {
  return useSyncExternalStore(subscribe, () => navigator.onLine, () => true);
}
