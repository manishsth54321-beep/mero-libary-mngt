import { forwardRef } from "react";

const Select = forwardRef(
  (
    { label, error, options = [], placeholder, className = "", ...props },
    ref,
  ) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-slate-400">
          {label} {props.required && <span className="text-red-400">*</span>}
        </label>
      )}
      <select
        ref={ref}
        className={`
        w-full px-3 py-2 bg-slate-800 border rounded-lg text-sm text-slate-100
        focus:outline-none transition-colors appearance-none cursor-pointer
        ${error ? "border-red-600 focus:border-red-500" : "border-slate-700 focus:border-amber-500"}
        ${className}
      `}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-slate-800">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  ),
);

Select.displayName = "Select";
export default Select;
