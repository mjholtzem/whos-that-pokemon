import pokeballUrl from "../assets/pokeball.svg";

function PokeballButton({
  onClick,
  spinning,
  disabled,
  className,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  spinning: boolean;
  disabled: boolean;
  className: string;
}) {
  return <button
    disabled={disabled}
    className={`active:scale-115 active:rotate-25 transition-transform ${spinning && "animate-spin"} ${className}`}
    onClick={onClick}
  >
    <img className="size-full" src={pokeballUrl}></img>
  </button>;
}

export default PokeballButton;
