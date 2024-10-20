import { PokemonCard } from "./pokemon-card";

type PokemonCardListType = {
  pokemon_list: any;
};

export function PokemonCardList({ pokemon_list }: PokemonCardListType) {
  return (
    <div className="grid grid-cols-2 place-items-center gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {pokemon_list && pokemon_list.length > 0
        ? pokemon_list.map((pokemon) => (
            <PokemonCard
              key={`${pokemon.name} - ${pokemon.id}`}
              id={pokemon.id}
              name={pokemon.name}
            />
          ))
        : null}
    </div>
  );
}
