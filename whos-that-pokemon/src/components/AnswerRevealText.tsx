import type { Pokemon } from "../models/Pokemon";
import { capitalizeWords } from "../utils/stringUtils";

function AnswerRevealText({
  currentPokemon,
  guessResult,
  loading,
  className,
}: {
  currentPokemon: Pokemon | null;
  guessResult: boolean | null;
  loading: boolean;
  className?: string;
}) {
  const hasGuess = guessResult !== null;
  return (
    <div
      className={`${className} font-bold text-center text-[min(4vw,4vh)] ${
        loading || !currentPokemon || !hasGuess ? "invisible" : ""
      }`}
    >
      <span
        className={`inline-block font-light ${
          !hasGuess
            ? "scale-0"
            : "scale-100 transition-transform duration-250 delay-500"
        } `}
      >
        It's
      </span>
      <span> </span>
      <span
        className={`inline-block ${
          guessResult === null
            ? "scale-0"
            : "scale-100 transition-transform duration-250 delay-1000"
        } `}
      >
        {currentPokemon && hasGuess && capitalizeWords(currentPokemon.name)}!
      </span>
    </div>
  );
}

export default AnswerRevealText;
