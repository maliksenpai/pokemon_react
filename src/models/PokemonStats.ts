import {observable} from "mobx";

export class PokemonStats {
    @observable hp: Number = -1;
    @observable defense: Number = -1;
    @observable attack: Number = -1;
    @observable speed: Number = -1;
}