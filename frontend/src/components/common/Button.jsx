const variants = {
  primary: "bg-amber-600 hover:bg-amber-500 text-white",
  secondary: "bg-slate-700 hover:bg-slate-600 text-slate-200",
  danger: "bg-red-700 hover:bg-red-600 text-white",
  ghost: "bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white",
  outline: "border border-slate-600 hover:border-amber-500 text-slate-300 hover:text-amber-400 bg-transparent",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-2.5 text-base",
};

export default function Button({ variant = "primary", size = "md", loading = false, disabled = false, className = "", children, ...props }) {
  return (
    <button
      disabled={disabled || loading}
      className={`
        ${variants[variant]} ${sizes[size]}
        rounded-lg font-medium transition-all duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}