export default function SetupNotice() {
  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-2xl font-bold text-amber-400">One quick setup step</h1>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-zinc-300">
        <li>Create a free account at themoviedb.org, then open Settings → API and copy your API Key.</li>
        <li>In the project folder, copy <code className="text-amber-300">.env.example</code> to a new file named <code className="text-amber-300">.env</code>.</li>
        <li>Paste your key after <code className="text-amber-300">TMDB_API_KEY=</code> in that file.</li>
        <li>Stop the server, delete the <code className="text-amber-300">.parcel-cache</code> folder, and run <code className="text-amber-300">npm start</code> again.</li>
      </ol>
    </main>
  );
}
