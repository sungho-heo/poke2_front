import React from "react";
import styled from "styled-components";
import { UseQueryResult, useQueries, useQuery } from "@tanstack/react-query";
import { fetchPokemonList, fetchPokemon, PokemonData } from "../api";

// css
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const Home: React.FC = () => {
  // 포켓몬 이름 받아오기
  const {
    data: listData,
    error: listError,
    isLoading: listLoading,
  }: UseQueryResult<{ results: { name: string }[] }> = useQuery({
    queryKey: ["pokemonList"],
    queryFn: () => fetchPokemonList(),
    staleTime: 1000 * 60 * 5, // 5분
  });

  // 받아온 포켓몬의 상세 데이터.
  const pokemonInfo = useQueries({
    queries: (listData?.results || []).map((pokemon) => ({
      queryKey: ["pokemon", pokemon.name],
      queryFn: async () => {
        const pokemonData = await fetchPokemon(pokemon?.name);
        return { ...pokemonData };
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
    })),
  }) as UseQueryResult<PokemonData>[];

  if (listLoading) return <h1>...Loading</h1>;
  if (listError instanceof Error) return <h1>Error: {listError.message}</h1>;
  return (
    <GridContainer>
      {pokemonInfo?.map((query, index) => {
        const { data, error, isLoading } = query;
        if (isLoading) return <h1>Loading...</h1>;
        if (error instanceof Error) return <h1>Error:{error.message}</h1>;
        console.log(data);
        return (
          <div key={index}>
            <h2>{data?.name}</h2>
            <img src={data?.sprites.front_default} />
            <p>
              type:{" "}
              {data?.types.map((typeDetail) => typeDetail.type.name).join(",")}
            </p>
          </div>
        );
      })}
    </GridContainer>
  );
};

export default Home;
