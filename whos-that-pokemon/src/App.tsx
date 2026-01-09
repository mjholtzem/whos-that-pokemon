import useWhosThatPokemon from "./hooks/useWhosThatPokemon";
import { useEffect, useState } from "react";
import PokeballButton from "./components/PokeballButton";
import AnswerField from "./components/AnswerField";
import PokemonDisplay from "./components/PokemonDisplay";
import AnswerRevealText from "./components/AnswerRevealText";
import HintRow from "./components/HintRow";

function App() {
  const {
    currentPokemon,
    loading,
    imgLoading,
    setImgLoading,
    guessResult,
    fetchRandomPokemon,
    submitCurrentGuess,
  } = useWhosThatPokemon();

  const [guess, setGuess] = useState<string>("");

  useEffect(() => {
    if (loading) setGuess("");
  }, [loading]);

  const onClickPokeball = () => {
    //If there is any input, submit the guess
    if (guess && guessResult === null) {
      submitCurrentGuess(guess);
      return;
    }

    fetchRandomPokemon();
  };

  return (
    <div className="font-jersey-15 pb-[calc(env(safe-area-inset-bottom)+20px)] p-10 h-full w-full bg-gray-300 flex flex-col justify-center items-center min-h-0 min-w-0">
      <div className="flex flex-col justify-center bg-white items-center gap-2 rounded-2xl shadow-2xl p-10">
        <h1 className="font-roboto font-bold text-[min(6vw,4vh)] text-center leading-none">
          Who's That
        </h1>
        <h1 className="text-[min(8vw,6vh)] text-center leading-none pb-2">
          Pokemon?
        </h1>
        <PokemonDisplay
          className="w-[min(50vw,40vh)] flex justify-center"
          loading={loading}
          currentPokemon={currentPokemon}
          guessResult={guessResult}
          onImgLoaded={() => setImgLoading(false)}
        />
        <PokeballButton
          disabled={loading || imgLoading || !currentPokemon}
          spinning={loading || imgLoading}
          onClick={onClickPokeball}
          className="size-[min(10vw,10vh)]"
        />
        <AnswerField
          disabled={loading || imgLoading || guessResult !== null}
          guessResult={guessResult}
          answer={guess}
          setAnswer={setGuess}
          submitAnswer={() => submitCurrentGuess(guess)}
        />
        <div className="h-[min(12vw,12vh)] w-[min(55vw,55vh)] flex flex-col justify-center items-center">
          <HintRow
            className={`${guessResult !== null && "hidden"}`}
            guess={guess}
            setGuess={setGuess}
            submitCurrentGuess={submitCurrentGuess}
          ></HintRow>
          <AnswerRevealText
            className={`font-bold text-center text-[min(6vw,6vh)] ${
              guessResult === null && "h-0"
            } `}
            currentPokemon={currentPokemon}
            guessResult={guessResult}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
