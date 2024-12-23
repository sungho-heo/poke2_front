import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  GridContainer,
  PokemonList,
  ImageContainer,
  PokemonImageContainer,
  PokemonImage,
} from "../styles/CommonStyles";
import { PokemonData } from "../api";
import { getPokemonDataKorea } from "../utils";

// css
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ErrorText = styled.h1`
  max-width: 1250px;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  padding-top: 100px;
`;

const ProfileContainer = styled.div`
  display: flex;
  width: 100%;

  flex-direction: column;
  justify-content: cneter;
  align-items: center;
`;

// Profile
const Profile: React.FC = () => {
  const { token, fav } = useAuth();
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);

  useEffect(() => {
    const fetchFavPokemonData = async () => {
      if (fav.length > 0) {
        try {
          const pokemonDetailsPromises = fav.map((name) =>
            getPokemonDataKorea(name)
          );
          const pokemonDetails = await Promise.all(pokemonDetailsPromises);
          setPokemonData(pokemonDetails);
        } catch (err) {
          console.error("Failed to fetch pokemon data", err);
        }
      }
    };
    fetchFavPokemonData();
  }, [fav]);
  console.log(pokemonData);

  if (!token) {
    return <ErrorText>Please Signup or Login. </ErrorText>;
  }

  return (
    <ProfileContainer>
      <Title>
        <h2>가장 좋아하는 포켓몬</h2>
      </Title>
      {pokemonData.length > 0 ? (
        <GridContainer>
          {pokemonData.map((pokemon) => (
            <PokemonList key={pokemon.koreaName}>
              <FontAwesomeIcon icon={solidStar} />
              <h2>{pokemon?.koreaName}</h2>
              <Link to={`/pokemon/${pokemon?.name}`}>
                <ImageContainer>
                  <PokemonImageContainer>
                    <PokemonImage
                      src={pokemon?.sprites.front_default}
                      alt={pokemon?.name}
                    />
                  </PokemonImageContainer>
                </ImageContainer>
                <p>
                  타입:
                  {pokemon?.types
                    .map((typeDetail) => typeDetail.type.name)
                    .join(",")}
                </p>
              </Link>
            </PokemonList>
          ))}
        </GridContainer>
      ) : (
        <LoadingContainer>
          <ErrorText>즐겨찾기한 포켓몬이 존재하지 않습니다.</ErrorText>
        </LoadingContainer>
      )}
    </ProfileContainer>
  );
};

export default Profile;
