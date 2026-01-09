import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Pokemon } from "../models/Pokemon";
import Fuse from "fuse.js";

export interface PokemonContextValue {
  allPokemon: Pokemon[];
  loading: boolean;
  search: (searchValue: string) => Pokemon[];
}

const PokemonContext = createContext<PokemonContextValue>({
  allPokemon: [],
  loading: true,
  search: (_searchValue => []),
});

interface PokemonProviderProps {
  children: ReactNode;
}

const ALL_POKEMON_KEY = "ALL_POKEMON";

export const PokemonProvider = ({ children }: PokemonProviderProps) => {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //try getting pokemon from local storage
    const allPokemonJson = localStorage.getItem(ALL_POKEMON_KEY);
    if (allPokemonJson) {
      const allPokemon = JSON.parse(allPokemonJson) as Pokemon[];
      if (allPokemon && allPokemon.length === 151) {
        setAllPokemon(allPokemon);
        setLoading(false);
        return;
      }
    }

    const fetchAllPokemon = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        const data = await res.json();

        const details = await Promise.all(
          data.results.map(async (p: { name: string; url: string }) => {
            const res = await fetch(p.url);
            const details = await res.json();

            const pokemon: Pokemon = new Pokemon(details);
            return pokemon;
          })
        );

        setAllPokemon(details);
        localStorage.setItem(ALL_POKEMON_KEY, JSON.stringify(details));
      } catch (err) {
        console.error("Failed to fetch Pokémon", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemon();
  }, []);

  const fuse = useMemo(
    () => new Fuse(allPokemon, { keys: ["name"] }),
    [allPokemon]
  );
  const search = (searchValue: string): Pokemon[] => {
    return fuse.search(searchValue).map((fuseItem) => fuseItem.item);
  };

  return (
    <PokemonContext.Provider value={{ allPokemon, loading, search }}>
      {children}
    </PokemonContext.Provider>
  );
};

export function usePokemon() {
  return useContext(PokemonContext);
}
