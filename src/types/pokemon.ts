export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
}
export interface PokemonStat {
  stat: any;
  effort: number;
  base_stat: number;
}
export interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  front_female: string;
  front_shiny_female: string;
  back_default: string;
  back_shiny: string;
  back_female: string;
  back_shiny_female: string;
}
export interface PokemonType {
  slot: number;
  type: any;
}
export interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: any;
}
