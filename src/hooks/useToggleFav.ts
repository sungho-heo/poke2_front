import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { addFav, removeFav } from "../api/fav";

export const useToggleFav = () => {
  const { token, fav, setFav } = useAuth();

  const addFavMutation = useMutation({
    mutationFn: addFav,
    onSuccess: (data: { fav: string[] }) => {
      setFav(data.fav);
    },
  });

  const removeFavMutation = useMutation({
    mutationFn: removeFav,
    onSuccess: (data: { fav: string[] }) => {
      setFav(data.fav);
    },
  });

  const toggleFav = (pokemonName: string) => {
    if (Array.isArray(fav) && fav.includes(pokemonName)) {
      removeFavMutation.mutate({ token: token!, pokemonName });
    } else {
      addFavMutation.mutate({ token: token!, pokemonName });
    }
  };

  return { toggleFav, fav };
};
