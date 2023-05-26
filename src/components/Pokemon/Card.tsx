import Link from "next/link";

type PokemonCardProps = {
  id?: number;
  name?: string;
  loading?: boolean;
};

export function PokemonCard({ id, name, loading = false }: PokemonCardProps) {
  const formattedID = () => {
    if (id && id.toString().length === 1) return "00" + id;
    if (id && id.toString().length === 2) return "0" + id;
    return id;
  };
  return (
    <>
      {!loading ? (
        <Link
          href={`/pokemon/${name}`}
          className="dropshadow-2dp flex h-[6.5rem] w-[6.5rem] flex-col rounded-lg bg-grayscale-white pt-1 lg:h-[7.25rem] lg:w-[7.25rem]"
        >
          <h2 className="caption mr-2 text-right text-grayscale-medium">
            #{formattedID()}
          </h2>
          <div className="relative mt-auto flex w-full justify-center rounded-[7px] bg-grayscale-background px-2 pb-1 pt-6">
            <img
              loading="lazy"
              className="absolute -top-12 left-[1.125rem] h-[4.5rem] w-[4.5rem]"
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formattedID()}.png`}
              alt=""
            />
            <span className="body-3 line-clamp-1 text-center text-grayscale-dark">
              {name ? name.charAt(0).toUpperCase() + name.slice(1) : "Error"}
            </span>
          </div>
        </Link>
      ) : (
        <div className="dropshadow-2dp flex h-[6.5rem] w-[6.5rem] flex-col rounded-lg bg-grayscale-white pt-1 lg:h-[7.25rem] lg:w-[7.25rem]">
          <h2 className="caption mr-2 text-right text-grayscale-medium">
            #999
          </h2>
          <div className="relative mt-auto flex w-full justify-center rounded-[7px] bg-grayscale-background px-2 pb-1 pt-6">
            <img
              loading="lazy"
              className="absolute -top-12 left-[1.125rem] h-[4.5rem] w-[4.5rem]"
              src="/assets/images/image-not-found.svg"
              alt=""
            />
            <span className="body-3 line-clamp-1 text-center text-grayscale-dark">
              Pokemon Name
            </span>
          </div>
        </div>
      )}
    </>
  );
}
