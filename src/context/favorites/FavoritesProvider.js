import { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

const FavoritesProvider = ({children}) => {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites]);

  const contextValue = {
    favorites,
    addFavorite(pokemonId) {
      setFavorites([...favorites, pokemonId]);
    },
    removeFavorite(pokemonId) {
      setFavorites(favorites.filter((element) => element !== pokemonId));
    }
  };

  return <FavoritesContext.Provider value={contextValue}>
    {children}
  </FavoritesContext.Provider>
};

export default FavoritesProvider