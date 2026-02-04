import { forwardRef } from "react";

const Input = forwardRef(({ label, error, className = "", ...props }, ref) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label className="text-sm font-medium text-slate-400">
        {label} {props.required && <span className="text-red-400">*</span>}
      </label>
    )}
    <input
      ref={ref}
      className={`
        w-full px-3 py-2 bg-slate-800 border rounded-lg text-sm text-slate-100
        placeholder-slate-500 focus:outline-none transition-colors
        ${error ? "border-red-600 focus:border-red-500" : "border-slate-700 focus:border-amber-500"}
        ${className}
      `}
      {...props}
    />
    {error && <span className="text-xs text-red-400">{error}</span>}
  </div>
));

Input.displayName = "Input";
export default Input;