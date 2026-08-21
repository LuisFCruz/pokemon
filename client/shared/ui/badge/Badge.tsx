import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "solid";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors";

  const variantClasses = {
    default: "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200",
    outline:
      "border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300",
    solid: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
  };

  return (
    <span
      className={`${base} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
