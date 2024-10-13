"use client";
import { useEffect, useState } from "react";
import { split_array_into_chunks } from "./utils/array";
import allPokemonNameAndUrlFromPokeApi from "./utils/all-pokemon-name-and-url-from-poke-api.json";
import { instance } from "./services/axios";
import { useQuery } from "@tanstack/react-query";

const MAX_ITEMS_ON_PAGE = 20;

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
      return fulfilledresults;
    });
    return results;
  };

  useEffect(() => {
    fetchPokemonsByPage();
  }, []);
  return (
    <div>
      {isPending ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data.map((pokemon) => (
            <p key={pokemon.id}>{pokemon.name}</p>
          ))}
        </div>
      )}
      <span>Current Page: {page + 1}</span>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>
      <button
        onClick={() => {
          setPage((old) => old + 1);
        }}
      >
        Next Page
      </button>
      {isFetching ? <span> Loading...</span> : null}
    </div>
  );
}
