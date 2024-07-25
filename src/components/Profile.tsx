import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Container, TitileContainer } from "../styles/CommonStyles";
import { PokemonData, fetchPokemon, GridContainer } from "../api";

// Profile
const Profile: React.FC = () => {
  const { token } = useAuth();
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);

  if (!token) {
    return <p> Please Signup or Login.</p>;
  }
  return (
    <Container>
      <TitileContainer>
        <h2>가장 좋아하는 포켓몬</h2>
        <GridContainer></GridContainer>
      </TitileContainer>
    </Container>
  );
};

export default Profile;
