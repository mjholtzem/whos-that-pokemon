import { useEffect, useState } from "react";
import type { Pokemon } from "../models/Pokemon";
import {
  usePokemon,
  type PokemonContextValue,
} from "../contexts/PokemonContext";

const idMemoryLength = 10;

interface UseWhosThatPokemonReturn {
  currentPokemon: Pokemon | null;
  loading: boolean;
  imgLoading: boolean;
  setImgLoading: React.Dispatch<React.SetStateAction<boolean>>;
  guessResult: boolean | null;
  fetchRandomPokemon: () => Promise<void>;
  submitCurrentGuess: (guess: string) => void;
  pokemonContext: PokemonContextValue;
}

function useWhosThatPokemon(): UseWhosThatPokemonReturn {
  const pokemonContext = usePokemon();

  const [recentIds, setRecentIds] = useState<number[]>([]);
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [imgLoading, setImgLoading] = useState<boolean>(true);
  const [guessResult, setGuessResult] = useState<boolean | null>(null);

  useEffect(() => {
    if (pokemonContext.loading) return;
    fetchRandomPokemon();
  }, [pokemonContext.loading]);

  const resetStateVars = () => {
    setImgLoading(true);
    setGuessResult(null);
    setLoading(true);
  };

  const fetchRandomPokemon = async () => {
    resetStateVars();

    let randomId: number;
    do {
      randomId = Math.floor(
        Math.random() * pokemonContext.allPokemon.length - 1
      );
    } while (recentIds.includes(randomId));

    //artifical load just because it's kind of fun to have anticipation
    await new Promise<void>((res) => setTimeout(res, 2000));

    const pokemon = pokemonContext.allPokemon[randomId];

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
    pokemonContext,
  };
}

export default useWhosThatPokemon;
