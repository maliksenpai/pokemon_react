import { gql } from "@apollo/client";
import { client } from "..";
import {Pokemon} from "../models/Pokemon";

const PAGE_COUNT = 50;
const POKEMON_LIST_QUERY = gql`
        query ($limit: Int) {
          allPokemon(limit: $limit) {
            name,
            color,
            generation,
            id,
            weight,
            height,
            base_experience,
            capture_rate,
            gender_rate,
            shape,
          }
        }
    `;

const POKEMON_DETAIL = gql`
query Pokemon($pokemonId: Int!) {
  pokemon(id: $pokemonId) {
    sprites {
      front_default
    },
    evolves_to {
      id,
      name,
      sprites {
        front_default
      }
    }
    evolves_from {
      id,
      name,
      sprites {
        front_default
      }
    }
    games {
      id,
      name
    },
    locations {
      id,
      name
    },
    height,
    weight,
    color,
    pokedex_entries {
      description
    },
    abilities {
      id,
      name,
      description,
      effect
    },
    base_stats {
      hp,
      defense,
      attack,
      speed
    },
    name,
    variants {
      id,
      name,
      color,
    },

  }
}`;

// I know this isn't good way to pagination but there is no offSet at the API
export const GetPokemonList = async (page: number) : Promise<Array<Pokemon>> => {
    const response = await client.query({
        query: POKEMON_LIST_QUERY,
        variables: {
            limit: page * PAGE_COUNT
        }
    });
    return response.data.allPokemon.slice((page - 1) * PAGE_COUNT, page * PAGE_COUNT) as Array<Pokemon>;
}

export const GetPokemonFromId = async (id: Number) => {
    const response = await client.query({
        query: POKEMON_DETAIL,
        variables: {
            pokemonId: id
        }
    });
    return response.data.pokemon;
}