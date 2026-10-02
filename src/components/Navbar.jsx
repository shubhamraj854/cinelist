import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/themeSlice.js";
import { logout } from "../store/authSlice.js";

const links = [["/", "Home"], ["/search", "Search"], ["/watchlist", "Watchlist"]];

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const mode = useSelector((s) => s.theme.mode);
  const count = useSelector((s) => s.watchlist.items.length);

  const linkClass = (isActive) =>
    "rounded-full px-4 py-1.5 text-sm transition " + (isActive ? "bg-amber-400 font-semibold text-zinc-950" : "text-zinc-300 hover:bg-white/10");
  const label = (l) => (l === "Watchlist" && count > 0 ? `${l} (${count})` : l);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-white/10 bg-zinc-950/85 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3">
          <Link to="/" className="text-xl font-extrabold tracking-tight text-amber-400">CineList</Link>
          {/* Desktop links: hidden on phones (hidden), shown from 640px up (sm:flex) */}
          <ul className="hidden gap-1 sm:flex">
            {links.map(([to, l]) => (
              <li key={to}><NavLink to={to} end={to === "/"} className={({ isActive }) => linkClass(isActive)}>{label(l)}</NavLink></li>
            ))}
          </ul>
          <div className="flex items-center gap-2 text-sm">
            <button onClick={() => dispatch(toggleTheme())} className="rounded-full border border-white/20 px-3 py-1.5 hover:bg-white/10"
              aria-label="Switch between light and dark theme">{mode === "dark" ? "Light" : "Dark"}</button>
            {user ? (
              <button onClick={() => dispatch(logout())} className="rounded-full bg-white/10 px-3 py-1.5 hover:bg-white/20">
                <span className="hidden sm:inline">{user.name} · </span>Log out
              </button>
            ) : (
              <Link to="/login" className="rounded-full bg-amber-400 px-3 py-1.5 font-semibold text-zinc-950">Log in</Link>
            )}
          </div>
        </nav>
      </header>

      {/* Phone tab bar: fixed at the bottom where a thumb reaches; hidden from 640px up */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-white/10 bg-zinc-950/95 pb-[env(safe-area-inset-bottom)] backdrop-blur sm:hidden">
        {links.map(([to, l]) => (
          <NavLink key={to} to={to} end={to === "/"}
            className={({ isActive }) => "flex-1 py-3.5 text-center text-xs font-semibold " + (isActive ? "text-amber-400" : "text-zinc-400")}>
            {label(l)}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
