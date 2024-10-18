import Image from "next/image";
import BodyText from "../ui/body-text";
import Link from "next/link";

type PokemonCardProps = {
  name: string;
  id: number;
};

export function PokemonCard({ name, id }: PokemonCardProps) {
  const stringFormatedID = () => {
    return id < 10
      ? "00" + String(id)
      : id < 100
        ? "0" + String(id)
        : String(id);
  };
  return (
    <Link
      href={`/pokemon/${name}`}
      className="relative flex h-[108px] w-[104px] lg:h-[188px] lg:w-[184px] flex-col rounded-lg shadow-drop_2dp"
    >
      <BodyText as="caption" className="absolute right-2 top-1">
        #{stringFormatedID()}
      </BodyText>
      <div className="relative mt-auto flex rounded-[7px] bg-grayscale-background">
        <Image
          alt={`Imagem do pokemon - ${name}`}
          className="absolute bottom-6 left-1/2 h-[72px] w-[72px] -translate-x-1/2"
          src={`/assets/pokemon/images/${stringFormatedID()}.png`}
          width={72}
          height={72}
        />

        <BodyText
          className="w-full pb-1 pt-6 text-center capitalize line-clamp-1"
          as="body-3"
        >
          {name}
        </BodyText>
      </div>
    </Link>
  );
}
