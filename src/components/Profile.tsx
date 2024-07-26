import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  TitileContainer,
  GridContainer,
  PokemonList,
  ImageContainer,
  PokemonImageContainer,
  PokemonImage,
} from "../styles/CommonStyles";
import { PokemonData, fetchPokemon } from "../api";

// Profile
const Profile: React.FC = () => {
  const { token, fav } = useAuth();
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);

  useEffect(() => {
    const fetchFavPokemonData = async () => {
      if (fav.length > 0) {
        try {
          const pokemonDetailsPromises = fav.map((name) => fetchPokemon(name));
          const pokemonDetails = await Promise.all(pokemonDetailsPromises);
          setPokemonData(pokemonDetails);
        } catch (err) {
          console.error("Failed to fetch pokemon data", err);
        }
      }
    };
    fetchFavPokemonData();
  }, [fav]);

  if (!token) {
    return <p> Please Signup or Login.</p>;
  }
  return (
    <Container>
      <TitileContainer>
        <h2>가장 좋아하는 포켓몬</h2>
        <GridContainer>
          {pokemonData.length > 0 ? (
            pokemonData.map((pokemon) => (
              <div>
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
              </div>
            ))
          ) : (
            <p>즐겨찾기한 포켓몬이 존재하지않습니다.</p>
          )}
        </GridContainer>
      </TitileContainer>
    </Container>
  );
};

export default Profile;
