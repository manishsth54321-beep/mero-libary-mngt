import { useState, useEffect } from "react";

export default function ErrorMessage({ message, onClose, duration = 5000 }) {
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
    <div className="flex items-start gap-3 bg-red-950 border border-red-800 text-red-300 rounded-lg px-4 py-3 text-sm">
      <span className="text-red-400 mt-0.5">⊘</span>
      <span className="flex-1">{Array.isArray(message) ? message.join(", ") : message}</span>
      <button onClick={() => { setVisible(false); onClose?.(); }} className="text-red-500 hover:text-red-300 leading-none">&times;</button>
    </div>
  );
}