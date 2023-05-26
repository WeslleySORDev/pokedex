import { Pokemon } from "pokedex-promise-v2";
import { PokemonCard } from "./Card";
import React, { memo } from "react";

type PokemonListProps = {
  pokemons: Pokemon[];
};

const PokemonList = ({ pokemons }: PokemonListProps) => {
  return (
    <>
      {pokemons
        .sort((a, b) => a.id - b.id)
        .map((pokemon) => {
          return (
            <React.Fragment key={pokemon.id + " - " + pokemon.name}>
              <PokemonCard id={pokemon.id} name={pokemon.name} />
            </React.Fragment>
          );
        })}
    </>
  );
};

export default memo(PokemonList);
