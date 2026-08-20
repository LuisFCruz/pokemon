import { PokeApiAdapter } from './adapters/outbound/PokeApiAdapter';
import { PokemonService } from './domain/Pokemon/PokemonService';

// Factory to create instances (allows injecting custom gateways if needed)
export function createPokemonService(baseUrl?: string): PokemonService {
  const pokeApiAdapter = new PokeApiAdapter(baseUrl);
  return new PokemonService(pokeApiAdapter);
}

// Singleton instance for standard app usage
export const pokemonService = createPokemonService();
