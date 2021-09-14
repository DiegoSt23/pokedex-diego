import "../styles/Pokemon.css";
import { useState, useEffect } from "react";
import { searchPokemon } from "../services/petitions";
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const Pokemon = () => {
  const { pokemon } = useParams();
  const [pokemonId, setPokemonId] = useState("");
  const [name, setName] = useState("");
  const [types, setTypes] = useState("");
  const [hp, setHp] = useState("");
  const [attack, setAttack] = useState("");
  const [defense, setDefense] = useState("");
  const [speed, setSpeed] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  useEffect(() => {
    if (pokemon) {
      const func = async () => {
        const res = await searchPokemon(pokemon);
        setPokemonId(res.data.id);
        setName(res.data.species.name);
        setTypes(res.data.types[0].type.name);
        setHp(res.data.stats[0].base_stat);
        setAttack(res.data.stats[1].base_stat);
        setDefense(res.data.stats[2].base_stat);
        setSpeed(res.data.stats[3].base_stat);
        setHeight(res.data.height);
        setWeight(res.data.weight);
      };
      func();
    }
  }, [pokemon]);

  useEffect(() => {
    if (pokemonId) {
      const func = async () => {
        const res = await searchPokemon(pokemonId);
        setPokemonId(res.data.id);
        setName(res.data.species.name);
        setTypes(res.data.types[0].type.name);
        setHp(res.data.stats[0].base_stat);
        setAttack(res.data.stats[1].base_stat);
        setDefense(res.data.stats[2].base_stat);
        setSpeed(res.data.stats[3].base_stat);
        setHeight(res.data.height);
        setWeight(res.data.weight);
      };
      func();
    }
  }, [pokemonId]);

  return (
    <div className="pokemon-container">
      <NavLink to={`/pokemon/${pokemonId - 1}`}>
        <FontAwesomeIcon icon={faChevronLeft} className="icon"/>
      </NavLink>  
      <div className="pokemon-sub-container">
      <div className="name-container">
        <h1>{name.toUpperCase()}</h1>
        <NavLink to={`/type/${types}`} className="link">
          <h3>{types.toUpperCase()}</h3>
        </NavLink>
        <h5># {pokemonId}</h5>
      </div>
      <div className="image-container">                  
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
          alt={name}
           className="image"
        />
        <a href={`https://www.google.com/search?q=${name}`} target="blank">
          <h5>Find more</h5>
        </a>  
      </div>
      <div className="details-container">
        <h6 className="stat">HP: {hp}</h6>
        <h6 className="stat">ATTACK: {attack}</h6>
        <h6 className="stat">DEFENSE: {defense}</h6>
        <h6 className="stat">SPEED: {speed}</h6>
        <h6 className="stat">HEIGHT: {height}</h6>
        <h6 className="stat">WEIGHT: {weight}</h6>
      </div>
      </div>    
      
      <NavLink to={`/pokemon/${pokemonId + 1}`}>
        <FontAwesomeIcon icon={faChevronRight} className="icon"/>
      </NavLink>
    </div>
  );
};

export default Pokemon;
