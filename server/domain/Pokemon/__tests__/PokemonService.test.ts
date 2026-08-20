import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { PokemonService } from "../PokemonService";
import { PokemonGatewayMock } from "../../../adapters/outbound/__mocks__/PokemonGatewayMock";
import { NotFoundError } from "../../../shared/errors/NotFoundError";

describe("PokemonService", () => {
  test("should return paginated pokemon list with detailed pokemon domain data", async () => {
    const mockGateway = new PokemonGatewayMock();
    const service = new PokemonService(mockGateway);

    const response = await service.getPokemonList({ page: 1, limit: 20 });

    assert.equal(response.total, 1);
    assert.equal(response.page, 1);
    assert.equal(response.limit, 20);
    assert.equal(response.data.length, 1);

    const pokemon = response.data[0];
    assert.equal(pokemon.id, 1);
    assert.equal(pokemon.name, "Bulbasaur");
    assert.equal(pokemon.dominantType, "Grass");
    assert.equal(pokemon.types.length, 2);
    assert.equal(pokemon.types[0].name, "Grass");
    assert.equal(pokemon.abilities.includes("Overgrow"), true);
    assert.equal(pokemon.weight, 69);
    assert.equal(pokemon.height, 7);
    assert.equal(pokemon.baseExperience, 64);
    assert.equal(pokemon.stats.hp, 45);
    assert.equal(pokemon.stats.attack, 49);
    assert.equal(pokemon.isDefault, true);
    assert.equal(pokemon.varietyName, "Bulbasaur");
  });

  test("should fetch single pokemon detail by id", async () => {
    const mockGateway = new PokemonGatewayMock();
    const service = new PokemonService(mockGateway);

    const pokemon = await service.getPokemonByIdOrName("1");

    assert.equal(pokemon.id, 1);
    assert.equal(pokemon.name, "Bulbasaur");
  });

  test("should propagate NotFoundError for non-existent pokemon", async () => {
    const mockGateway = new PokemonGatewayMock();
    const service = new PokemonService(mockGateway);

    await assert.rejects(
      async () => {
        await service.getPokemonByIdOrName("non-existent-pokemon");
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err: any) => err instanceof NotFoundError,
    );
  });
});
