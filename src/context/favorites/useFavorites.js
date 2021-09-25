import { useContext } from "react";
import { FavoritesContext } from "./FavoritesProvider";

const useFavorites = () => {
  return useContext(FavoritesContext);
};

export default useFavorites

