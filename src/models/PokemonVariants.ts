import {observable} from "mobx";

export class PokemonVariants {
    @observable id: Number = -1;
    @observable name: String = "";
    @observable color: String = "";
}