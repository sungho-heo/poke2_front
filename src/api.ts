import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

// 가져온 데이터 타입
interface PokemonList {
  results: {
    name: string;
    url: string;
  }[];
}
// 타입
interface Type {
  name: string;
  url: string;
}

interface PokemonTypeInfo {
  slot: number;
  type: Type;
}

// 포켓몬 상세 데이터 타입
export interface PokemonDataType {
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
  types: PokemonTypeInfo[];
  koreaName: string;
  abilities: Ablity[];
}
// 포켓몬 특성
interface Ablity {
  ability: {
    name: string;
    url: string;
  };
}

// 한글화 데이터 타입
interface Name {
  language: {
    name: string;
  };
  name: string;
}

interface SpeciesData {
  names: Name[];
}

// 한글화 데이터 타입
interface TypeName {
  language: {
    name: string;
  };
  name: string;
}
interface TypeData {
  names: TypeName[];
}

// 툭성 한글화 과정
interface AbilityName {
  language: {
    name: string;
  };
  name: string;
}

interface AbilityData {
  names: AbilityName[];
}

export const fetchPokemonList = async (
  limit: number = 151
): Promise<PokemonList> => {
  const response = await api.get<PokemonList>(`/pokemon?limit=${limit}`);
  return response.data;
};

export const fetchPokemon = async (name: string): Promise<PokemonDataType> => {
  const response = await api.get<PokemonDataType>(`/pokemon/${name}`);
  return response.data;
};

export const fetchPokemonSpecies = async (
  name: string
): Promise<SpeciesData> => {
  const response = await api.get(`/pokemon-species/${name}`);
  return response.data;
};

export const fetchTypeData = async (url: string): Promise<TypeData> => {
  const response = await api.get(url);
  return response.data;
};

export const fetchAbility = async (url: string): Promise<AbilityData> => {
  const response = await api.get(url);
  return response.data;
};
