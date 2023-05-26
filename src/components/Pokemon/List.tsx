import { Pokemon } from "pokedex-promise-v2";
import { PokemonCard } from "./Card";
import { memo } from "react";

type PokemonListProps = {
  pokemons: Pokemon[];
};

const PokemonList = ({ pokemons }: PokemonListProps) => {
  console.log("child render");
  return (
    <>
      {pokemons
        .sort((a, b) => a.id - b.id)
        .map((pokemon) => {
          if (pokemon.id <= 1008) {
            return (
              <PokemonCard
                key={pokemon.id + " - " + pokemon.name}
                id={pokemon.id}
                name={pokemon.name}
              />
            );
          }
        })}
    </>
  );
};

export default memo(PokemonList);
