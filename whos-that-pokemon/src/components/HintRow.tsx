import { usePokemon } from "../contexts/PokemonContext";
import HintButton from "./HintButton";

function HintRow({
  className,
  guess,
  setGuess,
  submitCurrentGuess,
}: {
  className?: string;
  guess: string;
  setGuess: (value: React.SetStateAction<string>) => void;
  submitCurrentGuess: (guess: string) => void;
}) {
  const pokemonContext = usePokemon();
  return (
    <div
      id="hintRow"
      className={`${className} flex flex-row gap-2 flex-wrap w-full justify-center items-center`}
    >
      {pokemonContext
        .search(guess.trim().length > 2 ? guess : "")
        .slice(0, 3)
        .map((searchResult) => {
          return (
            <HintButton
              className={
                "text-[min(3.5vw,3.5vh)] px-[min(2vw,2vh)] py-[min(0.5vw,0.5vh)]"
              }
              pokemon={searchResult}
              onClick={() => {
                setGuess(searchResult.name);
                submitCurrentGuess(searchResult.name);
              }}
            ></HintButton>
          );
        })}
    </div>
  );
}

export default HintRow;
