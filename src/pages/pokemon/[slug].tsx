import Link from "next/link";

import { PokemonType } from "@/components/Pokemon/Type";
import Pokedex, { Pokemon } from "pokedex-promise-v2";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PokeballSVG } from "@/components/Pokemon/PokeballSVG";
import { PokemonAttribute } from "@/components/Pokemon/Attribute";
import { PokemonBaseStats } from "@/components/Pokemon/BaseStats";
import Head from "next/head";

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

const pokemonTextVariants: any = {
  bug: "text-pokemon-type-bug",
  dark: "text-pokemon-type-dark",
  dragon: "text-pokemon-type-dragon",
  electric: "text-pokemon-type-electric",
  fairy: "text-pokemon-type-fairy",
  fighting: "text-pokemon-type-fighting",
  fire: "text-pokemon-type-fire",
  flying: "text-pokemon-type-flying",
  ghost: "text-pokemon-type-ghost",
  normal: "text-pokemon-type-normal",
  grass: "text-pokemon-type-grass",
  ground: "text-pokemon-type-ground",
  ice: "text-pokemon-type-ice",
  poison: "text-pokemon-type-poison",
  psychic: "text-pokemon-type-psychic",
  rock: "text-pokemon-type-rock",
  steel: "text-pokemon-type-steel",
  water: "text-pokemon-type-water",
};

const options = {
  versionPath: "/api/v2/",
  cacheLimit: 100 * 1000, // 100s
  timeout: 5 * 1000, // 5s
};
const P = new Pokedex(options);

export default function PokemonPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon);
  const [description, setDescription] = useState("");
  const formattedID = () => {
    if (pokemon.id && pokemon.id.toString().length === 1)
      return "00" + pokemon.id;
    if (pokemon.id && pokemon.id.toString().length === 2)
      return "0" + pokemon.id;
    return pokemon.id;
  };
  useEffect(() => {
    if (slug) {
      P.getPokemonByName(slug as string).then((res) => {
        setPokemon(res);
      });
    }
  }, [slug]);

  useEffect(() => {
    if (pokemon.name) {
      fetch("https://pokeapi.co/api/v2/pokemon-species/" + pokemon.name)
        .then((res) => res.json())
        .then((data) => {
          setDescription(
            data.flavor_text_entries.filter(
              (flavor: any) => flavor.language.name === "en"
            )[0].flavor_text
          );
        });
    }
  }, [pokemon]);
  if (Object.keys(pokemon).length === 0) return null;
  return (
    <>
    <Head>
      <title>Pokedex - {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</title>
    </Head>
    <div
      className={`relative flex flex-col ${
        pokemonBgVariants[pokemon.types[0].type.name]
      } p-1`}
    >
      <PokeballSVG />
      <header className="z-10 flex flex-col text-grayscale-white">
        <div className="flex items-center gap-2 p-5">
          <Link href="/">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_1112_900)">
                <path
                  d="M14.8999 25.9666L5.63325 16.6999C5.52214 16.5888 5.44436 16.4777 5.39992 16.3666C5.35547 16.2555 5.33325 16.1333 5.33325 15.9999C5.33325 15.8666 5.35547 15.7444 5.39992 15.6333C5.44436 15.5222 5.52214 15.4111 5.63325 15.2999L14.9333 5.99994C15.111 5.82216 15.3333 5.73328 15.5999 5.73328C15.8666 5.73328 16.0999 5.83328 16.2999 6.03328C16.4999 6.23328 16.5999 6.46661 16.5999 6.73328C16.5999 6.99994 16.4999 7.23328 16.2999 7.43328L8.73325 14.9999H25.2666C25.5555 14.9999 25.7944 15.0944 25.9833 15.2833C26.1721 15.4722 26.2666 15.7111 26.2666 15.9999C26.2666 16.2888 26.1721 16.5277 25.9833 16.7166C25.7944 16.9055 25.5555 16.9999 25.2666 16.9999H8.73325L16.3333 24.5999C16.511 24.7777 16.5999 24.9999 16.5999 25.2666C16.5999 25.5333 16.4999 25.7666 16.2999 25.9666C16.0999 26.1666 15.8666 26.2666 15.5999 26.2666C15.3333 26.2666 15.0999 26.1666 14.8999 25.9666Z"
                  fill="white"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_1112_900"
                  x="1.33325"
                  y="2.73328"
                  width="28.9333"
                  height="28.5333"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feMorphology
                    radius="1"
                    operator="dilate"
                    in="SourceAlpha"
                    result="effect1_dropShadow_1112_900"
                  />
                  <feOffset dy="1" />
                  <feGaussianBlur stdDeviation="1.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_1112_900"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_1112_900"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </Link>
          <h1 className="headline w-full">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h1>
          <span className="subtitle-2">#{formattedID()}</span>
        </div>
        <img
          loading="lazy"
          className="mx-auto h-52 w-52 translate-y-14"
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formattedID()}.png`}
          alt=""
        />
      </header>
      <main className="inner-shadow z-[5] flex flex-1 flex-col  items-center gap-4 rounded-lg bg-grayscale-white p-5">
        <div className="mt-9 flex gap-4">
          {pokemon.types.map((res) => (
            <PokemonType key={res.type.name} name={res.type.name} />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <span
            className={`subtitle-1 text-center ${
              pokemonTextVariants[pokemon.types[0].type.name]
            }`}
          >
            About
          </span>
          <PokemonAttribute
            weight={pokemon.height}
            height={pokemon.weight}
            abilities={pokemon.abilities}
          />
        </div>
        <span className="body-3 text-grayscale-dark">
          <div
            dangerouslySetInnerHTML={{ __html: description.replace("\f", " ") }}
          />
        </span>
        <div className="flex w-full flex-col gap-4">
          <span
            className={`subtitle-1 text-center ${
              pokemonTextVariants[pokemon.types[0].type.name]
            }`}
          >
            Base Stats
          </span>
          <PokemonBaseStats
            bg={pokemonBgVariants[pokemon.types[0].type.name]}
            stats={pokemon.stats}
          />
        </div>
      </main>
    </div></>
  );
}
