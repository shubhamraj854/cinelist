import { Component } from "react";

// Error boundaries must be class components. If anything below crashes, show this instead of a white screen.
export default class ErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="p-8 text-center">
        <p>Something went wrong on this page.</p>
        <button onClick={() => location.reload()} className="mt-3 rounded-full bg-amber-400 px-5 py-2 font-semibold text-zinc-950">Reload</button>
      </div>
    );
  }
}
