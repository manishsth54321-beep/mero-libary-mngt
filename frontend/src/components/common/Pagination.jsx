export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    const delta = 2;
    const left = currentPage - delta;
    const right = currentPage + delta;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i <= right)) {
        pages.push(i);
      }
    }

    const result = [];
    let prev = null;
    for (const p of pages) {
      if (prev && p - prev > 1) result.push("...");
      result.push(p);
      prev = p;
    }
    return result;
  };

  const btn = (child, page, disabled = false) => (
    <button
      key={`${child}-${page}`}
      disabled={disabled}
      onClick={() => !disabled && onPageChange(page)}
      className={`
        w-9 h-9 rounded-md text-sm font-medium transition-all
        ${disabled ? "text-slate-600 cursor-not-allowed" : "text-slate-300 hover:bg-slate-700 hover:text-white cursor-pointer"}
        ${page === currentPage ? "bg-amber-600 text-white hover:bg-amber-500" : ""}
      `}
    >
      {child}
    </button>
  );

  return (
    <div className="flex items-center justify-center gap-1 mt-6">
      {btn("←", currentPage - 1, currentPage === 1)}
      {getPages().map((p, i) =>
        p === "..." ? <span key={`dots-${i}`} className="text-slate-500 w-6 text-center">•••</span> : btn(p, p)
      )}
      {btn("→", currentPage + 1, currentPage === totalPages)}
    </div>
  );
}