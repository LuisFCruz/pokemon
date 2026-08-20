import React from "react";
import Image from "next/image";
import { Modal } from "@/client/shared/ui";
import { PokemonDomain } from "../../model/types";
import { PokemonTypeBadge } from "../pokemon-type-badge/PokemonTypeBadge";
import { getTypeStyle } from "@/client/shared/lib";

export interface PokemonDetailModalProps {
  pokemon: PokemonDomain | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PokemonDetailModal: React.FC<PokemonDetailModalProps> = ({
  pokemon,
  isOpen,
  onClose,
}) => {
  if (!pokemon) return null;

  const typeStyle = getTypeStyle(pokemon.dominantType);

  const statsList = [
    { label: "HP", value: pokemon.stats.hp, max: 255 },
    { label: "Ataque", value: pokemon.stats.attack, max: 190 },
    { label: "Defesa", value: pokemon.stats.defense, max: 230 },
    { label: "Atq. Esp.", value: pokemon.stats.specialAttack, max: 194 },
    { label: "Def. Esp.", value: pokemon.stats.specialDefense, max: 230 },
    { label: "Velocidade", value: pokemon.stats.speed, max: 200 },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`#${String(pokemon.id).padStart(3, "0")} - ${pokemon.name}`}>
      <div className="flex flex-col items-center gap-6">
        {/* Top Header Card */}
        <div
          className={`w-full rounded-2xl p-6 bg-gradient-to-b ${typeStyle.gradient} border ${typeStyle.border} flex flex-col items-center justify-center relative overflow-hidden`}
        >
          {pokemon.image && (
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              width={180}
              height={180}
              className="object-contain drop-shadow-2xl z-10 hover:scale-105 transition-transform"
              unoptimized
            />
          )}

          <div className="flex gap-2 mt-4 z-10">
            {pokemon.types.map((t) => (
              <PokemonTypeBadge key={t.name} type={t.name} />
            ))}
          </div>
        </div>

        {/* Physical Stats Grid */}
        <div className="grid grid-cols-3 gap-3 w-full text-center">
          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
            <p className="text-xs text-zinc-400 font-medium uppercase">Altura</p>
            <p className="text-base font-bold text-zinc-800 dark:text-zinc-100">
              {pokemon.height / 10} m
            </p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
            <p className="text-xs text-zinc-400 font-medium uppercase">Peso</p>
            <p className="text-base font-bold text-zinc-800 dark:text-zinc-100">
              {pokemon.weight / 10} kg
            </p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
            <p className="text-xs text-zinc-400 font-medium uppercase">Exp. Base</p>
            <p className="text-base font-bold text-zinc-800 dark:text-zinc-100">
              {pokemon.baseExperience || "N/A"}
            </p>
          </div>
        </div>

        {/* Abilities */}
        {pokemon.abilities && pokemon.abilities.length > 0 && (
          <div className="w-full">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Habilidades
            </h4>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map((ability) => (
                <span
                  key={ability}
                  className="px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 capitalize"
                >
                  {ability.replace("-", " ")}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Base Stats Progress Bars */}
        <div className="w-full space-y-3">
          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
            Estatísticas Base
          </h4>
          {statsList.map((stat) => {
            const percentage = Math.min(Math.round((stat.value / stat.max) * 100), 100);
            return (
              <div key={stat.label} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-zinc-500 dark:text-zinc-400">{stat.label}</span>
                  <span className="text-zinc-900 dark:text-zinc-100">{stat.value}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      percentage > 60
                        ? "bg-emerald-500"
                        : percentage > 35
                        ? "bg-amber-500"
                        : "bg-rose-500"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
