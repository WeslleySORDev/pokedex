import { PokemonCard } from "./pokemon-card";

type PokemonCardListType = {
  pokemon_list: any[];
};

export function PokemonCardList({ pokemon_list }: PokemonCardListType) {
  return (
    <div className="place-items-center grid grid-cols-2 sm:grid-cols-3 gap-2">
      {pokemon_list.map((pokemon) => (
        <PokemonCard
          key={`${pokemon.name} - ${pokemon.id}`}
          id={pokemon.id}
          name={pokemon.name}
        />
      ))}
    </div>
  );
}
