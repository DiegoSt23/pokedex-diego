import "../styles/PokemonsGrid.css";
import { useState, useEffect } from "react";
import { searchType } from "../services/petitions";
import { useParams, useHistory } from "react-router";
import Pokemons from "./Pokemons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faStar} from "@fortawesome/free-solid-svg-icons";
import useFavorites from "../context/favorites/useFavorites";

const PokemonsGrid = () => {
  const history = useHistory();
  const {type} = useParams();
  const [typeStatus, setTypeStatus] = useState(false);
  const {favorites} = useFavorites();
  const [lengthStatus, setLengthStatus] = useState(true);
  const [requestStatus, setRequesStatus] = useState(true)
  const [pokemonType, setPokemonType] = useState([]);
  const [sliceParam1, setSliceParram1] = useState(JSON.parse(localStorage.getItem("slice1")) || 0);
  const [sliceParam2, setSliceParram2] = useState(JSON.parse(localStorage.getItem("slice2")) || 4);
  const [page, setPage] = useState(JSON.parse(localStorage.getItem("page")) || 1);
  const [backgroundColor, setBackgroundColor] = useState("");
  
  useEffect(() => { 
    if (type === "favorites") {
      setTypeStatus(false);
    } else {
      setTypeStatus(true);
      const func = async () => {
        try {
          const res = await searchType(type) ;
          setPokemonType(res.data.pokemon);
          setRequesStatus(true);
        } catch(error) {
          setRequesStatus(false)
        }                           
      }
      func()
    }         
  }, [type]);

  useEffect(() => {
    if (favorites.length === 0) {
      setLengthStatus(false)
    } else {
      setLengthStatus(true)
    }
  }, [favorites]);

  const next = () => {
    if (sliceParam1 < pokemonType.length - 4 && sliceParam2 < pokemonType.length) {
      setSliceParram1(prevState => prevState + 4);
      setSliceParram2(prevState => prevState + 4);
      setPage(prevState => prevState + 1)
    }
  };

  const prev = () => {
    if (sliceParam1 > 0 && sliceParam2 > 4) {
      setSliceParram1(prevState => prevState - 4);
      setSliceParram2(prevState => prevState - 4);
      setPage(prevState => prevState - 1)
    }
  };

  const favNext = () => {
    if (sliceParam1 < favorites.length - 4 && sliceParam2 < favorites.length) {
      setSliceParram1(prevState => prevState + 4);
      setSliceParram2(prevState => prevState + 4);
      setPage(prevState => prevState + 1);
    }
  };

  const favPrev = () => {
    if (sliceParam1 > 0 && sliceParam2 > 4) {
      setSliceParram1(prevState => prevState - 4);
      setSliceParram2(prevState => prevState - 4);
      setPage(prevState => prevState - 1);
    }
  };

  useEffect(() => {
    localStorage.setItem("slice1", JSON.stringify(sliceParam1));
    localStorage.setItem("slice2", JSON.stringify(sliceParam2));
    localStorage.setItem("page", JSON.stringify(page));
  }, [sliceParam1, sliceParam2, page]);

  useEffect(() => {
    if (type === "favorites") {
      setBackgroundColor("red");
      setSliceParram1(0);
      setSliceParram2(4);
      setPage(1);
    }
    if (type === "normal") {
      setBackgroundColor("rgb(172, 176, 180)")
    }
    if (type === "fighting") {
      setBackgroundColor("rgb(175, 9, 78)")
    }
    if (type === "flying") {
      setBackgroundColor("rgb(72, 189, 235)")
    }
    if (type === "poison") {
      setBackgroundColor("rgb(116, 24, 190)")
    }
    if (type === "ground") {
      setBackgroundColor("rgb(107, 91, 55)")
    }
    if (type === "rock") {
      setBackgroundColor("rgb(74, 79, 83)")
    }
    if (type === "bug") {
      setBackgroundColor("rgb(117, 196, 71)")
    }
    if (type === "ghost") {
      setBackgroundColor("rgb(52, 40, 85)")
    }
    if (type === "steel") {
      setBackgroundColor("rgb(61, 75, 87)")
    }
    if (type === "fire") {
      setBackgroundColor("rgb(150, 0, 0)")
    }
    if (type === "water") {
      setBackgroundColor("rgb(8, 135, 194)")
    }
    if (type === "grass") {
      setBackgroundColor("rgb(6, 184, 139)")
    }
    if (type === "electric") {
      setBackgroundColor("rgb(175, 157, 76)")
    }
    if (type === "psychic") {
      setBackgroundColor("rgb(174, 58, 185)")
    }
    if (type === "ice") {
      setBackgroundColor("rgb(131, 187, 224)")
    }
    if (type === "dragon") {
      setBackgroundColor("rgb(0, 113, 117)")
    }
    if (type === "dark") {
      setBackgroundColor("rgb(30, 31, 31)")
    }
    if (type === "fairy") {
      setBackgroundColor("rgb(189, 145, 178)")
    }
  }, [type]);

  const list = pokemonType.map((item) => <Pokemons key={item.pokemon.name} id={item.pokemon.name} />);

  const favoritesList = favorites.map((item, index) => <Pokemons key={index} id={item}/>);

  return ( 
    <div className="pokemons-container">
      <h2>{type.toUpperCase()}</h2>
      <h5 style={{color: "white"}}>{page}</h5>
      <div className="pokemons-sub-container">
        <div className="nav-buttons">
          {typeStatus
            ? <FontAwesomeIcon icon={faChevronLeft} className="icon" onClick={prev}/>
            : <FontAwesomeIcon icon={faChevronLeft} className="icon" onClick={favPrev}/>
          }          
        </div>
        <div className="grid" style={{backgroundColor: backgroundColor}}>
          {typeStatus
            ? requestStatus 
                ? list.slice(sliceParam1, sliceParam2)
                : <p>:/ Please enter a valid type.</p>
            : lengthStatus
                ? favoritesList.slice(sliceParam1, sliceParam2)
                : <p>So empty :C. You can add your favorite pokemons (up to 20) with the <FontAwesomeIcon icon={faStar} style={{color: "yellow"}}/> icon.</p>
          }            
        </div>
        <div className="nav-buttons">
          {typeStatus
            ? <FontAwesomeIcon icon={faChevronRight} className="icon" onClick={next}/>
            : <FontAwesomeIcon icon={faChevronRight} className="icon" onClick={favNext}/>
          }        
        </div>
      </div>
      <button onClick={() => history.goBack()} className="back-button">Back</button>
    </div>
  )
};

export default PokemonsGrid