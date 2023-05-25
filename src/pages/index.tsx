import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { PokemonCard } from "../components/PokemonCard";
import { Filters } from "../components/Filters";

import Pokedex, { Pokemon } from "pokedex-promise-v2";
import Head from "next/head";

const options = {
  versionPath: "/api/v2/",
  cacheLimit: 100 * 1000, // 100s
  timeout: 5 * 1000, // 5s
};
const P = new Pokedex(options);

const LIMIT_POKEMON_FETCH_AT_A_TIME = 10;

type PokemonListAndPaginationProp = {
  pokemons: Pokemon[];
  next: string | null;
  previous: string | null;
};

export default function Home() {
  const { ref, inView } = useInView();
  const { data, isLoading, fetchNextPage } = useInfiniteQuery(
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

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, data]);
  return (
    <>
      <Head>
        <title>Pokedex - Home Page</title>
      </Head>
      <div className="flex flex-col h-[calc(100vh-0.5rem)]">
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
        <main className="px-3 py-6 bg-grayscale-white inner-shadow rounded-lg flex-1 h-full max-h-full overflow-y-auto">
          <div className="flex flex-wrap items-center h-full justify-center gap-2">
            {!isLoading ? (
              data &&
              data.pages.map((page) =>
                page.pokemons
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
                  })
              )
            ) : (
              <div
                role="status"
              >
                <svg
                  aria-hidden="true"
                  className="inline w-12 h-12 mr-2 text-grayscale-dark animate-spin fill-identity-primary"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
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
    </>
  );
}
