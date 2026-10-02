// Says what went wrong and offers a way out. Never leave the user with a blank screen.
export default function ErrorBox({ message, onRetry }) {
  return (
    <div className="mx-4 my-3 flex flex-wrap items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
      <span>{message}</span>
      <button onClick={onRetry} className="rounded-full bg-red-400 px-4 py-1 font-semibold text-zinc-950 hover:bg-red-300">
        Retry
      </button>
    </div>
  );
}
