import React from "react";

export const PokemonSkeleton: React.FC = () => {
  return (
    <div className="rounded-3xl bg-white/60 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60 p-5 animate-pulse flex flex-col justify-between h-[340px]">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="h-3 w-12 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
          <div className="h-6 w-28 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
        </div>
        <div className="h-5 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
      </div>
      <div className="flex justify-center items-center my-4">
        <div className="w-32 h-32 rounded-full bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex justify-between">
        <div className="h-4 w-10 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-4 w-10 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-4 w-10 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-4 w-10 bg-zinc-200 dark:bg-zinc-800 rounded" />
      </div>
    </div>
  );
};
