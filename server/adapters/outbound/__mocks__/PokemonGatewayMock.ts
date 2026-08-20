import {
  IPokemonGateway,
  PokeApiNamedResource,
  PokeApiPokemonDetailDTO,
  PokeApiPokemonListDTO,
} from '../../../ports/IPokemonGateway';
import { PokemonListQueryParams } from '../../../domain/Pokemon/Pokemon.types';
import { NotFoundError } from '../../../shared/errors/NotFoundError';

export class PokemonGatewayMock implements IPokemonGateway {
  public mockDetails: Record<string, PokeApiPokemonDetailDTO> = {
    '1': {
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      base_experience: 64,
      is_default: true,
      abilities: [
        { ability: { name: 'overgrow', url: '' }, is_hidden: false, slot: 1 },
        { ability: { name: 'chlorophyll', url: '' }, is_hidden: true, slot: 3 },
      ],
      types: [
        { slot: 1, type: { name: 'grass', url: '' } },
        { slot: 2, type: { name: 'poison', url: '' } },
      ],
      stats: [
        { base_stat: 45, effort: 0, stat: { name: 'hp', url: '' } },
        { base_stat: 49, effort: 0, stat: { name: 'attack', url: '' } },
        { base_stat: 49, effort: 0, stat: { name: 'defense', url: '' } },
        { base_stat: 65, effort: 1, stat: { name: 'special-attack', url: '' } },
        { base_stat: 65, effort: 0, stat: { name: 'special-defense', url: '' } },
        { base_stat: 45, effort: 0, stat: { name: 'speed', url: '' } },
      ],
      sprites: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        other: {
          'official-artwork': {
            front_default:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
          },
        },
      },
      species: { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
    },
  };

  async getPokemonList(params: PokemonListQueryParams): Promise<PokeApiPokemonListDTO> {
    return {
      count: 1,
      next: null,
      previous: null,
      results: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
    };
  }

  async getPokemonDetail(idOrName: string | number): Promise<PokeApiPokemonDetailDTO> {
    const key = String(idOrName).toLowerCase();
    if (this.mockDetails[key]) {
      return this.mockDetails[key];
    }
    throw new NotFoundError(`Pokemon '${idOrName}' not found in mock gateway.`);
  }

  async getPokemonDetailsInParallel(items: PokeApiNamedResource[]): Promise<PokeApiPokemonDetailDTO[]> {
    return Promise.all(items.map((item) => this.getPokemonDetail(item.name)));
  }
}
