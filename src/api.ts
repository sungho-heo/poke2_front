import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

interface PokemonList {
  results: {
    name: string;
    url: string;
  }[];
}

export interface PokemonData {
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
}

export const fetchPokemonList = async (
  limit: number = 150
): Promise<PokemonList> => {
  const response = await api.get<PokemonList>(`/pokemon?limit=${limit}`);
  return response.data;
};

export const fetchPokemon = async (name: string): Promise<PokemonData> => {
  const response = await api.get<PokemonData>(`/pokemon/${name}`);
  return response.data;
};
