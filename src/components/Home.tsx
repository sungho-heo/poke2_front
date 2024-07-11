import React from "react";
import styled from "styled-components";
import { UseQueryResult, useQueries, useQuery } from "@tanstack/react-query";
import {
  fetchPokemonList,
  fetchPokemon,
  fetchTypeData,
  PokemonData,
  fetchPokemonSpecies,
} from "../api";

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
        // 포켓몬이름 한글화 과정
        const pokemonData = await fetchPokemon(pokemon?.name);
        const speciesData = await fetchPokemonSpecies(pokemon?.name);
        const koreaName =
          speciesData.names.find((name) => name.language.name === "ko")?.name ||
          pokemonData.name;

        // 타입 한글화 과정.
        const typeNames = await Promise.all(
          pokemonData.types.map(async (typeInfo) => {
            const typeData = await fetchTypeData(typeInfo.type.url);
            const koreaTypeName =
              typeData.names.find((name) => name.language.name === "ko")
                ?.name || typeInfo.type.name;
            return {
              ...typeInfo,
              type: { ...typeInfo.type, name: koreaTypeName },
            };
          })
        );

        return { ...pokemonData, koreaName, types: typeNames };
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
    })),
  }) as UseQueryResult<PokemonData & { koreaName: string }>[];

  // 에러및 로딩 화면.
  if (listLoading) return <h1>...Loading</h1>;
  if (listError instanceof Error) return <h1>Error: {listError.message}</h1>;

  return (
    <GridContainer>
      {pokemonInfo?.map((query, index) => {
        const { data, error, isLoading } = query;
        if (isLoading) return <h1 key={index}>Loading...</h1>;
        if (error instanceof Error)
          return <h1 key={index}>Error:{error.message}</h1>;
        return (
          <div key={index}>
            <h2>{data?.koreaName}</h2>
            <img src={data?.sprites.front_default} />
            <p>
              타입:
              {data?.types.map((typeDetail) => typeDetail.type.name).join(",")}
            </p>
          </div>
        );
      })}
    </GridContainer>
  );
};

export default Home;
