type PokemonTypeProps = {
  name: string;
};

export function PokemonType({ name }: PokemonTypeProps) {
  const pokemonBgVariants: any = {
    bug: "bg-pokemon-type-bug",
    dark: "bg-pokemon-type-dark",
    dragon: "bg-pokemon-type-dragon",
    electric: "bg-pokemon-type-electric",
    fairy: "bg-pokemon-type-fairy",
    fighting: "bg-pokemon-type-fighting",
    fire: "bg-pokemon-type-fire",
    flying: "bg-pokemon-type-flying",
    ghost: "bg-pokemon-type-ghost",
    normal: "bg-pokemon-type-normal",
    grass: "bg-pokemon-type-grass",
    ground: "bg-pokemon-type-ground",
    ice: "bg-pokemon-type-ice",
    poison: "bg-pokemon-type-poison",
    psychic: "bg-pokemon-type-psychic",
    rock: "bg-pokemon-type-rock",
    steel: "bg-pokemon-type-steel",
    water: "bg-pokemon-type-water",
  };
  return (
    <span
      className={`subtitle-3 rounded-[0.625rem] px-2 py-[0.125rem] ${pokemonBgVariants[name]} text-grayscale-white`}
    >
      {name.charAt(0).toUpperCase() + name.slice(1)}
    </span>
  );
}
