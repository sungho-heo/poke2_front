import {
  fetchPokemon,
  fetchPokemonSpecies,
  fetchTypeData,
  fetchAbility,
} from "./api";

export const getPokemonDataKorea = async (name: string) => {
  // 포켓몬 데이터
  const pokemonData = await fetchPokemon(name);

  // 포켓몬 이름 한글화
  const speciesData = await fetchPokemonSpecies(name);
  const koreaName =
    speciesData.names.find((name) => name.language.name === "ko")?.name ||
    pokemonData.name;

  // 포켓몬 타입 한글화
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
  // 포켓몬 특성 데이터 한글화과정.
  const abilityNames = await Promise.all(
    pokemonData.abilities.map(async (abilityInfo) => {
      const abiltyData = await fetchAbility(abilityInfo.ability.url);
      const koreaAbilityName =
        abiltyData.names.find((name) => name.language.name === "ko")?.name ||
        abilityInfo.ability.name;
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
};
