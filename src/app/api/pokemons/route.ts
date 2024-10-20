import { NextRequest } from "next/server";
import { split_array_into_chunks } from "@/utils/array";

const fetchPokemonsByPage = async (
  page: number,
  itemsPerPage: number,
  splited_names_in_chunks: string[][],
) => {
  const promiseArray = splited_names_in_chunks[page - 1].map((pokemon) =>
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon, {
      next: { revalidate: 3600 },
    }).then((response) => response.json()),
  );
  const results = await Promise.allSettled(promiseArray).then((values) => {
    const fulfilledResults = values
      .filter((value) => value.status === "fulfilled")
      .map((value) => (value as PromiseFulfilledResult<any>).value);
    return fulfilledResults;
  });
  return {
    results: results,
    amount_pokemons: splited_names_in_chunks.length * itemsPerPage,
  };
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const currentPage = searchParams?.get("currentPage") || "1";
  const itemsPerPage = searchParams?.get("itemsPerPage") || "10";
  const filter = searchParams?.get("filter")?.toLowerCase() || "";
  const sort = searchParams?.get("sort") || "name";

  const data = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=905",
    { next: { revalidate: 3600 } },
  ).then((response) => response.json());
  const names = data.results.map(
    (result: { name: string; url: string }) => result.name,
  );
  let filtered_names = names;
  if (filter) {
    filtered_names = names.filter((name: string) =>
      name.toLowerCase().includes(filter),
    );
  }
  const splited_names_in_chunks = split_array_into_chunks(
    filtered_names,
    parseInt(itemsPerPage),
  );
  const pokemons = await fetchPokemonsByPage(
    parseInt(currentPage),
    parseInt(itemsPerPage),
    splited_names_in_chunks,
  );
  return new Response(JSON.stringify(pokemons), {
    headers: { "content-type": "application/json" },
    status: 201,
  });
}
