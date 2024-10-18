import HeadText from "../ui/head-text";
import Image from "next/image";

import PokeballIcon from "../../../public/assets/icons/pokeball-icon.svg";
import SearchIcon from "../../../public/assets/icons/search-icon.svg";
import SortIcon from "../../../public/assets/icons/sort-icon.svg";

export function Header() {
  return (
    <header className="flex flex-col gap-2 px-3 pb-6 pt-4">
      <div className="flex items-center gap-4">
        <Image
          className="lg:w-7 lg:h-7"
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
        <div className="flex w-full items-center gap-2 rounded-2xl bg-grayscale-white py-2 pl-[14px] pr-4 shadow-inner_2dp focus-within:shadow-drop_2dp">
          <Image
            src={SearchIcon}
            width={16}
            height={16}
            alt="Search Icon SVG"
          />
          <input
            className="w-full text-[10px] leading-[16px] lg:text-base text-grayscale-medium outline-none"
            type="text"
            placeholder="Search"
          />
        </div>
        <button className="flex items-center justify-center rounded-full bg-grayscale-white p-2 shadow-inner_2dp">
          <div className="h-4 w-4 lg:w-6 lg:h-6">
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
