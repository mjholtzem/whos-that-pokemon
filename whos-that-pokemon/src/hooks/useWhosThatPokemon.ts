import { useEffect, useState } from "react";
import type { Pokemon } from "../models/Pokemon";

const idMemoryLength = 10;

interface UseWhosThatPokemonReturn {
  currentPokemon: Pokemon | null;
  loading: boolean;
  imgLoading: boolean;
  setImgLoading: React.Dispatch<React.SetStateAction<boolean>>;
  guessResult: boolean | null;
  fetchRandomPokemon: () => Promise<void>;
  submitCurrentGuess: (guess: string) => void;
}

function useWhosThatPokemon(): UseWhosThatPokemonReturn {
  const [recentIds, setRecentIds] = useState<number[]>([]);
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [imgLoading, setImgLoading] = useState<boolean>(true);
  const [guessResult, setGuessResult] = useState<boolean | null>(null);

  const resetStateVars = () => {
    setImgLoading(true);
    setGuessResult(null);
    setLoading(true);
  };

  const fetchRandomPokemon = async () => {
    resetStateVars();

    let randomId: number;
    do {
      randomId = Math.floor(Math.random() * 150) + 1;
    
    } while (recentIds.includes(randomId));

    //fetch pokemon with a minimum delay
    const [response] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`),
      new Promise<void>((res) => setTimeout(res, 1000)),
    ]);

    const pokemonJson = await response.json();
    const pokemon: Pokemon = pokemonJson as Pokemon;

    //Update Recent Ids
    setRecentIds((prev) => {
      let result = [...prev];
      if (result.length === idMemoryLength) {
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
    fetchRandomPokemon();
  }, []);

  const submitCurrentGuess = (guess: string) => {
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
  };

  return {
    currentPokemon,
    loading,
    imgLoading,
    setImgLoading,
    guessResult,
    fetchRandomPokemon,
    submitCurrentGuess,
  };
}

export default useWhosThatPokemon;
