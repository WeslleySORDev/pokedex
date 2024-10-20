import { NextRequest } from "next/server";
import { split_array_into_chunks } from "@/utils/array";
import { fetchPokemons } from "@/utils/functions";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  console.time("Total Execution Time");

  console.time("Initial Param Parsing");
  const currentPage = searchParams?.get("currentPage") || "1";
  const itemsPerPage = searchParams?.get("itemsPerPage") || "10";
  const sort = searchParams?.get("sort") || "name";
  const filter = searchParams?.get("filter")?.toLowerCase() || "";
  console.timeEnd("Initial Param Parsing");

  console.time("Fetch Pokemon Data");
  const pokemons_url_and_name = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=905",
    { next: { revalidate: 3600 } },
  ).then((response) => response.json());
  console.timeEnd("Fetch Pokemon Data");

  console.time("Map Pokemon Names");
  const pokemons_name = pokemons_url_and_name.results.map(
    (result: { name: string; url: string }) => result.name,
  );
  console.timeEnd("Map Pokemon Names");

  console.time("Filter Names");
  let filtered_names = pokemons_name;
  if (filter) {
    filtered_names = pokemons_name.filter((name: string) =>
      name.toLowerCase().includes(filter),
    );
  }
  console.timeEnd("Filter Names");

  console.time("Sort Names");
  if (sort === "name") {
    filtered_names.sort((a: string, b: string) => (a > b ? 1 : -1));
  } else if (sort === "id") {
    filtered_names.sort(
      (a: string, b: string) =>
        filtered_names.indexOf(a) - filtered_names.indexOf(b),
    );
  }
  console.timeEnd("Sort Names");

  if (filtered_names.length > 0) {
    console.time("Split Names into Chunks");
    const splited_names_in_chunks = split_array_into_chunks(
      filtered_names,
      parseInt(itemsPerPage),
    );
    console.timeEnd("Split Names into Chunks");

    console.time("Fetch Pokemon Details");
    const pokemons = await fetchPokemons(
      parseInt(currentPage),
      splited_names_in_chunks,
    );
    console.timeEnd("Fetch Pokemon Details");

    console.timeEnd("Total Execution Time");

    return new Response(JSON.stringify(pokemons), {
      headers: { "content-type": "application/json" },
      status: 201,
    });
  }

  console.timeEnd("Total Execution Time");

  return new Response(JSON.stringify([]), {
    headers: { "content-type": "application/json" },
    status: 201,
  });
}
