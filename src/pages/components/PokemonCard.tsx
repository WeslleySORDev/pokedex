type PokemonCardProps = {
  id: number;
  name: string;
};

export function PokemonCard({ id, name }: PokemonCardProps) {
  const formattedID = () => {
    if (id.toString().length === 1) return "00" + id;
    if (id.toString().length === 2) return "0" + id;
    return id;
  };
  return (
    <article className="bg-grayscale-white dropshadow-2dp rounded-lg pt-1 flex flex-col w-[6.5rem] h-[6.5rem]">
      <h2 className="caption text-grayscale-medium text-right mr-2">
        #{formattedID()}
      </h2>
      <div className="relative pb-1 px-2 pt-6 rounded-[7px] flex justify-center mt-auto bg-grayscale-background w-full">
        <img
          className="absolute -top-12 left-[1.125rem] w-[4.5rem] h-[4.5rem]"
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formattedID()}.png`}
          alt=""
        />
        <span className="text-grayscale-dark body-3">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </span>
      </div>
    </article>
  );
}
