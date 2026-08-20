import React from "react";

export interface PaginationNavButtonsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const PaginationNavButtons: React.FC<PaginationNavButtonsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}) => {
  const getPaginationRange = (): (number | string)[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const range: (number | string)[] = [];
    const delta = 1;

    range.push(1);

    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    if (start > 2) {
      range.push("...");
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (end < totalPages - 1) {
      range.push("...");
    }

    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  };

  const pages = getPaginationRange();

  return (
    <div className="flex items-center gap-1.5 flex-wrap justify-center">
      {/* Botão Anterior (<<) */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1 || isLoading}
        className="px-2.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-700 text-xs font-bold transition-all shadow-sm flex items-center justify-center min-w-[36px] h-9 cursor-pointer"
        aria-label="Página anterior"
      >
        «
      </button>

      {/* Botões Numéricos (1 2 3 ... 68) */}
      {pages.map((page, idx) => {
        if (typeof page === "string") {
          return (
            <span
              key={`dots-${idx}`}
              className="px-2 py-1 text-xs font-bold text-zinc-400 dark:text-zinc-500 select-none"
            >
              ...
            </span>
          );
        }

        const isCurrent = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            disabled={isLoading}
            className={`min-w-[36px] h-9 px-2.5 py-1.5 rounded-xl text-xs font-extrabold transition-all shadow-sm cursor-pointer ${
              isCurrent
                ? "bg-red-500 text-white shadow-red-500/25 shadow-md scale-105"
                : "border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Botão Próximo (>>) */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages || isLoading}
        className="px-2.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-700 text-xs font-bold transition-all shadow-sm flex items-center justify-center min-w-[36px] h-9 cursor-pointer"
        aria-label="Próxima página"
      >
        »
      </button>
    </div>
  );
};
