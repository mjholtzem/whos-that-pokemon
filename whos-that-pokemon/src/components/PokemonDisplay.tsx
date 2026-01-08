import type { Pokemon } from "../models/Pokemon";
import TvContainer from "./TvContainer";

function PokemonDisplay({
  loading,
  currentPokemon,
  guessResult,
  onImgLoaded,
  className,
}: {
  loading: boolean;
  currentPokemon: Pokemon | null;
  guessResult: boolean | null;
  onImgLoaded: () => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <TvContainer>
        {/* Brightness Group */}
        <div
          className={`${
            guessResult === null && "brightness-0"
          } transition-all duration-500 size-[125%]`}
        >
          {currentPokemon && !loading && (
            <img
              className={`size-full object-contain [image-rendering:pixelated] ${
                guessResult !== null &&
                "drop-shadow-[4px_4px_0px_rgba(0,0,0,.5)]"
              } transition-all duration-500`}
              src={currentPokemon?.sprites.front_default}
              onLoad={onImgLoaded}
            ></img>
          )}
        </div>
      </TvContainer>
    </div>
  );
}

export default PokemonDisplay;
