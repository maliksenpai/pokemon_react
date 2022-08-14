import {observable} from "mobx";

export class PokemonAbilities {
    @observable id?: Number = -1;
    @observable name?: String = "";
    @observable description?: String = "";
    @observable effect?: String;
}