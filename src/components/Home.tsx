import React from "react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "../api";

interface Pokemones {
  name: string;
}

const Home: React.FC = () => {
  const { data, error, isLoading }: UseQueryResult<Pokemones[], Error> =
    useQuery({
      queryKey: ["pokemonList"],
      queryFn: () => fetchPokemonList(),
      staleTime: 1000 * 60 * 5, // 5분
    });

  if (isLoading) return <h1>...Loading</h1>;
  if (error instanceof Error) return <h1>Error: {error.message}</h1>;
  return (
    <div>
      {data && (
        <ul>
          {data.map((pokemon) => (
            <li key={pokemon.name}>{pokemon.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
