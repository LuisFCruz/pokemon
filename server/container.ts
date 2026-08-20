import { PokeApiAdapter } from "./adapters/outbound/PokeApiAdapter";
import { PokeApiLocationAdapter } from "./adapters/outbound/PokeApiLocationAdapter";
import { PokemonService } from "./domain/Pokemon/PokemonService";
import { LocationService } from "./domain/Location/LocationService";

// Factory to create PokemonService instances
export function createPokemonService(baseUrl?: string): PokemonService {
  const pokeApiAdapter = new PokeApiAdapter(baseUrl);
  return new PokemonService(pokeApiAdapter);
}

// Factory to create LocationService instances
export function createLocationService(baseUrl?: string): LocationService {
  const pokeApiLocationAdapter = new PokeApiLocationAdapter(baseUrl);
  return new LocationService(pokeApiLocationAdapter);
}

// Singleton instances for standard app usage
export const pokemonService = createPokemonService();
export const locationService = createLocationService();
