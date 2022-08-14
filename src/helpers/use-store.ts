import {PokemonStore} from "../mobx/PokemonStore";
import {useContext} from "react";
import {StoreContext} from "./store-provider";

export const useStore = () : PokemonStore => useContext(StoreContext);