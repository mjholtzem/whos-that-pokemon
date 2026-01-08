import { useEffect, useRef, useState } from "react";
/* import LoadingSpiral from "./components/LoadingSpiral"; */
import type { Pokemon } from "./models/Pokemon";
import TvContainer from "./components/TvContainer";
import pokeballUrl from "./assets/pokeball.svg";

const idMemoryLength = 10;

function App() {
  const [recentIds, setRecentIds] = useState<number[]>([]);
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [imgLoading, setImgLoading] = useState<boolean>(true);
  const [guess, setGuess] = useState<string>("");
  const [guessResult, setGuessResult] = useState<boolean | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const resetStateVars = () => {
    setImgLoading(true);
    setGuess("");
    setGuessResult(null);
    setLoading(true);
  };

  const capitalizeWords = (str: string): string => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const onClickPokeball = () => {
    //If there is any input, submit the guess
    if (guess && guessResult === null) {
      submitCurrentGuess(null);
      return;
    }

    fetchRandomPokemon();
  };

  const fetchRandomPokemon = async () => {
    console.log("beginning fetch random pokemon");
    resetStateVars();

    let randomId: number;
    do {
      randomId = Math.floor(Math.random() * 150) + 1;
      console.log(`generated randomId: ${randomId}`);
      console.log(`recentIds: ${recentIds}`);
    } while (recentIds.includes(randomId));

    //fetch pokemon with a minimum delay
    const [response] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`),
        new Promise<void>((res) => setTimeout(res, 1000))
      ]);

    const pokemonJson = await response.json();
    const pokemon: Pokemon = pokemonJson as Pokemon;

    //Update Recent Ids
    setRecentIds((prev) => {
      let result = [...prev];
      if (result.length == idMemoryLength) {
        result.shift();
      }
      result.push(randomId);
      return result;
    });

    //Update Current Id
    setCurrentPokemon(pokemon);

    setLoading(false);
  };

  useEffect(() => {
    setImgLoading(true);
  }, [currentPokemon?.sprites.front_default]);

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  const submitCurrentGuess = (e: React.FormEvent<HTMLFormElement> | null) => {
    e?.preventDefault();

    if (e && inputRef) {
      inputRef.current?.blur();
    }

    if (guessResult != null) {
      console.log("Guess was already submitted!");
      return;
    }

    if (guess === "") {
      console.log("Skipping empty guess");
      return;
    }

    const success =
      guess.trim().toLowerCase() === currentPokemon?.name.toLocaleLowerCase();
    setGuessResult(success);

    console.log("TODO: display name and stuff");
  };

  const AnswerText = (currentPokemon: Pokemon | null) => {
    const hasGuess = guessResult !== null;
    return (
      <div
        className={`font-bold text-center text-[min(4vw,4vh)] ${
          loading || !currentPokemon || !hasGuess ? "invisible" : ""
        }`}
      >
        <span
          className={`inline-block font-light ${
            !hasGuess ? "scale-0" : "scale-100 transition-transform duration-500 delay-500"
          } `}
        >
          It's
        </span>
        <span> </span>
        <span
          className={`inline-block ${
            guessResult === null
              ? "scale-0"
              : "scale-100 transition-transform duration-500 delay-1000"
          } `}
        >
          {currentPokemon && hasGuess && capitalizeWords(currentPokemon.name)}!
        </span>
      </div>
    );
  };

  return (
    <>
      <div className="pb-[calc(env(safe-area-inset-bottom)+20px)] p-10 w-full bg-gray-300 flex flex-col justify-center items-center min-h-0 min-w-0">
        <div
          key="card"
          className="flex flex-col justify-center bg-white items-stretch gap-2 rounded-2xl shadow-2xl p-5 lg:p-20"
        >
          <h1 className="font-black text-[min(8vw,6vh)] text-center">
            Who's That Pokémon?
          </h1>
          <div className="flex flex-col justify-center items-center">
            {/*(loading || imgLoading) && (
              <LoadingSpiral key={"loading-spiral"} size={64}></LoadingSpiral>
            )*/}
            <div className={`flex flex-col justify-center items-center gap-3`}>
              <div className="w-[min(50vw,40vh)]">
                <TvContainer>
                  {/* Brightness Group */}
                  <div
                    className={`${
                      guessResult === null && "brightness-0"
                    } transition-all duration-500 size-[125%]`}
                  >
                    {currentPokemon && !loading &&
                    <img
                      className={`size-full object-contain [image-rendering:pixelated] ${
                        guessResult !== null &&
                        "drop-shadow-[4px_4px_0px_rgba(0,0,0,.5)]"
                      } transition-all duration-500`}
                      src={currentPokemon?.sprites.front_default}
                      onLoad={() => setImgLoading(false)}
                    ></img>}
                  </div>
                </TvContainer>
              </div>
              {/* <div
                  key="result-text"
                  className={`text-center font-bold text-2xl ${
                    guessResult === true ? "text-green-500" : "text-red-500"
                  } ${
                    guessResult === null ? "opacity-0" : "opacity-100"
                  } transition-all delay-1500`}
                >
                  <p>
                    {guessResult === true ? "Correct!" : "Sorry try again!"}
                  </p>
                </div> */}
              <button
              disabled={loading || imgLoading || !currentPokemon}
                className="active:scale-115 active:rotate-25 click font-black rounded-2xl text-2xl px-6 transition-all self-center disabled:animate-spin"
                onClick={onClickPokeball}
              >
                <img className="size-[min(10vw,10vh)]" src={pokeballUrl}></img>
              </button>
              <div
                className={`p-[min(2vw,2vh)] rounded-[min(5vw,5vh)] ${guessResult === null && "invisible"} ${
                  guessResult === null
                    ? "bg-transparent"
                    : guessResult === true
                    ? "bg-green-500"
                    : "bg-red-500"
                } transition-colors delay-1500`}
              >
                <form onSubmit={submitCurrentGuess} className="opacity-100 visible">
                  <input
                  disabled={loading || imgLoading}
                    ref={inputRef}
                    spellCheck={false}
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder="Input Guess..."
                    className="uppercase rounded-[min(3vw,3vh)] bg-slate-300 p-[min(2vw,2vh)] text-center text-[min(3vw,3vh)] font-bold placeholder:font-light outline-none focus:ring-2 ring-slate-700"
                  ></input>
                </form>
              </div>
              {AnswerText(currentPokemon)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
