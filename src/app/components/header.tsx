import HeaderText from "./ui/header-text";
import Image from "next/image";

import PokeballIcon from "../../../public/assets/icons/pokeball-icon.svg";
import SearchIcon from "../../../public/assets/icons/search-icon.svg";
import SortIcon from "../../../public/assets/icons/sort-icon.svg";

export function Header() {
  return (
    <header className="flex flex-col gap-2 px-3 pt-4 pb-6">
      <div className="flex gap-4 items-center">
        <Image
          src={PokeballIcon}
          width={24}
          height={24}
          alt="Pokeball Icon SVG"
        />
        <HeaderText className="text-grayscale-white" as="headline">
          Pokedéx
        </HeaderText>
      </div>
      <div className="flex gap-4">
        <div className="flex gap-2 w-full rounded-2xl items-center pl-[14px] pr-4 py-2 bg-grayscale-white shadow-[inset_0px_2px_2px_rgba(0,_0,_0,_0.14),_inset_0px_3px_1px_rgba(0,_0,_0,_0.12),inset_0px_1px_5px_rgba(0,_0,_0,_0.2)]">
          <Image
            src={SearchIcon}
            width={16}
            height={16}
            alt="Search Icon SVG"
          />
          <input
            className="text-grayscale-medium text-[10px] leading-[16px] outline-none w-full"
            type="text"
            placeholder="Search"
          />
        </div>
        <button className="flex items-center justify-center p-2 rounded-full bg-grayscale-white shadow-[inset_0px_2px_2px_rgba(0,_0,_0,_0.14),_inset_0px_3px_1px_rgba(0,_0,_0,_0.12),inset_0px_1px_5px_rgba(0,_0,_0,_0.2)]">
          <div className="w-4 h-4">
            <Image className="w-full h-full" src={SortIcon} width={16} height={16} alt="Sort Icon SVG" />
          </div>
        </button>
      </div>
    </header>
  );
}
