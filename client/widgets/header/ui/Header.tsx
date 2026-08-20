"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/client/shared/ui";

export const Header: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Pokédex", icon: "🐾" },
    { href: "/locations", label: "Localizações", icon: "🗺️" },
    { href: "/generations", label: "Gerações", icon: "🏛️" },
  ];

  return (
    <header className="relative w-full py-6 mb-4 border-b border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo & Title */}
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/25 ring-4 ring-red-500/10">
            <svg
              className="w-7 h-7 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-2.05.78-3.91 2.05-5.32L12 12.67l5.95-5.99C19.22 8.09 20 9.95 20 12c0 4.41-3.59 8-8 8zm0-14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
                Explorador Pokédex
              </h1>
              <Badge
                variant="default"
                className="bg-red-500/10 text-red-600 dark:text-red-400 border-none"
              >
                Cliente FSD
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Frontend em arquitetura Feature-Sliced Design alimentado por TanStack Query & Axios
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex items-center gap-1.5 p-1.5 bg-zinc-100/80 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/60 shadow-inner">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  isActive
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-md scale-105"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-zinc-800/40"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
