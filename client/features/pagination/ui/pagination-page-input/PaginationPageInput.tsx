import React, { useState } from "react";

export interface PaginationPageInputProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const PaginationPageInput: React.FC<PaginationPageInputProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}) => {
  const [pageInput, setPageInput] = useState<string>(String(currentPage));
  const [prevCurrentPage, setPrevCurrentPage] = useState<number>(currentPage);

  if (prevCurrentPage !== currentPage) {
    setPrevCurrentPage(currentPage);
    setPageInput(String(currentPage));
  }

  const handlePageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetPage = parseInt(pageInput, 10);
    if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= totalPages) {
      onPageChange(targetPage);
    } else {
      setPageInput(String(currentPage));
    }
  };

  return (
    <form
      onSubmit={handlePageSubmit}
      className="flex items-center gap-1.5 px-2"
    >
      <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
        Pág.
      </span>
      <input
        type="number"
        min={1}
        max={totalPages}
        value={pageInput}
        onChange={(e) => setPageInput(e.target.value)}
        disabled={isLoading}
        className="w-14 h-8 text-center text-xs font-extrabold rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-red-500/50"
      />
      <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
        de {totalPages || 1}
      </span>
      <button
        type="submit"
        disabled={isLoading}
        className="px-2.5 py-1 text-xs font-bold rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
      >
        Ir
      </button>
    </form>
  );
};
