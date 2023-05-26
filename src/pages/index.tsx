import { useInfiniteQuery } from "@tanstack/react-query";
import { Filters } from "../components/Filters";

import Pokedex, { Pokemon } from "pokedex-promise-v2";
import Head from "next/head";
import PokemonList from "@/components/PokemonList";

const options = {
  versionPath: "/api/v2/",
  cacheLimit: 100 * 1000, // 100s
  timeout: 5 * 1000, // 5s
};
const P = new Pokedex(options);

const LIMIT_POKEMON_FETCH_AT_A_TIME = 50;

type PokemonListAndPaginationProp = {
  pokemons: Pokemon[];
  next: string | null;
  previous: string | null;
};

export default function Home() {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      ["pokemons-fetch"],
      async ({
        pageParam = "/pokemon/?limit=" +
          LIMIT_POKEMON_FETCH_AT_A_TIME +
          "&offset=0",
      }) => {
        var data: PokemonListAndPaginationProp = {
          next: "",
          previous: "",
          pokemons: [],
        };
        await P.getPokemonsList({
          limit: LIMIT_POKEMON_FETCH_AT_A_TIME,
          offset: pageParam.split("offset=")[1].split("&limit")[0],
        }).then(async (response) => {
          data.next = response.next;
          data.previous = response.previous;
          const promises = response.results.map(
            async (result) =>
              await P.getPokemonByName(result.name).then((res) => res)
          );
          await Promise.all(promises).then(
            (values) => (data.pokemons = values.slice(0))
          );
        });
        return data;
      },
      {
        getPreviousPageParam: (firstPage) => firstPage.previous ?? undefined,
        getNextPageParam: (lastPage) => lastPage.next ?? undefined,
      }
    );
  return (
    <>
      <Head>
        <title>Pokedex - Home Page</title>
      </Head>
      <div className="flex flex-col px-4 py-1 min-h-[calc(100vh-0.5rem)] max-h-[calc(100vh-0.5rem)] bg-identity-primary">
        <header className="flex flex-col gap-3 pt-3 mb-6">
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
        <main className="pt-6 bg-grayscale-white inner-shadow rounded-lg flex flex-col flex-1 overflow-y-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {data &&
              data.pages.map((page) => (
                <PokemonList pokemons={page.pokemons} />
              ))}
          </div>
          <div className="my-6 flex items-center">
            {hasNextPage ? (
              <button
                disabled={isFetchingNextPage}
                className="w-3/4 px-2 py-4 bg-identity-primary text-grayscale-white font-semibold rounded-md mx-auto"
                onClick={() => fetchNextPage()}
              >
                {isFetchingNextPage
                  ? "Loading ..."
                  : `Load more ${LIMIT_POKEMON_FETCH_AT_A_TIME}`}
              </button>
            ) : null}
          </div>
        </main>
      </div>
    </>
  );
}
