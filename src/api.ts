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

export const fetchPokemonList = async (
  limit: number = 150
): Promise<PokemonList> => {
  const response = await api.get<PokemonList>(`/pokemon`, {
    params: {
      limit: limit,
    },
  });
  return response.data;
};
