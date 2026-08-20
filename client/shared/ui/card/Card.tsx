import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-5 transition-all duration-300 shadow-sm ${
        hoverable
          ? "hover:-translate-y-1.5 hover:shadow-xl hover:shadow-zinc-500/10 hover:border-zinc-300 dark:hover:border-zinc-700 cursor-pointer"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
