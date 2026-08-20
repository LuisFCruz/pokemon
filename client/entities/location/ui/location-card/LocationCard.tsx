import React from "react";
import { LocationDomain } from "../../model/types";
import { Badge } from "@/client/shared/ui";

export interface LocationCardProps {
  location: LocationDomain;
}

const REGION_THEMES: Record<string, { gradient: string; icon: string }> = {
  kanto: {
    gradient: "from-red-500/20 to-orange-500/20 text-red-500",
    icon: "🌋",
  },
  johto: {
    gradient: "from-amber-500/20 to-yellow-500/20 text-amber-500",
    icon: "🏮",
  },
  hoenn: {
    gradient: "from-emerald-500/20 to-teal-500/20 text-emerald-500",
    icon: "🌊",
  },
  sinnoh: {
    gradient: "from-blue-500/20 to-indigo-500/20 text-blue-500",
    icon: "🏔️",
  },
  unova: {
    gradient: "from-zinc-500/20 to-slate-600/20 text-zinc-500",
    icon: "🏙️",
  },
  kalos: {
    gradient: "from-rose-500/20 to-pink-500/20 text-pink-500",
    icon: "🏰",
  },
  alola: {
    gradient: "from-sky-400/20 to-cyan-500/20 text-cyan-500",
    icon: "🌴",
  },
  galar: {
    gradient: "from-purple-500/20 to-violet-500/20 text-purple-500",
    icon: "⚔️",
  },
  paldea: {
    gradient: "from-lime-500/20 to-emerald-500/20 text-lime-500",
    icon: "🍇",
  },
};

export const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  const formattedName = location.name.replace(/-/g, " ");
  const regionKey = (location.region || "").toLowerCase();
  const theme = REGION_THEMES[regionKey] || {
    gradient: "from-red-500/20 to-rose-500/20 text-red-500",
    icon: "🗺️",
  };

  return (
    <div className="group relative flex flex-col justify-between p-5 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden">
      {/* Background Banner Accent */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${theme.gradient} rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none`}
      />

      {/* Top Section */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-black tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
            #{String(location.id).padStart(3, "0")}
          </span>
          {location.region ? (
            <Badge
              variant="default"
              className="bg-red-500/10 text-red-600 dark:text-red-400 capitalize border-none"
            >
              {theme.icon} {location.region}
            </Badge>
          ) : (
            <Badge variant="outline" className="border-none">
              Desconhecida
            </Badge>
          )}
        </div>

        <h3 className="text-lg font-black capitalize text-zinc-900 dark:text-zinc-100 group-hover:text-red-500 transition-colors">
          {formattedName}
        </h3>

        {/* Areas info */}
        {location.areas.length > 0 && (
          <div className="mt-3">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wide">
              Áreas ({location.areas.length}):
            </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {location.areas.slice(0, 3).map((area) => (
                <span
                  key={area}
                  className="px-2 py-0.5 text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-md capitalize"
                >
                  {area.replace(/-/g, " ")}
                </span>
              ))}
              {location.areas.length > 3 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold text-zinc-400">
                  +{location.areas.length - 3} mais
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer: Game Generations */}
      {location.gameGenerations.length > 0 && (
        <div className="relative z-10 mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
          <span>Gerações:</span>
          <div className="flex gap-1">
            {location.gameGenerations.map((gen) => (
              <span
                key={gen}
                className="px-1.5 py-0.5 rounded bg-red-500/10 text-red-600 dark:text-red-400 font-bold capitalize text-[10px]"
              >
                {gen.replace("generation-", "Gen ")}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
