import { PokeApiAdapter } from "./adapters/outbound/PokeApiAdapter";
import { PokeApiLocationAdapter } from "./adapters/outbound/PokeApiLocationAdapter";
import { PokeApiGenerationAdapter } from "./adapters/outbound/PokeApiGenerationAdapter";
import { PokemonService } from "./domain/Pokemon/PokemonService";
import { LocationService } from "./domain/Location/LocationService";
import { GenerationService } from "./domain/Generation/GenerationService";

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

// Factory to create GenerationService instances
export function createGenerationService(baseUrl?: string): GenerationService {
  const pokeApiGenerationAdapter = new PokeApiGenerationAdapter(baseUrl);
  const pokeApiAdapter = new PokeApiAdapter(baseUrl);
  return new GenerationService(pokeApiGenerationAdapter, pokeApiAdapter);
}

// Singleton instances for standard app usage
export const pokemonService = createPokemonService();
export const locationService = createLocationService();
export const generationService = createGenerationService();
