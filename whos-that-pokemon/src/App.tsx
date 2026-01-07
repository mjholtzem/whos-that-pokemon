import { useEffect, useState } from "react";
import LoadingSpiral from "./components/LoadingSpiral";
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

  const resetStateVars = () => {
    setLoading(true);
    setImgLoading(true);
    setGuess("");
    setGuessResult(null);
  };

  const capitalizeWords = (str: string): string => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
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

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`
    );
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

  const submitCurrentGuess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (guessResult != null) {
      console.log("Guess was already submitted!");
      return;
    }

    if (guess === "") {
      console.log("Skipping empty guess");
      return;
    }

    const success =
      guess.toLowerCase() === currentPokemon?.name.toLocaleLowerCase();
    setGuessResult(success);

    console.log("TODO: display name and stuff");
  };

  return (
    <>
      <div className="p-10 h-full bg-gray-300 flex flex-col justify-center items-center">
        <div
          key="card"
          className="h-full flex flex-col justify-center bg-white items-stretch gap-2 rounded-2xl shadow-2xl py-5 px-20"
        >
          <h1 className="font-black text-4xl text-center">
            Who's That Pokémon?
          </h1>
          <div className="min-h-100 flex flex-col justify-center items-center m-5">
            {(loading || imgLoading) && (
              <LoadingSpiral key={"loading-spiral"} size={64}></LoadingSpiral>
            )}
            {loading || !currentPokemon ? null : (
              <div
                className={`flex flex-col justify-center items-center gap-4 ${
                  imgLoading && "hidden"
                }`}
              >
                <div className="w-[75%]">
                <TvContainer>
                  {/* Brightness Group */}
                  <div
                    className={`${
                      guessResult === null && "brightness-0"
                    } transition-all duration-500 size-[125%]`}
                  >
                    <img
                      className={`size-full object-contain [image-rendering:pixelated] ${
                        guessResult !== null &&
                        "drop-shadow-[4px_4px_0px_rgba(0,0,0,.5)]"
                      } transition-all duration-500`}
                      src={currentPokemon.sprites.front_default}
                      onLoad={() => setImgLoading(false)}
                    ></img>
                  </div>
                </TvContainer>
                </div>
                <div
                  className={`font-bold text-center text-3xl ${
                    guessResult === null && "opacity-0"
                  } transition-all duration-1000`}
                >
                  <span
                    className={`inline-block font-light ${
                      guessResult === null ? "scale-0" : "scale-100"
                    } transition-all duration-500 delay-500`}
                  >
                    It's
                  </span>
                  <span> </span>
                  <span
                    className={`inline-block ${
                      guessResult === null ? "scale-0" : "scale-100"
                    } transition-all duration-500 delay-1000`}
                  >
                    {capitalizeWords(currentPokemon.name)}!
                  </span>
                </div>
                <div
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
                </div>
                <div
                  className={`p-3 rounded-3xl ${
                    guessResult === null
                      ? "bg-transparent"
                      : guessResult === true
                      ? "bg-green-500"
                      : "bg-red-500"
                  } transition-all delay-1500`}
                >
                  <form onSubmit={submitCurrentGuess} className="opacity-100">
                    <input
                      spellCheck={false}
                      value={guess}
                      onChange={(e) => setGuess(e.target.value)}
                      placeholder="Input Guess..."
                      className="uppercase rounded-2xl bg-slate-300 p-4 text-center font-bold placeholder:font-light outline-none focus:ring-2 ring-slate-700"
                    ></input>
                  </form>
                </div>
              </div>
            )}
          </div>
          <button
            className="active:scale-115 active:rotate-25 click font-black rounded-2xl text-2xl py-2 px-6 transition-all self-center"
            onClick={fetchRandomPokemon}
          >
            <img src={pokeballUrl}></img>
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
