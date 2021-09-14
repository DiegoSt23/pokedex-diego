import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { searchPokemon } from "../services/petitions";

const Pokemons = ({id}) => {
  const [loaderState, setLoaderState] = useState(true);
  const [name, setName] = useState("");
  const [pokemonId, setPokemonId] = useState("");
  const [picture, setPicture] = useState("");
  const [types, setTypes] = useState("");

  useEffect(() => {
    if (id) {     
      const func = async () => {
        const res = await searchPokemon(id)
        setName(res.data.species.name)
        setPokemonId(res.data.id)
        setPicture(res.data.sprites.other.dream_world.front_default) 
        setTypes(res.data.types[0].type.name)
      }
      func()
    }
  }, [id]);

  setTimeout(() => {
    setLoaderState(false);
  }, 1000);

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
      </div>
      <div className="info-container">
        <h5># {pokemonId}</h5>
        <h5>{types.toUpperCase()}</h5>
      </div>
    </div>
  )
};

export default Pokemons