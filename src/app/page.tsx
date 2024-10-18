"use client";
import { useState } from "react";
import { split_array_into_chunks } from "./utils/array";
import allPokemonNameAndUrlFromPokeApi from "./utils/all-pokemon-name-and-url-from-poke-api.json";
import { instance } from "./services/axios";
import { useQuery } from "@tanstack/react-query";
import { PokemonCard } from "./components/home-page/pokemon-card";
import { Pagination } from "./components/home-page/pagination";
import { PokemonCardList } from "./components/home-page/pokemon-card-list";
import { Header } from "./components/header/header";

const MAX_ITEMS_ON_PAGE = 20;
// <PokemonType as={pokemon.types[0].type.name} key={pokemon.id}>{pokemon.types[0].type.name}</PokemonType>

export default function Home() {
  const [page, setPage] = useState(1);
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: async () => await fetchPokemonsByPage(page),
  });
  const all_pokemon_name_divided_by_pages = split_array_into_chunks(
    allPokemonNameAndUrlFromPokeApi.pokemons.map((pokemon) => pokemon.name),
    MAX_ITEMS_ON_PAGE,
  );

  const fetchPokemonsByPage = async (page = 1) => {
    const actualPagePokemons = all_pokemon_name_divided_by_pages[page - 1];
    const promiseArray = actualPagePokemons.map((pokemon) =>
      instance.get(pokemon),
    );
    const results = await Promise.allSettled(promiseArray).then(
      function (values) {
        const fulfilledresults = values
          .filter((value) => value.status === "fulfilled")
          .map((value) => value.value.data);
        return fulfilledresults;
      },
    );
    return results;
  };

  return (
    <div className="mx-auto flex max-w-screen-md lg:max-w-screen-lg flex-col rounded bg-primary p-1">
      <Header />
      <main className="flex flex-col">
        <div className="max-h-[calc(100dvh-170.44px)] min-h-[calc(100dvh-170.44px)] overflow-y-auto rounded-lg bg-grayscale-white px-3 py-6 shadow-inner_2dp">
          {isPending ? (
            <div className="flex h-[calc(100dvh-170.44px)] items-center justify-center">
              <span>Loading...</span>
            </div>
          ) : isError ? (
            <div className="flex h-[calc(100dvh-170.44px)] items-center justify-center">
              <span>Error: {error.message}</span>
            </div>
          ) : (
            <PokemonCardList pokemon_list={data} />
          )}
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          MAX_ITEMS_ON_PAGE={MAX_ITEMS_ON_PAGE}
          total_items={allPokemonNameAndUrlFromPokeApi.pokemons.length}
        />
      </main>
    </div>
  );
}
