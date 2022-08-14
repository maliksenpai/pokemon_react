import {action, computed, makeAutoObservable, observable} from "mobx";
import {Pokemon} from "../models/Pokemon";
import {GetPokemonList} from "../data/GetPokemonData";

export class PokemonStore {
    @observable pokemonArray: Array<Pokemon> = [];
    @observable loading: boolean = true;
    @observable page: number = 1;
    @observable selectedPokemon: Number | null = null;

    constructor(pokemons: Array<Pokemon>,) {
        makeAutoObservable(this)
        this.pokemonArray = pokemons;
        this.loading = true;
        this.page = 1;
    }

    @action
    addPokemonList = async () => {
        this.loading = true;
        const pokemons: Array<Pokemon> = await GetPokemonList(this.page);
        this.pokemonArray.push(...pokemons);
        this.loading = false;
        this.page = this.page + 1;
    }

    @computed
    get getPokemonLength(): Number {
        return this.pokemonArray.length;
    }

    @action
    selectPokemon = (pokemon : Number | null) => {
        this.selectedPokemon = pokemon;
    }

}