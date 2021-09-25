import "../styles/Pokemon.css";
import { useState, useEffect } from "react";
import { searchPokemon } from "../services/petitions";
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import useFavorites from "../context/favorites/useFavorites";

const Pokemon = () => {
  const {favorites, addFavorite, removeFavorite} = useFavorites();
  
  const { pokemon } = useParams();  
  const [requestStatus, setRequestStatus] = useState(true);
  const [loaderState, setLoaderState] = useState(true);
  const [pokemonId, setPokemonId] = useState("");
  const [name, setName] = useState("");
  const [types, setTypes] = useState("");
  const [hp, setHp] = useState("");
  const [attack, setAttack] = useState("");
  const [defense, setDefense] = useState("");
  const [speed, setSpeed] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("red");
  const [starColor, setStarColor] = useState("");

  useEffect(() => {
    if (pokemon) {     
      const func = async () => {
        try {
          const res = await searchPokemon(pokemon);
          setRequestStatus(true)
          setPokemonId(res.data.id);
          setName(res.data.species.name);
          setTypes(res.data.types[0].type.name);
          setHp(res.data.stats[0].base_stat);
          setAttack(res.data.stats[1].base_stat);
          setDefense(res.data.stats[2].base_stat);
          setSpeed(res.data.stats[3].base_stat);
          setHeight(res.data.height);
          setWeight(res.data.weight);
        } catch(error) {
          setRequestStatus(false)
        }       
      };
      func();
    }
  }, [pokemon]);

  useEffect(() => {
    if (pokemonId) {     
      const func = async () => {
        try {
          const res = await searchPokemon(pokemonId);
          setRequestStatus(true)
          setPokemonId(res.data.id);
          setName(res.data.species.name);
          setTypes(res.data.types[0].type.name);
          setHp(res.data.stats[0].base_stat);
          setAttack(res.data.stats[1].base_stat);
          setDefense(res.data.stats[2].base_stat);
          setSpeed(res.data.stats[3].base_stat);
          setHeight(res.data.height);
          setWeight(res.data.weight);
        } catch(error) {
          setRequestStatus(false)
        }       
      };
      func();
    }
  }, [pokemonId]);

  setTimeout(() => {
    setLoaderState(false);
  }, 1500);

  useEffect(() => {
    if (types === "normal") {
      setColor("rgb(172, 176, 180)")
    }
    if (types === "fighting") {
      setColor("rgb(175, 9, 78)")
    }
    if (types === "flying") {
      setColor("rgb(83, 182, 185)")
    }
    if (types === "poison") {
      setColor("rgb(116, 24, 190)")
    }
    if (types === "ground") {
      setColor("rgb(107, 91, 55)")
    }
    if (types === "rock") {
      setColor("rgb(74, 79, 83)")
    }
    if (types === "bug") {
      setColor("rgb(117, 196, 71)")
    }
    if (types === "ghost") {
      setColor("rgb(52, 40, 85)")
    }
    if (types === "steel") {
      setColor("rgb(61, 75, 87)")
    }
    if (types === "fire") {
      setColor("red")
    }
    if (types === "water") {
      setColor("rgb(8, 135, 194)")
    }
    if (types === "grass") {
      setColor("rgb(6, 184, 139)")
    }
    if (types === "electric") {
      setColor("rgb(175, 157, 76)")
    }
    if (types === "psychic") {
      setColor("rgb(174, 58, 185)")
    }
    if (types === "ice") {
      setColor("rgb(131, 187, 224)")
    }
    if (types === "dragon") {
      setColor("rgb(0, 113, 117)")
    }
    if (types === "dark") {
      setColor("rgb(30, 31, 31)")
    }
    if (types === "fairy") {
      setColor("rgb(189, 145, 178)")
    }
  }, [types]);

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
  }, [pokemonId, favorites]);

  const decreasePokemonId = () => {
    if (pokemonId > 1) {
      return (`/pokemon/${pokemonId - 1}`)
    } else {
      return (`/pokemon/${pokemonId}`)
    }
  };

  const increasePokemonId = () => {
    if (pokemonId < 898) {
      return (`/pokemon/${pokemonId + 1}`)
    } else {
      return (`/pokemon/${pokemonId}`)
    }
  };
 
  return (
    <>
    {loaderState
      ? <div className="preloader"></div>
      : <div className="pokemon-main-container" style={{backgroundColor: color}}>
      <div className="pokemon-container">
      {requestStatus 
        ? <>
          <NavLink to={decreasePokemonId}>
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
              <div className="options-container">            
                <a href={`https://www.google.com/search?q=${name}`} target="blank">
                  <h5>Google it</h5>
                </a>
                {/* <NavLink to="/favorites"><h5>Go to favorites</h5></NavLink> */}
                <FontAwesomeIcon icon={faStar} onClick={handleAddRemoveFavorite} style={{color: starColor, cursor: "pointer"}}/>
              </div>           
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
          <NavLink to={increasePokemonId}>
            <FontAwesomeIcon icon={faChevronRight} className="icon"/>
          </NavLink>
        </>
        : <div className="error-message-container">
            <h3>Please enter a valid name or a number between 1 and 898.</h3>
          </div>
      }      
    </div>
    </div>
    }
    
    </>
  );
};

export default Pokemon;
