import { AbilityElement } from "pokedex-promise-v2";

type PokemonAttributeProps = {
  height: number;
  weight: number;
  abilities: AbilityElement[];
};

export function PokemonAttribute({
  height,
  weight,
  abilities,
}: PokemonAttributeProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-3 px-6 py-2">
        <div className="flex items-center gap-2">
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
          <span className="body-3 text-grayscale-dark">{weight} kg</span>
        </div>
        <span className="caption text-center text-grayscale-medium">
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
      <div className="flex flex-col gap-3 px-6 py-2">
        <div className="flex items-center gap-2">
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

          <span className="body-3 text-grayscale-dark">{height} m</span>
        </div>
        <span className="caption text-center text-grayscale-medium">
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
      <div className="flex flex-col gap-3 px-6 py-2">
        <div className="flex flex-col items-center justify-center gap-2">
          {abilities.map((res, index) => {
            if (index <= 1) {
              return (
                <span
                  key={res.ability.name}
                  className="body-3 text-grayscale-dark"
                >
                  {res.ability.name.charAt(0).toUpperCase() +
                    res.ability.name.slice(1)}
                </span>
              );
            }
          })}
        </div>
        <span className="caption text-center text-grayscale-medium">Moves</span>
      </div>
    </div>
  );
}
