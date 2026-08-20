"use client";

import React, { useState } from "react";
import { Modal, Tabs, TabItem } from "@/client/shared/ui";
import {
  PokemonDomain,
  PokemonHeaderCard,
  PokemonPhysicalStats,
  PokemonAbilities,
  PokemonBaseStats,
  PokemonEvolutionChain,
  PokemonVariations,
} from "@/client/entities/pokemon";

export interface PokemonDetailModalProps {
  pokemon: PokemonDomain | null;
  isOpen: boolean;
  onClose: () => void;
}

const MODAL_TABS: TabItem[] = [
  { id: "info", label: "Informações" },
  { id: "evolutions", label: "Evoluções" },
  { id: "variations", label: "Variações" },
];

export const PokemonDetailModal: React.FC<PokemonDetailModalProps> = ({
  pokemon,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<string>("info");
  const [prevPokemonId, setPrevPokemonId] = useState<number | null>(pokemon?.id ?? null);
  const [prevIsOpen, setPrevIsOpen] = useState<boolean>(isOpen);

  // Sync state: reset activeTab to "info" when modal opens or selected pokemon changes
  if (prevPokemonId !== (pokemon?.id ?? null) || prevIsOpen !== isOpen) {
    setPrevPokemonId(pokemon?.id ?? null);
    setPrevIsOpen(isOpen);
    if (!isOpen || prevPokemonId !== (pokemon?.id ?? null)) {
      setActiveTab("info");
    }
  }

  const handleClose = () => {
    setActiveTab("info");
    onClose();
  };

  if (!pokemon) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`#${String(pokemon.id).padStart(3, "0")} - ${pokemon.name}`}
    >
      <div className="flex flex-col items-center gap-3">
        {/* Top Header Card + Physical Stats */}
        <div className="flex flex-row items-stretch gap-3 w-full">
          <PokemonHeaderCard pokemon={pokemon} />
          <PokemonPhysicalStats
            height={pokemon.height}
            weight={pokemon.weight}
            baseExperience={pokemon.baseExperience}
          />
        </div>

        {/* Tabs Bar */}
        <Tabs
          tabs={MODAL_TABS}
          activeTab={activeTab}
          onChange={(tabId) => setActiveTab(tabId)}
        />

        {/* Tab Content */}
        <div className="w-full">
          {activeTab === "info" && (
            <div className="space-y-3">
              <PokemonAbilities abilities={pokemon.abilities} />
              <PokemonBaseStats stats={pokemon.stats} />
            </div>
          )}

          {activeTab === "evolutions" && (
            <PokemonEvolutionChain
              currentPokemonId={pokemon.id}
              isOpen={isOpen}
            />
          )}

          {activeTab === "variations" && (
            <PokemonVariations currentPokemonId={pokemon.id} isOpen={isOpen} />
          )}
        </div>
      </div>
    </Modal>
  );
};
