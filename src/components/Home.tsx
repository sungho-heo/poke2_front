// import
import React, { useState } from "react";
import styled from "styled-components";
import { UseQueryResult, useQueries, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { IKImage } from "imagekitio-react";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { fetchPokemonList, PokemonDataType } from "../api";
import { useToggleFav } from "../hooks/useToggleFav";
import {
  GridContainer,
  Container,
  PokemonList,
  ImageContainer,
  PokemonImageContainer,
  PokemonImage,
  FavButton,
} from "../styles/CommonStyles";
import { getPokemonDataKorea } from "../utils";

// css

const PokemonLogo = styled.div`
  max-width: 50%;
  display: flex;
  margin-top: 5px;
  align-items: center;
  justify-content: center;
`;

const LogoContainer = styled.div`
  width: 90px;
  min-width: 90px;
  padding: 0;
`;

// input css
const InputButtonContainer = styled.div`
  flex: 1;
  max-width: inherit;
`;

const InputButtonContainer2 = styled.div`
  position: relative;
  float: none !important;
  width: 100% !important;
  height: 55px;
  background: #fff;
`;

// search css

const SearchContainer = styled.div`
  width: 100%;
  margin-top: 100px;
  padding: 30px 25px 20px;
  background-color: #393939 !important;
`;

const SearchInput = styled.input`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  height: 55px;
  background: #0e0e0e;
  color: white;
  font-size: 20px;
  border-radius: 0 !important;
`;

const SearchRow = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SearchIconButton = styled.button`
  position: absolute;
  right: 0;
  color: white;
  height: 55px;
  width: 55px;
  background-color: #da343c !important;
  border-color: #da343c !important;
  color: #fff !important;
  cursor: pointer;
`;

// Home component
const Home: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchPokemon, setSearchPokemon] = useState<string>("");
  const { toggleFav, fav } = useToggleFav();

  // 포켓몬 이름 받아오기
  const {
    data: listData,
    error: listError,
    isLoading: listLoading,
  }: UseQueryResult<{ results: { name: string }[] }> = useQuery({
    queryKey: ["pokemonList"],
    queryFn: () => fetchPokemonList(),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10 minutes 캐싱 설정.
  });

  // 받아온 포켓몬의 상세 데이터.
  const pokemonInfo = useQueries({
    queries: (listData?.results || []).map((pokemon) => ({
      queryKey: ["pokemon", pokemon.name],
      queryFn: () => getPokemonDataKorea(pokemon.name),
      staleTime: 1000 * 60 * 5, // 5 minutes
    })),
  }) as UseQueryResult<PokemonDataType & { koreaName: string }>[];

  // search
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchPokemon(searchInput.trim());
  };

  const filterPokemon = searchPokemon
    ? pokemonInfo.filter((query) =>
        query.data?.koreaName.includes(searchPokemon)
      )
    : pokemonInfo;

  // 에러및 로딩 화면.
  if (listLoading) return <h1>...Loading</h1>;
  if (listError instanceof Error) return <h1>Error: {listError.message}</h1>;
  return (
    <Container>
      <SearchContainer>
        <form onSubmit={handleSearchSubmit}>
          <SearchRow>
            <LogoContainer>
              <PokemonLogo>
                <IKImage
                  path="/logo.png"
                  alt="logo"
                  lqip={{ active: true }}
                  transformation={[
                    { height: "50", width: "50", format: "webp" },
                  ]}
                />
              </PokemonLogo>
            </LogoContainer>
            <InputButtonContainer>
              <InputButtonContainer2>
                <SearchInput
                  type="text"
                  placeholder="포켓몬 이름을 입력해주세요."
                  value={searchInput}
                  onChange={handleSearchInput}
                />
                <SearchIconButton type="submit">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </SearchIconButton>
              </InputButtonContainer2>
            </InputButtonContainer>
          </SearchRow>
        </form>
      </SearchContainer>
      <GridContainer>
        {filterPokemon?.map((query, index) => {
          const { data, error, isLoading } = query;
          if (isLoading) return <h1 key={index}>Loading...</h1>;
          if (error instanceof Error)
            return <h1 key={index}>Error:{error.message}</h1>;

          const isFav = Array.isArray(fav) && fav.includes(data?.name || "");

          return (
            <PokemonList key={index}>
              <FavButton onClick={() => toggleFav(data?.name || "")}>
                <FontAwesomeIcon icon={isFav ? solidStar : regularStar} />
              </FavButton>
              <h2>{data?.koreaName}</h2>
              <Link to={`/pokemon/${data?.name}`}>
                <ImageContainer>
                  <PokemonImageContainer>
                    <PokemonImage
                      src={data?.sprites.front_default}
                      alt={data?.name}
                      loading="lazy"
                    />
                  </PokemonImageContainer>
                </ImageContainer>
                <p>
                  {data?.types
                    .map((typeDetail) => typeDetail.type.name)
                    .join(",")}
                </p>
              </Link>
            </PokemonList>
          );
        })}
      </GridContainer>
    </Container>
  );
};

export default Home;
