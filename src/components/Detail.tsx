import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  fetchPokemon,
  fetchPokemonSpecies,
  fetchTypeData,
  fetchAbility,
} from "../api";
import { Container } from "../styles/CommonStyles";

const Detail: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const { data, error, isLoading } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: async () => {
      // 포켓몬 데이터 받아오기
      const pokemonData = await fetchPokemon(name!);

      // 포켓몬 이름 한글화
      const speciesData = await fetchPokemonSpecies(name!);
      const koreaName =
        speciesData.names.find((name) => name.language.name === "ko")?.name ||
        pokemonData.name;

      // 타입 한글화
      const typeNames = await Promise.all(
        pokemonData.types.map(async (typeInfo) => {
          const typeData = await fetchTypeData(typeInfo.type.url);
          const koreaTypeName =
            typeData.names.find((name) => name.language.name === "ko")?.name ||
            typeInfo.type.name;
          return {
            ...typeInfo,
            type: { ...typeInfo.type, name: koreaTypeName },
          };
        })
      );

      // 특성 한글화
      const abilityNames = await Promise.all(
        pokemonData.abilities.map(async (abilityInfo) => {
          const abilityData = await fetchAbility(abilityInfo.ability.url);
          const koreaAbilityName =
            abilityData.names.find((name) => name.language.name === "ko")
              ?.name || abilityInfo.ability.name;
          return {
            ...abilityInfo,
            ability: { ...abilityInfo.ability, name: koreaAbilityName },
          };
        })
      );

      return {
        ...pokemonData,
        koreaName,
        types: typeNames,
        abilities: abilityNames,
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
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
        <p>
          특성:
          {data?.abilities
            .map((abilityDetail) => abilityDetail.ability.name)
            .join(",")}
        </p>
      </div>
    </Container>
  );
};

export default Detail;
