export interface TypeColors {
    bgColor: string;
    textColor: string;
}

export const PokemonTypeColors: Record<string, TypeColors> = {
  normal: { bgColor: "bg-[#A8A77A]", textColor: "text-[#333333]" },
  fire: { bgColor: "bg-[#EE8130]", textColor: "text-[#FFFFFF]" },
  water: { bgColor: "bg-[#6390F0]", textColor: "text-[#FFFFFF]" },
  electric: { bgColor: "bg-[#F7D02C]", textColor: "text-[#333333]" },
  grass: { bgColor: "bg-[#7AC74C]", textColor: "text-[#333333]" },
  ice: { bgColor: "bg-[#96D9D6]", textColor: "text-[#333333]" },
  fighting: { bgColor: "bg-[#C22E28]", textColor: "text-[#FFFFFF]" },
  poison: { bgColor: "bg-[#A33EA1]", textColor: "text-[#FFFFFF]" },
  ground: { bgColor: "bg-[#E2BF65]", textColor: "text-[#333333]" },
  flying: { bgColor: "bg-[#A98FF3]", textColor: "text-[#FFFFFF]" },
  psychic: { bgColor: "bg-[#F95587]", textColor: "text-[#FFFFFF]" },
  bug: { bgColor: "bg-[#A6B91A]", textColor: "text-[#333333]" },
  rock: { bgColor: "bg-[#B6A136]", textColor: "text-[#333333]" },
  ghost: { bgColor: "bg-[#735797]", textColor: "text-[#FFFFFF]" },
  dragon: { bgColor: "bg-[#6F35FC]", textColor: "text-[#FFFFFF]" },
  dark: { bgColor: "bg-[#705746]", textColor: "text-[#FFFFFF]" },
  steel: { bgColor: "bg-[#B7B7CE]", textColor: "text-[#333333]" },
  fairy: { bgColor: "bg-[#D685AD]", textColor: "text-[#333333]" },
};