import React from "react";
import { UseQueryResult, useQueries, useQuery } from "@tanstack/react-query";
import { fetchPokemonList, fetchPokemon, PokemonData } from "../api";

const Home: React.FC = () => {
  // 포켓몬 이름 받아오기
  const {
    data,
    error,
    isLoading,
  }: UseQueryResult<{ results: { name: string }[] }> = useQuery({
    queryKey: ["pokemonList"],
    queryFn: () => fetchPokemonList(),
    staleTime: 1000 * 60 * 5, // 5분
  });

  // 받아온 포켓몬의 상세 데이터.
  const pokemonInfo = useQueries({
    queries: (data?.results || []).map((pokemon) => ({
      queryKey: ["pokemon", pokemon.name],
      queryFn: async () => {
        const pokemonData = await fetchPokemon(pokemon.name);
        return { ...pokemonData };
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
    })),
  }) as UseQueryResult<PokemonData>[];

  if (isLoading) return <h1>...Loading</h1>;
  if (error instanceof Error) return <h1>Error: {error.message}</h1>;
  return (
    <div>
      {data?.results.map((pokemon) => {
        return (
          <div key={pokemon.name}>
            <h2>{pokemon?.name}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
