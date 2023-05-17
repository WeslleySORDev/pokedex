import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { instance } from "@/services/instance";
import { PaginationPokemon } from "@/types/pagination";
import { Pokemon } from "@/types/pokemon";
import { PokemonType } from "./components/PokemonType";

type PokemonListAndPaginationProp = {
  pokemons: Pokemon[];
  next: string;
  previous: string;
};

const LIMIT_POKEMON_FETCH_AT_A_TIME = 15;

export default function Home() {
  const { ref, inView } = useInView();
  const { status, data, isFetching, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      ["pokemons-fetch"],
      async ({
        pageParam = "/pokemon/?limit=" +
          LIMIT_POKEMON_FETCH_AT_A_TIME +
          "&offset=0",
      }) => {
        let PokemonList: Pokemon[] = [];
        let Promises: Promise<Pokemon>[] = [];
        const PaginationFetch = await instance
          .get<PaginationPokemon>(pageParam)
          .then((res) => res.data);
        PaginationFetch.results.map((result) =>
          Promises.push(
            instance.get<Pokemon>(result.url).then((res) => res.data)
          )
        );
        await Promise.all(Promises).then((values) => (PokemonList = values));
        const data: PokemonListAndPaginationProp = {
          pokemons: PokemonList,
          next: PaginationFetch.next,
          previous: PaginationFetch.previous,
        };
        console.log(data);
        return data;
      },
      {
        getPreviousPageParam: (firstPage) => firstPage.previous ?? undefined,
        getNextPageParam: (lastPage) => lastPage.next ?? undefined,
      }
    );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <main>
      <PokemonType name="normal"/>
      <PokemonType name="fire"/>
      <PokemonType name="electric"/>
      <PokemonType name="poison"/>
      <PokemonType name="psychic"/>
      {/* {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <>
          {data?.pages.map((page) => (
            <div key={page.next}>
              {page.pokemons.map((pokemon) => (
                <p
                  style={{
                    border: "1px solid gray",
                    borderRadius: "5px",
                    padding: "2rem 1rem",
                    background: `hsla(${pokemon.id * 30}, 60%, 80%, 1)`,
                  }}
                  key={pokemon.name + "-" + pokemon.id}
                >
                  {pokemon.name} - {pokemon.id}
                </p>
              ))}
            </div>
          ))}
          <div aria-label="react-intersection-observer-div" ref={ref}>
            {isFetchingNextPage ? "Carregando" : null}
          </div>
        </>
      )} */}
    </main>
  );
}
