import {createContext} from "react";
import {PokemonStore} from "../mobx/PokemonStore";

export const StoreContext = createContext<PokemonStore>({} as PokemonStore);
export const StoreProvider = StoreContext.Provider;