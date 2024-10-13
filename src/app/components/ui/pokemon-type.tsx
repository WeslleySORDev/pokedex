import React from "react";
import clsx from "clsx";

import HeaderText from "./header-text";

interface PokemonTypeProps {
  children: React.ReactNode;
  as?:
    | "normal"
    | "bug"
    | "dark"
    | "dragon"
    | "electric"
    | "fairy"
    | "fighting"
    | "fire"
    | "flying"
    | "ghost"
    | "grass"
    | "ground"
    | "ice"
    | "poison"
    | "psychic"
    | "rock"
    | "steel"
    | "water";
  className?: string;
}

const PokemonType: React.FC<PokemonTypeProps> = ({
  children,
  as = "normal",
  className,
}) => {
  const pokemonTypeClass = clsx(
    {
      "bg-[#aaa67f]": as === "normal",
      "bg-[#a7b723]": as === "bug",
      "bg-[#75574c]": as === "dark",
      "bg-[#7037ff]": as === "dragon",
      "bg-[#f9cf30]": as === "electric",
      "bg-[#e69eac]": as === "fairy",
      "bg-[#c12239]": as === "fighting",
      "bg-[#f57d31]": as === "fire",
      "bg-[#a891ec]": as === "flying",
      "bg-[#70559b]": as === "ghost",
      "bg-[#74cb48]": as === "grass",
      "bg-[#dec16b]": as === "ground",
      "bg-[#9ad6df]": as === "ice",
      "bg-[#a43e9e]": as === "poison",
      "bg-[#fb5584]": as === "psychic",
      "bg-[#b69e31]": as === "rock",
      "bg-[#b7b9d0]": as === "steel",
      "bg-[#6493eb]": as === "water",
    },
    className
  );

  return (
    <HeaderText as="subtitle-3" className={`text-white capitalize w-16 px-2 py-[2px] text-center rounded-[10px] ${pokemonTypeClass}`}>
      {children}
    </HeaderText>
  );
};

export default PokemonType;
