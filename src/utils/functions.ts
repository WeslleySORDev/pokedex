import pLimit from 'p-limit';

export const fetchPokemons = async (
  current_page: number,
  splited_names_in_chunks: string[][],
) => {
  const limit = pLimit(5); // Limitar a 5 requisições simultâneas

  const promise_array = splited_names_in_chunks[current_page - 1].map((pokemon) =>
    limit(() =>
      fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon, {
        next: { revalidate: 3600 },
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching ${pokemon}`);
        }
        return response.json();
      })
    )
  );

  const pokemons_data = await Promise.allSettled(promise_array);
  const fulfilled_results = pokemons_data
    .filter((value) => value.status === "fulfilled")
    .map((value) => (value as PromiseFulfilledResult<any>).value);

  // Armazene o total de Pokémon em uma constante se for fixo
  const total = splited_names_in_chunks.reduce((sum, arr) => sum + arr.length, 0);
  
  return {
    results: fulfilled_results,
    amount_pokemons: total,
  };
};
