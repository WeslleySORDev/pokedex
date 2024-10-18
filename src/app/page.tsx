"use client";
import { useEffect, useState } from "react";
import { Pagination } from "../components/home-page/pagination";
import { PokemonCardList } from "../components/home-page/pokemon-card-list";
import { Header } from "../components/header/header";

const MAX_ITEMS_ON_PAGE = 50;
// <PokemonType as={pokemon.types[0].type.name} key={pokemon.id}>{pokemon.types[0].type.name}</PokemonType>

export default function Home() {
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemons, setPokemons] = useState();
  const updatePokemons = async () => {
    const data = await fetch(
      `/api/pokemons?itemsPerPage=${MAX_ITEMS_ON_PAGE}&currentPage=${currentPage}`,
      {
        cache: "force-cache", // Apenas se necessário
      },
    ).then((response) => response.json());
    console.log(data)
    setPokemons(data);
  };
  useEffect(() => {
    updatePokemons();
  }, [currentPage]);
  if (!pokemons) return <h1>Carregando</h1>;
  return (
    <div className="mx-auto flex max-w-screen-md flex-col rounded bg-primary p-1 lg:max-w-screen-lg">
      <Header />
      <main className="flex flex-col">
        <div className="max-h-[calc(100dvh-170.44px)] min-h-[calc(100dvh-170.44px)] overflow-y-auto rounded-lg bg-grayscale-white px-3 py-6 shadow-inner_2dp lg:max-h-[calc(100dvh-176px)] lg:min-h-[calc(100dvh-176px)]">
          <PokemonCardList pokemon_list={pokemons.results} />
        </div>
        <Pagination
          page={currentPage}
          setPage={setCurrentPage}
          MAX_ITEMS_ON_PAGE={MAX_ITEMS_ON_PAGE}
          total_items={pokemons ? pokemons.amount_pokemons : 0}
        />
      </main>
    </div>
  );
}
