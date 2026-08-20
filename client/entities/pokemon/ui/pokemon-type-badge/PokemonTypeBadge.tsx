import React from "react";
import { getTypeStyle } from "@/client/shared/lib";

export interface PokemonTypeBadgeProps {
  type: string;
}

export const PokemonTypeBadge: React.FC<PokemonTypeBadgeProps> = ({ type }) => {
  const style = getTypeStyle(type);
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-xs ${style.badgeBg}`}
    >
      {type}
    </span>
  );
};
