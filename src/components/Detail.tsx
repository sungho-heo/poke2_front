import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getPokemonDataKorea } from "../utils";

// css세팅
const DetailContainer = styled.div`
  max-width: 1250px;
  width: 100%;
  margin-top: 300px;
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
  max-width: 50%;
  min-width: 500px;
`;
const Img = styled.img`
  width: 100%;
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

  return (
    <DetailContainer>
      <DetailCard>
        <ImgContainer>
          <Img src={data?.sprites.front_default} alt={data?.name} />
        </ImgContainer>
        <div>
          <h3>{data?.koreaName}</h3>
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
      </DetailCard>
    </DetailContainer>
  );
};

export default Detail;
