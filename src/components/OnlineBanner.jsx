import useOnline from "../hooks/useOnline.js";

export default function OnlineBanner() {
  const online = useOnline();
  if (online) return null;
  return <p role="alert" className="bg-red-500 px-4 py-1.5 text-center text-sm font-semibold text-white">You are offline. Some things may not load.</p>;
}
