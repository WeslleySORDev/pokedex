import HeadText from "../ui/head-text";
import Image from "next/image";

import PokeballIcon from "../../../../public/assets/icons/pokeball-icon.svg";
import SearchIcon from "../../../../public/assets/icons/search-icon.svg";
import SortIcon from "../../../../public/assets/icons/sort-icon.svg";

export function Header() {
  return (
    <header className="flex flex-col gap-2 px-3 pb-6 pt-4">
      <div className="flex items-center gap-4">
        <Image
          src={PokeballIcon}
          width={24}
          height={24}
          alt="Pokeball Icon SVG"
        />
        <HeadText className="text-grayscale-white" as="headline">
          Pokedéx
        </HeadText>
      </div>
      <div className="flex gap-4">
        <div className="flex w-full items-center gap-2 rounded-2xl bg-grayscale-white py-2 pl-[14px] pr-4 shadow-[inset_0px_2px_2px_rgba(0,_0,_0,_0.14),_inset_0px_3px_1px_rgba(0,_0,_0,_0.12),inset_0px_1px_5px_rgba(0,_0,_0,_0.2)]">
          <Image
            src={SearchIcon}
            width={16}
            height={16}
            alt="Search Icon SVG"
          />
          <input
            className="w-full text-[10px] leading-[16px] text-grayscale-medium outline-none"
            type="text"
            placeholder="Search"
          />
        </div>
        <button className="flex items-center justify-center rounded-full bg-grayscale-white p-2 shadow-[inset_0px_2px_2px_rgba(0,_0,_0,_0.14),_inset_0px_3px_1px_rgba(0,_0,_0,_0.12),inset_0px_1px_5px_rgba(0,_0,_0,_0.2)]">
          <div className="h-4 w-4">
            <Image
              className="h-full w-full"
              src={SortIcon}
              width={16}
              height={16}
              alt="Sort Icon SVG"
            />
          </div>
        </button>
      </div>
    </header>
  );
}
