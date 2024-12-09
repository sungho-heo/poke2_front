import axios from "axios";

const API_URL = "https://poke2-backend.onrender.com/api/fav";

// 로그인한 유저의 포켓몬 즐겨찾기 데이터를 가져옴.
export const fetchFav = async (token: string) => {
  const response = await axios.get(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.fav;
};

// 유저가 추가한 포켓몬을 데이터에 추가.
export const addFav = async ({
  token,
  pokemonName,
}: {
  token: string;
  pokemonName: string;
}) => {
  const response = await axios.post(
    `${API_URL}/add`,
    { pokemonName },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// 유저의 즐겨찾기한 포켓몬 삭제
export const removeFav = async ({
  token,
  pokemonName,
}: {
  token: string;
  pokemonName: string;
}) => {
  const response = await axios.delete(`${API_URL}/remove/${pokemonName}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
