import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueries } from "@tanstack/react-query";
import styled from "styled-components";
import { fetchPokemon, fetchTypeData } from "../api";
import { Container } from "../styles/CommonStyles";

const Detail: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const { data, error, isLoading } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => fetchPokemon(name!),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const pokemonAbility = useQueries({
    queries: (data?.abilities || []).map((a) => ({
      queryKey: ["a", a.url],
      queryFn: async () => {
        const ablityData = await fetchTypeData(a?.url);
        const koreaAbility =
          ablityData.names.find((name) => name.language.name === "ko")?.name ||
          ablityData;
        return { koreaAbility };
      },
    })),
  });
  if (isLoading) return <Container>Loading...</Container>;
  if (error instanceof Error)
    return <Container>Error:{error.message}</Container>;
  return (
    <Container>
      <div>
        <h2>{data?.koreaName}</h2>
        <img src={data?.sprites.front_default} alt={data?.name} />
        <p>키: {data?.height}</p>
        <p>몸무게: {data?.weight}</p>
        <p>
          타입: {data?.types.map((typeInfo) => typeInfo.type.name).join(",")}
        </p>
      </div>
    </Container>
  );
};

export default Detail;
