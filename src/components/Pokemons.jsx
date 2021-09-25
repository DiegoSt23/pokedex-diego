import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { searchPokemon } from "../services/petitions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import useFavorites from "../context/favorites/useFavorites";


const Pokemons = ({id}) => {
  const {favorites, addFavorite, removeFavorite} = useFavorites();

  const [loaderState, setLoaderState] = useState(true);
  const [name, setName] = useState("");
  const [pokemonId, setPokemonId] = useState("");
  const [picture, setPicture] = useState("");
  const [starColor, setStarColor] = useState("");

  useEffect(() => {
    if (id) {     
      const func = async () => {
        const res = await searchPokemon(id)
        console.log(res)
        setName(res.data.species.name)
        setPokemonId(res.data.id)
        setPicture(res.data.sprites.front_default) 
      }
      func()
    }
  }, [id]);

  setTimeout(() => {
    setLoaderState(false);
  }, 1000);

  const handleAddRemoveFavorite = () => {
    if (favorites.includes(pokemonId)) {
      removeFavorite(pokemonId);
      setStarColor("white")
    } else if (!favorites.includes(pokemonId) && favorites.length <= 19) {
      addFavorite(pokemonId)
      setStarColor("rgb(255, 217, 0)")
    } else if (favorites.length > 19) {
      alert("You can't add more than 20")
    }  
  };

  useEffect(() => {
    if (favorites.includes(pokemonId)) {
      setStarColor("rgb(255, 217, 0)")
    } else {
      setStarColor("white")
    }   
  }, [pokemonId, favorites])

  return (
    <div className="pokemon-container2">
      <div className="image-container2">
        {loaderState
          ? <div className="preloader"></div>
          : <img src={picture} alt={name} className="image2"/>           
        } 
        <NavLink to={`/pokemon/${name}`} className="link2">
          <h3>{name.toUpperCase()}</h3>
        </NavLink>
        <FontAwesomeIcon icon={faStar} onClick={handleAddRemoveFavorite} style={{color: starColor, cursor: "pointer"}}/>              
      </div>
      <div className="info-container">
        <h5># {pokemonId}</h5>
      </div>
    </div>
  )
};

export default Pokemons