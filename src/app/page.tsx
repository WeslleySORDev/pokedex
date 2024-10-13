import allPokemonNameAndUrlFromPokeApi from "./utils/all-pokemon-name-and-url-from-poke-api.json";

const MAX_ITEMS_ON_PAGE = 20;

export default function Home() {
  const split_array_into_chunks = (
    array: string[],
    size: number
  ): string[][] => {
    const result: string[][] = [];
    for (let i = 0; i < array.length; i += size) {
      const chunk = array.slice(i, i + size);
      result.push(chunk);
    }
    return result;
  };
  const all_pokemon_url_divided_by_pages = split_array_into_chunks(
    allPokemonNameAndUrlFromPokeApi.pokemons.map((pokemon) => pokemon.url),
    MAX_ITEMS_ON_PAGE
  );
  return (
    <main>
      {all_pokemon_url_divided_by_pages[0].map(pokemon => (
        <p>{pokemon}</p>
      ))}
    </main>
  );
}
