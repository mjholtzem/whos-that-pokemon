import type { Pokemon } from "../models/Pokemon";
import { capitalizeWords } from "../utils/stringUtils";

function HintButton({className, onClick, pokemon}: {className?: string, onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void, pokemon: Pokemon}) {
  return (
    <button
      key={pokemon.name}
      className={`${className} ${pokemon.typeColor.bgColor} ${pokemon.typeColor.textColor} rounded-full active:scale-90 transition-transform duration-100 animate-fade-in`}
      onClick={onClick}
    >
      {capitalizeWords(pokemon.name)}
    </button>
  );
}

export default HintButton;
