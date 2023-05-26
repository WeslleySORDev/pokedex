import Link from "next/link";

import { PokemonType } from "../../components/PokemonType";
import Pokedex, { Pokemon } from "pokedex-promise-v2";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
        console.log(res);
        setPokemon(res);
      });
    }
  }, [slug]);
  if (Object.keys(pokemon).length === 0) return null;
  return (
    <div className="flex flex-col relative min-h-screen max-h-screen bg-pokemon-type-grass p-1">
      <svg
        className="absolute z-10 right-1 top-1"
        width="208"
        height="208"
        viewBox="0 0 208 208"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.1">
          <path
            d="M128.762 104C128.762 117.676 117.676 128.762 104 128.762C90.3244 128.762 79.2381 117.676 79.2381 104C79.2381 90.3244 90.3244 79.2381 104 79.2381C117.676 79.2381 128.762 90.3244 128.762 104Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M104 208C156.393 208 199.738 169.257 206.947 118.857H146.035C139.917 136.169 123.407 148.571 104 148.571C84.5933 148.571 68.0835 136.169 61.9648 118.857H1.05322C8.26235 169.257 51.6067 208 104 208ZM61.9648 89.1429H1.05322C8.26235 38.7431 51.6067 0 104 0C156.393 0 199.738 38.7431 206.947 89.1429H146.035C139.917 71.8314 123.407 59.4286 104 59.4286C84.5933 59.4286 68.0835 71.8314 61.9648 89.1429ZM128.762 104C128.762 117.676 117.676 128.762 104 128.762C90.3244 128.762 79.2381 117.676 79.2381 104C79.2381 90.3244 90.3244 79.2381 104 79.2381C117.676 79.2381 128.762 90.3244 128.762 104Z"
            fill="white"
          />
        </g>
      </svg>
      <header className="p-5 flex items-center gap-2 text-grayscale-white">
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
      </header>
      <main className="flex flex-col gap-4 bg-grayscale-white rounded-lg inner-shadow flex-1 relative mt-36 px-5">
        <div className="flex flex-col items-center absolute -top-36 left-0 right-0">
          <img
            loading="lazy"
            className="w-52 h-52"
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formattedID()}.png`}
            alt=""
          />
          <div className="flex gap-4">
            {pokemon.types.map((res) => (
              <PokemonType key={res.type.name} name={res.type.name} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-24">
          <span className="subtitle-1 text-center text-pokemon-type-grass">
            About
          </span>
          <div className="flex items-center justify-center">
            <div className="flex flex-col px-6 py-2 gap-3">
              <div className="flex gap-2 items-center">
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.28333 13.0001H13.05L12 5.66675H5.33333L4.28333 13.0001ZM8.66667 4.66675C8.95556 4.66675 9.19444 4.56953 9.38333 4.37508C9.57222 4.18064 9.66667 3.94453 9.66667 3.66675C9.66667 3.37786 9.57222 3.13897 9.38333 2.95008C9.19444 2.76119 8.95556 2.66675 8.66667 2.66675C8.38889 2.66675 8.15278 2.76119 7.95833 2.95008C7.76389 3.13897 7.66667 3.37786 7.66667 3.66675C7.66667 3.94453 7.76389 4.18064 7.95833 4.37508C8.15278 4.56953 8.38889 4.66675 8.66667 4.66675ZM10.4 4.66675H12C12.2556 4.66675 12.4778 4.7473 12.6667 4.90841C12.8556 5.06953 12.9667 5.27786 13 5.53341L14.0333 12.8667C14.0778 13.1667 14.0028 13.4306 13.8083 13.6584C13.6139 13.8862 13.3611 14.0001 13.05 14.0001H4.28333C3.97222 14.0001 3.71945 13.8862 3.525 13.6584C3.33056 13.4306 3.25556 13.1667 3.3 12.8667L4.33333 5.53341C4.36667 5.27786 4.47778 5.06953 4.66667 4.90841C4.85556 4.7473 5.07778 4.66675 5.33333 4.66675H6.93333C6.84444 4.51119 6.77778 4.35286 6.73333 4.19175C6.68889 4.03064 6.66667 3.85564 6.66667 3.66675C6.66667 3.11119 6.86111 2.63897 7.25 2.25008C7.63889 1.86119 8.11111 1.66675 8.66667 1.66675C9.22222 1.66675 9.69444 1.86119 10.0833 2.25008C10.4722 2.63897 10.6667 3.11119 10.6667 3.66675C10.6667 3.85564 10.6444 4.03064 10.6 4.19175C10.5556 4.35286 10.4889 4.51119 10.4 4.66675ZM4.28333 13.0001H13.05H4.28333Z"
                    fill="#1D1D1D"
                  />
                </svg>
                <span className="text-grayscale-dark body-3">
                  {pokemon.weight} kg
                </span>
              </div>
              <span className="text-grayscale-medium caption text-center">
                Weight
              </span>
            </div>
            <svg
              width="2"
              height="48"
              viewBox="0 0 2 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0.333252" width="1" height="48" fill="#E0E0E0" />
            </svg>
            <div className="flex flex-col px-6 py-2 gap-3">
              <div className="flex gap-2 items-center">
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 2.33325C4.5 2.06659 4.6 1.83325 4.8 1.63325C5 1.43325 5.23333 1.33325 5.5 1.33325L11.5 1.33325C11.7556 1.33325 11.9861 1.43325 12.1917 1.63325C12.3972 1.83325 12.5 2.06659 12.5 2.33325V13.6666C12.5 13.9333 12.3972 14.1666 12.1917 14.3666C11.9861 14.5666 11.7556 14.6666 11.5 14.6666H5.5C5.23333 14.6666 5 14.5666 4.8 14.3666C4.6 14.1666 4.5 13.9333 4.5 13.6666V2.33325ZM5.5 2.33325L5.5 13.6666H11.5V11.4999H8.5V10.4999H11.5V8.49992H8.5V7.49992H11.5V5.49992H8.5V4.49992H11.5V2.33325L5.5 2.33325ZM8.5 4.49992V5.49992V4.49992ZM8.5 7.49992V8.49992V7.49992ZM8.5 10.4999V11.4999V10.4999Z"
                    fill="#1D1D1D"
                  />
                </svg>

                <span className="text-grayscale-dark body-3">
                  {pokemon.height} m
                </span>
              </div>
              <span className="text-grayscale-medium caption text-center">
                Height
              </span>
            </div>
            <svg
              width="2"
              height="48"
              viewBox="0 0 2 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0.333252" width="1" height="48" fill="#E0E0E0" />
            </svg>
            <div className="flex flex-col px-6 py-2 gap-3">
              <div className="flex flex-col gap-2 justify-center items-center">
                {pokemon.abilities.map((res, index) => {
                  if (index <= 1) {
                    return (
                      <span
                        key={res.ability.name}
                        className="text-grayscale-dark body-3"
                      >
                        {res.ability.name.charAt(0).toUpperCase() +
                          res.ability.name.slice(1)}
                      </span>
                    );
                  }
                })}
              </div>
              <span className="text-grayscale-medium caption text-center">
                Moves
              </span>
            </div>
          </div>
        </div>
        <span className="text-grayscale-dark body-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
          efficitur libero eu libero auctor, ut aliquam ex lacinia. Donec
          bibendum sapien libero, vitae interdum leo condimentum sed. Etiam ut
          diam porttitor, gravida odio in, viverra nisi. Nullam leo augue,
          ultricies eu sem quis, tempus bibendum turpis.
        </span>
      </main>
    </div>
  );
}
