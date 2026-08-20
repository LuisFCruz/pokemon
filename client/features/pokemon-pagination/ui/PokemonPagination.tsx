import React from "react";
import { Button } from "@/client/shared/ui";

export interface PokemonPaginationProps {
  currentPage: number;
  totalPages: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  isLoading?: boolean;
}

export const PokemonPagination: React.FC<PokemonPaginationProps> = ({
  currentPage,
  totalPages,
  limit,
  onPageChange,
  onLimitChange,
  isLoading = false,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-zinc-200/80 dark:border-zinc-800/80 w-full">
      {/* Items per page selector */}
      <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
        <span>Por página:</span>
        {[10, 20, 50].map((num) => (
          <button
            key={num}
            onClick={() => onLimitChange(num)}
            disabled={isLoading}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              limit === num
                ? "bg-red-500 text-white font-bold"
                : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1 || isLoading}
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Anterior
        </Button>

        <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 px-2">
          Página <strong className="text-zinc-900 dark:text-white font-extrabold">{currentPage}</strong> de{" "}
          <strong className="text-zinc-900 dark:text-white font-extrabold">{totalPages || 1}</strong>
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || isLoading}
        >
          Próximo
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
};
