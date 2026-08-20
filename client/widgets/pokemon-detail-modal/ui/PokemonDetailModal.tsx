import React from "react";
import { Modal } from "@/client/shared/ui";
import {
  PokemonDomain,
  PokemonHeaderCard,
  PokemonPhysicalStats,
  PokemonAbilities,
  PokemonBaseStats,
  PokemonEvolutionChain,
} from "@/client/entities/pokemon";

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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`#${String(pokemon.id).padStart(3, "0")} - ${pokemon.name}`}
    >
      <div className="flex flex-col items-center gap-3">
        {/* Top Row: Left Card (Image & Badges) + Right Column (Altura, Peso, Exp) */}
        <div className="flex flex-row items-stretch gap-3 w-full">
          <PokemonHeaderCard pokemon={pokemon} />
          <PokemonPhysicalStats
            height={pokemon.height}
            weight={pokemon.weight}
            baseExperience={pokemon.baseExperience}
          />
        </div>

        {/* Sub-componente: Habilidades */}
        <PokemonAbilities abilities={pokemon.abilities} />

        {/* Sub-componente: Barras de Estatísticas Base */}
        <PokemonBaseStats stats={pokemon.stats} />

        {/* Sub-componente: Cadeia de Evolução (Lazy loading via React Query) */}
        <PokemonEvolutionChain currentPokemonId={pokemon.id} isOpen={isOpen} />
      </div>
    </Modal>
  );
};
