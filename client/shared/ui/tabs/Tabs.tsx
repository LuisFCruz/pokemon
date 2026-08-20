"use client";

import React from "react";

export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex border-b border-zinc-200 dark:border-zinc-800 w-full mb-3">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex-1 py-2 text-xs font-bold text-center border-b-2 transition-all relative ${
              isActive
                ? "border-red-500 text-red-600 dark:text-red-400 font-extrabold"
                : "border-transparent text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 font-medium"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
