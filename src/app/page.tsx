"use client";
import { useEffect, useState } from "react";
import { split_array_into_chunks } from "./utils/array";
import allPokemonNameAndUrlFromPokeApi from "./utils/all-pokemon-name-and-url-from-poke-api.json";
import { instance } from "./services/axios";
import { useQuery } from "@tanstack/react-query";
import { PokemonCard } from "./components/ui/pokemon-card";
import HeaderText from "./components/ui/header-text";

const MAX_ITEMS_ON_PAGE = 20;
// <PokemonType as={pokemon.types[0].type.name} key={pokemon.id}>{pokemon.types[0].type.name}</PokemonType>

export default function Home() {
  const [page, setPage] = useState(0);
  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["pokemons", page],
      queryFn: async () => await fetchPokemonsByPage(page),
    });
  const all_pokemon_name_divided_by_pages = split_array_into_chunks(
    allPokemonNameAndUrlFromPokeApi.pokemons.map((pokemon) => pokemon.name),
    MAX_ITEMS_ON_PAGE
  );

  const fetchPokemonsByPage = async (page = 0) => {
    const actualPagePokemons = all_pokemon_name_divided_by_pages[page];
    const promiseArray = actualPagePokemons.map((pokemon) =>
      instance.get(pokemon)
    );
    const results = await Promise.allSettled(promiseArray).then(function (
      values
    ) {
      const fulfilledresults = values
        .filter((value) => value.status === "fulfilled")
        .map((value) => value.value.data);
      console.log(fulfilledresults[0]);
      return fulfilledresults;
    });
    return results;
  };

  useEffect(() => {
    fetchPokemonsByPage();
  }, []);
  return (
    <div className="flex flex-col">
      <main className="max-h-[calc(100dvh-216.44px)] min-h-[calc(100dvh-216.44px)] overflow-y-auto">
        <div className="flex flex-wrap gap-2 bg-grayscale-white place-content-center px-3 py-6 mx-1 mb-1 rounded-lg shadow-[inset_0px_2px_2px_rgba(0,_0,_0,_0.14),_inset_0px_3px_1px_rgba(0,_0,_0,_0.12),inset_0px_1px_5px_rgba(0,_0,_0,_0.2)]">
          {isPending ? (
            <span>Loading...</span>
          ) : isError ? (
            <span>Error: {error.message}</span>
          ) : (
            data.map((pokemon) => (
              <PokemonCard id={pokemon.id} name={pokemon.name} />
            ))
          )}
        </div>
      </main>
      <div className="flex flex-col gap-4 items-center p-2">
        <span>Current Page: {page + 1}</span>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-grayscale-white text-primary rounded"
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 0}
          >
            Previous Page
          </button>
          <button
          className="px-4 py-2 bg-grayscale-white text-primary rounded"
            onClick={() => {
              setPage((old) => old + 1);
            }}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
}
