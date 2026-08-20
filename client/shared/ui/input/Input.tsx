import React, { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  icon,
  className = "",
  ...props
}) => {
  return (
    <div className="relative flex items-center w-full">
      {icon && (
        <div className="absolute left-3.5 text-zinc-400 dark:text-zinc-500 pointer-events-none">
          {icon}
        </div>
      )}
      <input
        className={`w-full py-2.5 ${
          icon ? "pl-10" : "pl-4"
        } pr-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500/50 shadow-sm ${className}`}
        {...props}
      />
    </div>
  );
};
