import React from "react";

export interface PaginationLimitSelectorProps {
  limit: number;
  onLimitChange: (limit: number) => void;
  isLoading?: boolean;
  options?: number[];
}

export const PaginationLimitSelector: React.FC<
  PaginationLimitSelectorProps
> = ({ limit, onLimitChange, isLoading = false, options = [10, 20, 50] }) => {
  return (
    <div className="flex items-center gap-2">
      <select
        value={limit}
        onChange={(e) => onLimitChange(Number(e.target.value))}
        disabled={isLoading}
        className="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 cursor-pointer"
      >
        {options.map((num) => (
          <option key={num} value={num}>
            {num} por página
          </option>
        ))}
      </select>
    </div>
  );
};
