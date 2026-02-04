import { useState, useEffect } from "react";

export default function SuccessMessage({ message, duration = 4000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!message) return;
    setVisible(true);
    if (duration) {
      const t = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(t);
    }
  }, [message, duration]);

  if (!message || !visible) return null;

  return (
    <div className="flex items-center gap-3 bg-emerald-950 border border-emerald-800 text-emerald-300 rounded-lg px-4 py-3 text-sm">
      <span className="text-emerald-400">✓</span>
      <span>{message}</span>
    </div>
  );
}