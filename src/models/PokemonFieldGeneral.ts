import {observable} from "mobx";
import {Sprites} from "./Sprites";

export class PokemonFieldGeneral {
    @observable id?: Number = -1;
    @observable name?: String = "";
    @observable description?: String = "";
    @observable sprites?: Sprites;
}