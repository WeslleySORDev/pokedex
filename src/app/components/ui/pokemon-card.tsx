import Image from "next/image";
import BodyText from "./body-text";
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
    <Link href={`/pokemon/${name}`} className="flex flex-col relative h-[108px] w-[104px] rounded-lg shadow-[0px_2px_2px_rgba(0,_0,_0,_0.14),_0px_3px_1px_rgba(0,_0,_0,_0.12),_0px_1px_5px_rgba(0,_0,_0,_0.2)]">
      <BodyText as="caption" className="absolute top-1 right-2">
        #{stringFormatedID()}
      </BodyText>
      <div className="relative flex mt-auto bg-grayscale-background rounded-[7px]">
        <Image
          alt={`Imagem do pokemon - ${name}`}
          className="absolute w-[72px] h-[72px] bottom-6 -translate-x-1/2 left-1/2"
          src={`/assets/pokemon/images/${stringFormatedID()}.png`}
          width={72}
          height={72}
        />

        <BodyText className="text-center pt-6 pb-1 w-full capitalize" as="body-3">
          {name}
        </BodyText>
      </div>
    </Link>
  );
}
