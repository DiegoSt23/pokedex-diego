import { useState, useEffect } from "react";
import { searchPokemon } from "../services/petitions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import useFavorites from "../context/favorites/useFavorites";
import { NavLink } from "react-router-dom";

const Favorite = ({id}) => {
  const {favorites, removeFavorite} = useFavorites()
  const [name, setName] = useState("");
  const [pokemonId, setPokemonId] = useState("");

  useEffect(() => {
    if (id) {
      const func = async () => {
        const res = await searchPokemon(id);
        setName(res.data.name);
        setPokemonId(res.data.id);
      }
      func()
    }
  }, [id, favorites]);

  const handleDelete = () => {
    removeFavorite(pokemonId)
  }

  return (
    <div className="favorite">
      <div className="favorite-details-container"> 
        <div className="favorite-image-container">
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`} alt={pokemonId} className="favorite-image"/>
        </div>   
        <p>#{pokemonId} <NavLink to={`/pokemon/${name}`}>{name.toUpperCase()}</NavLink></p>                       
      </div>     
      <FontAwesomeIcon icon={faTrash} onClick={handleDelete} className="remove-button"/>     
    </div>
  )
};

export default Favorite