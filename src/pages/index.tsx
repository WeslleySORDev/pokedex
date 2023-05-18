import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { instance } from "@/services/instance";
import { PaginationPokemon } from "@/types/pagination";
import { Pokemon } from "@/types/pokemon";
import { PokemonCard } from "../components/PokemonCard";
import { Filters } from "../components/Filters";

const LIMIT_POKEMON_FETCH_AT_A_TIME = 10;

type PokemonListAndPaginationProp = {
  pokemons: Pokemon[];
  next: string;
  previous: string;
};

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
  }, [inView, data]);
  return (
    <div className="flex flex-col min-h-[calc(100vh-0.5rem)]">
      <header className="flex flex-col gap-3 px-3 pt-3 mb-6">
        <div className="flex items-center gap-4">
          <svg
            className="fill-grayscale-white w-6 h-6"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M29.7144 24C29.7144 27.1559 27.156 29.7143 24.0001 29.7143C20.8442 29.7143 18.2858 27.1559 18.2858 24C18.2858 20.8441 20.8442 18.2857 24.0001 18.2857C27.156 18.2857 29.7144 20.8441 29.7144 24Z" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24.0001 48C36.0909 48 46.0934 39.0593 47.7571 27.4286H33.7006C32.2885 31.4235 28.4786 34.2857 24.0001 34.2857C19.5217 34.2857 15.7117 31.4235 14.2997 27.4286H0.243164C1.90681 39.0593 11.9094 48 24.0001 48ZM14.2997 20.5714H0.243164C1.90681 8.94071 11.9094 0 24.0001 0C36.0909 0 46.0934 8.94071 47.7571 20.5714H33.7006C32.2885 16.5765 28.4786 13.7143 24.0001 13.7143C19.5217 13.7143 15.7117 16.5765 14.2997 20.5714ZM29.7144 24C29.7144 27.1559 27.156 29.7143 24.0001 29.7143C20.8442 29.7143 18.2858 27.1559 18.2858 24C18.2858 20.8441 20.8442 18.2857 24.0001 18.2857C27.156 18.2857 29.7144 20.8441 29.7144 24Z"
            />
          </svg>
          <h1 className="headline text-grayscale-white">Pokédex</h1>
        </div>
        <Filters />
      </header>
      <main className="px-3 py-6 bg-grayscale-white inner-shadow rounded-lg flex-1 max-h-full overflow-y-auto">
        <div className="flex flex-wrap justify-center gap-2">
          {data?.pages.map((page) =>
            page.pokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.id + " - " + pokemon.name}
                id={pokemon.id}
                name={pokemon.name}
              />
            ))
          )}
        </div>
        <div
          className="mx-auto w-fit mt-4 invisible"
          aria-label="react-intersection-observer-div"
          ref={ref}
        >
          This is a react-intersection-observer-div to control infinite scroll
        </div>
      </main>
    </div>
  );
}
