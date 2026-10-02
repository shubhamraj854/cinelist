import { useId, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice.js";

export default function Login() {
  const id = useId(); // unique ids so each label points to its own input
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email)) return setError("Enter your name and a valid email.");
    dispatch(login({ name: name.trim(), email }));
    navigate(state?.from || "/", { replace: true }); // go back to the page they wanted
  }

  const field = "mt-1 w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-3 text-base outline-none focus:border-amber-400";
  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-bold">Log in</h1>
      <p className="mt-1 text-sm text-zinc-400">Demo login for learning. Nothing is sent to a server.</p>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <div><label htmlFor={id + "n"} className="text-sm">Name</label>
          <input id={id + "n"} className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></div>
        <div><label htmlFor={id + "e"} className="text-sm">Email</label>
          <input id={id + "e"} type="email" className={field} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" /></div>
        {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
        <button className="w-full rounded-full bg-amber-400 py-3 font-bold text-zinc-950 hover:bg-amber-300">Log in</button>
      </form>
    </main>
  );
}
