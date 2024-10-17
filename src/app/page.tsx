"use client";
import { useState } from "react";
import { split_array_into_chunks } from "./utils/array";
import allPokemonNameAndUrlFromPokeApi from "./utils/all-pokemon-name-and-url-from-poke-api.json";
import { instance } from "./services/axios";
import { useQuery } from "@tanstack/react-query";
import { PokemonCard } from "./components/home-page/pokemon-card";
import { Pagination } from "./components/home-page/pagination";

const MAX_ITEMS_ON_PAGE = 20;
// <PokemonType as={pokemon.types[0].type.name} key={pokemon.id}>{pokemon.types[0].type.name}</PokemonType>

export default function Home() {
  const [page, setPage] = useState(0);
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: async () => await fetchPokemonsByPage(page),
  });
  const all_pokemon_name_divided_by_pages = split_array_into_chunks(
    allPokemonNameAndUrlFromPokeApi.pokemons.map((pokemon) => pokemon.name),
    MAX_ITEMS_ON_PAGE,
  );

  const fetchPokemonsByPage = async (page = 0) => {
    const actualPagePokemons = all_pokemon_name_divided_by_pages[page];
    const promiseArray = actualPagePokemons.map((pokemon) =>
      instance.get(pokemon),
    );
    const results = await Promise.allSettled(promiseArray).then(
      function (values) {
        const fulfilledresults = values
          .filter((value) => value.status === "fulfilled")
          .map((value) => value.value.data);
        console.log(fulfilledresults[0]);
        return fulfilledresults;
      },
    );
    return results;
  };

  return (
    <div className="flex flex-col">
      <main className="max-h-[calc(100dvh-216.44px)] min-h-[calc(100dvh-216.44px)] overflow-y-auto">
        <div className="mx-1 mb-1 flex flex-wrap place-content-center gap-2 rounded-lg bg-grayscale-white px-3 py-6 shadow-inner_2dp">
          {isPending ? (
            <span>Loading...</span>
          ) : isError ? (
            <span>Error: {error.message}</span>
          ) : (
            data.map((pokemon) => (
              <PokemonCard
                key={`${pokemon.name} - ${pokemon.id}`}
                id={pokemon.id}
                name={pokemon.name}
              />
            ))
          )}
        </div>
      </main>
      <Pagination page={page} setPage={setPage} MAX_ITEMS_ON_PAGE={MAX_ITEMS_ON_PAGE} total_items={allPokemonNameAndUrlFromPokeApi.pokemons.length}/>
    </div>
  );
}
