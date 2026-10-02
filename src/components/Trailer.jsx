import { forwardRef, useImperativeHandle, useState, useEffect } from "react";

// forwardRef + useImperativeHandle: the PARENT can call trailerRef.current.open() on this component.
const Trailer = forwardRef(function Trailer({ videoKey }, ref) {
  const [open, setOpen] = useState(false);
  useImperativeHandle(ref, () => ({ open: () => setOpen(true), close: () => setOpen(false) }));

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open || !videoKey) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-3" onClick={() => setOpen(false)}>
      <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <div className="aspect-video overflow-hidden rounded-xl bg-black">
          <iframe className="h-full w-full" title="Trailer" allowFullScreen allow="autoplay; encrypted-media"
            src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1`} />
        </div>
        <button onClick={() => setOpen(false)} className="mt-3 rounded-full bg-white/15 px-5 py-2 text-white">Close</button>
      </div>
    </div>
  );
});
export default Trailer;
