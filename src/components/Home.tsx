import React, { useState } from "react";
import styled from "styled-components";
import {
  UseQueryResult,
  useQueries,
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { fetchPokemonList, PokemonData } from "../api";
import { addFav, removeFav } from "../api/fav";
import {
  GridContainer,
  Container,
  PokemonList,
  ImageContainer,
  PokemonImageContainer,
  PokemonImage,
} from "../styles/CommonStyles";
import { getPokemonDataKorea } from "../utils";
import { useAuth } from "../context/AuthContext";

// css
const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: #393939 !important;
`;

const SearchInput = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1000px;
  padding: 20px;
  background: #0e0e0e;
  color: #fff;
`;
const PokeDex = styled.img`
  display: flex;
  width: 50px;
  height: 50px;
  border-radius: 10px solid black;
  padding: 10px;
`;

const SearchIcon = styled.div`
  height: 55px;
  width: 55px;
`;

const Home: React.FC = () => {
  const [searchPokemon, setSearchPokemon] = useState<string>("");
  const { token, fav, setFav } = useAuth();

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
      queryFn: () => getPokemonDataKorea(pokemon.name),
      staleTime: 1000 * 60 * 5, // 5 minutes
    })),
  }) as UseQueryResult<PokemonData & { koreaName: string }>[];

  // addFav
  const addFavMutation = useMutation({
    mutationFn: addFav,
    onSuccess: (data: { fav: string[] }) => {
      setFav(data.fav);
    },
  });

  // removeFav
  const removeFavMutation = useMutation({
    mutationFn: removeFav,
    onSuccess: (data: { fav: string[] }) => {
      setFav(data.fav);
    },
  });

  // togglefav
  const toggleFav = (pokemonName: string) => {
    if (Array.isArray(fav) && fav.includes(pokemonName)) {
      removeFavMutation.mutate({ token: token!, pokemonName });
    } else {
      addFavMutation.mutate({ token: token!, pokemonName });
    }
  };

  // search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPokemon(event.target.value);
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
        <form>
          <PokeDex src="./logo.jpeg" />
          <div>
            <SearchInput
              type="text"
              placeholder="포켓몬 이름을 입력해주세요."
              value={searchPokemon}
              onChange={handleSearch}
            />
            <SearchIcon>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </SearchIcon>
          </div>
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
            <div>
              <PokemonList key={index}>
                <button onClick={() => toggleFav(data?.name || "")}>
                  <FontAwesomeIcon icon={isFav ? solidStar : regularStar} />
                </button>
                <h2>{data?.koreaName}</h2>
                <Link to={`/pokemon/${data?.name}`}>
                  <ImageContainer>
                    <PokemonImageContainer>
                      <PokemonImage
                        src={data?.sprites.front_default}
                        alt={data?.name}
                      />
                    </PokemonImageContainer>
                  </ImageContainer>
                  <p>
                    타입:
                    {data?.types
                      .map((typeDetail) => typeDetail.type.name)
                      .join(",")}
                  </p>
                </Link>
              </PokemonList>
            </div>
          );
        })}
      </GridContainer>
    </Container>
  );
};

export default Home;
