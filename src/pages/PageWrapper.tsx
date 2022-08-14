import {useStore} from "../helpers/use-store";
import {useEffect, useState} from "react";
import {PokemonList} from "../components/PokemonList";
import {PokemonDetail} from "../components/PokemonDetail";
import {Pokemon} from "../models/Pokemon";
import {useObserver} from "mobx-react-lite";

export const PageWrapper = () => {

    const pokemonStore = useStore();

    return useObserver(() => {
        return !!pokemonStore.selectedPokemon ? <PokemonDetail pokemon={pokemonStore.selectedPokemon as Number} /> : <PokemonList />
    });
}