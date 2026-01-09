import { PokemonTypeColors, type TypeColors } from "./PokemonTypeColors";

interface IPokemon {
     id: number;
    name: string;
    weight: number;
    sprites: {
        front_default: string;
    }
    types: {type: {name: string}}[]
    typeColor: TypeColors
}

export class Pokemon implements IPokemon{
    id: number;
    name: string;
    weight: number;
    sprites: {
        front_default: string;
    }
    types: {type: {name: string}}[]
    typeColor: TypeColors

    constructor(source: IPokemon){
        this.id = source.id;
        this.name = source.name;
        this.weight = source.weight;
        this.sprites = source.sprites;
        this.types = source.types;

        this.typeColor = PokemonTypeColors[source.types[0]?.type.name ?? "normal"];
    }
}