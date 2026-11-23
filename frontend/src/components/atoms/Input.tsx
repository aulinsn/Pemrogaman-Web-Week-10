import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export default function Input({ hasError = false, className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-lg border bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 ${
        hasError
          ? "border-rose-400 focus:border-rose-500 focus:ring-rose-200"
          : "border-slate-300 focus:border-blue-600 focus:ring-blue-100"
      } ${className}`}
      {...props}
    />
  );
}
