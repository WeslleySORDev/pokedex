import { StatElement } from "pokedex-promise-v2";

type PokemonBaseStatsProps = {
  stats: StatElement[];
  bg: string;
};

export function PokemonBaseStats({ stats, bg }: PokemonBaseStatsProps) {
  return (
    <div className="flex gap-2">
      <div className="flex flex-col items-end">
        <span className="subtitle-3">HP</span>
        <span className="subtitle-3">ATK</span>
        <span className="subtitle-3">DEF</span>
        <span className="subtitle-3">SATK</span>
        <span className="subtitle-3">SDEF</span>
        <span className="subtitle-3">SPD</span>
      </div>
      <div className="flex w-[1px] bg-grayscale-light content-['']"></div>

      <div className="flex w-full flex-col">
        <div className="flex items-center gap-2">
          <span className="body-3 w-5">{stats[0].base_stat}</span>
          <div className={`h-1 w-full rounded-[4px] ${bg} bg-opacity-50`}>
            <div
              style={{
                width:
                  stats[0].base_stat < 100
                    ? stats[0].base_stat + "%"
                    : 100 + "%",
              }}
              className={`h-full rounded-[4px] ${bg} bg-opacity-100`}
            ></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="body-3 w-5">{stats[1].base_stat}</span>
          <div className={`h-1 w-full rounded-[4px] ${bg} bg-opacity-50`}>
            <div
              style={{
                width:
                  stats[1].base_stat < 100
                    ? stats[1].base_stat + "%"
                    : 100 + "%",
              }}
              className={`h-full rounded-[4px] ${bg} bg-opacity-100`}
            ></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="body-3 w-5">{stats[2].base_stat}</span>
          <div className={`h-1 w-full rounded-[4px] ${bg} bg-opacity-50`}>
            <div
              style={{
                width:
                  stats[2].base_stat < 100
                    ? stats[2].base_stat + "%"
                    : 100 + "%",
              }}
              className={`h-full rounded-[4px] ${bg} bg-opacity-100`}
            ></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="body-3 w-5">{stats[3].base_stat}</span>
          <div className={`h-1 w-full rounded-[4px] ${bg} bg-opacity-50`}>
            <div
              style={{
                width:
                  stats[3].base_stat < 100
                    ? stats[3].base_stat + "%"
                    : 100 + "%",
              }}
              className={`h-full rounded-[4px] ${bg} bg-opacity-100`}
            ></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="body-3 w-5">{stats[4].base_stat}</span>
          <div className={`h-1 w-full rounded-[4px] ${bg} bg-opacity-50`}>
            <div
              style={{
                width:
                  stats[4].base_stat < 100
                    ? stats[4].base_stat + "%"
                    : 100 + "%",
              }}
              className={`h-full rounded-[4px] ${bg} bg-opacity-100`}
            ></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="body-3 w-5">{stats[5].base_stat}</span>
          <div className={`h-1 w-full rounded-[4px] ${bg} bg-opacity-50`}>
            <div
              style={{
                width:
                  stats[5].base_stat < 100
                    ? stats[5].base_stat + "%"
                    : 100 + "%",
              }}
              className={`h-full rounded-[4px] ${bg} bg-opacity-100`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
