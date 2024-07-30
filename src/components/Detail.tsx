import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getPokemonDataKorea } from "../utils";

// css세팅

const DetailContainer = styled.div`
  max-width: 1250px;
  width: 100%;
  margin-top: 200px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;

const DetailCard = styled.div`
  padding: 15px 50px 50px;
  border: 3px solid #333;
  border-radius: 0 0 10px 10px;
  background-color: #fff;

  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 50%;
  min-width: 500px;
`;
const Img = styled.img`
  width: 390px;
`;

const PokemonDetailContainer = styled.div`
  flex: 0 0 50%;
  min-width: 300px;
  max-width: 50%;
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
`;

const PokemonDetails = styled.div`
  padding: 8px 30px 20px;
  border: 1px solid #e8e8e8;
  border-radius: 7px;
`;

const PokemonInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TextContainer = styled.div`
  margin: 12px 0;
  padding-right: 0;
  flex: 0 0 50%;
  max-width: 50%;
  position: relative;
  width: 100%;
  padding-left: 15px;
`;

const Detail: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const { data, error, isLoading } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: async () => getPokemonDataKorea(name!),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  if (isLoading) return <DetailContainer>Loading...</DetailContainer>;
  if (error instanceof Error)
    return <DetailContainer>Error:{error.message}</DetailContainer>;

  const height = data?.height ? (data.height / 10).toFixed(1) : "정보 없음";
  const weight = data?.weight ? (data.weight / 10).toFixed(1) : "정보 없음";

  return (
    <DetailContainer>
      <DetailCard>
        <ImgContainer>
          <Img src={data?.sprites.front_default} alt={data?.name} />
        </ImgContainer>
        <PokemonDetailContainer>
          <h3>{data?.koreaName}</h3>
          <PokemonDetails>
            <PokemonInfoContainer>
              <TextContainer>
                <h4>타입</h4>
                <div>
                  {data?.types.map((typeInfo) => typeInfo.type.name).join(",")}
                </div>
              </TextContainer>
              <TextContainer>
                <h4>키</h4> <p>{height}m</p>
              </TextContainer>
            </PokemonInfoContainer>
            <PokemonInfoContainer>
              <TextContainer>
                <h4>몸무게</h4> <p>{weight}kg</p>
              </TextContainer>
              <TextContainer>
                <h4>특성</h4>
                <div>
                  {data?.abilities
                    .map((abilityDetail) => abilityDetail.ability.name)
                    .join(",")}
                </div>
              </TextContainer>
            </PokemonInfoContainer>
          </PokemonDetails>
        </PokemonDetailContainer>
      </DetailCard>
    </DetailContainer>
  );
};

export default Detail;
