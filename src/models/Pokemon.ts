import {observable} from "mobx";
import {Sprites} from "./Sprites";
import {PokemonFieldGeneral} from "./PokemonFieldGeneral";
import {PokemonStats} from "./PokemonStats";
import {PokemonVariants} from "./PokemonVariants";
import {PokemonAbilities} from "./PokemonAbilities";

export class Pokemon{
    @observable name: String = "";
    @observable color: String = "";
    @observable generation: String = "";
    @observable id: Number = -1;

    @observable weight?: Number;
    @observable height?: Number;
    @observable sprites?: Sprites;
    @observable evolves_to?: PokemonFieldGeneral | Array<PokemonFieldGeneral>;
    @observable evolves_from?: PokemonFieldGeneral | Array<PokemonFieldGeneral>;
    @observable games?: PokemonFieldGeneral | Array<PokemonFieldGeneral>;
    @observable locations?: PokemonFieldGeneral | Array<PokemonFieldGeneral>;
    @observable pokedex_entries?: Array<PokemonFieldGeneral>;
    @observable abilities?: Array<PokemonAbilities>;
    @observable base_stats?: PokemonStats;
    @observable variants?: PokemonVariants;
}