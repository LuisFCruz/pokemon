import React from "react";
import { PaginationLimitSelector } from "./pagination-limit-selector/PaginationLimitSelector";
import { PaginationNavButtons } from "./pagination-nav-buttons/PaginationNavButtons";
import { PaginationPageInput } from "./pagination-page-input/PaginationPageInput";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  isLoading?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  limit,
  onPageChange,
  onLimitChange,
  isLoading = false,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 border-t border-zinc-200/80 dark:border-zinc-800/80 w-full">
      {/* Sub-componente: Select de itens por página */}
      <PaginationLimitSelector
        limit={limit}
        onLimitChange={onLimitChange}
        isLoading={isLoading}
      />

      {/* Controles Principais: << 1 2 3 ... 68 >> + Ir para página */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <PaginationNavButtons
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          isLoading={isLoading}
        />

        <PaginationPageInput
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
