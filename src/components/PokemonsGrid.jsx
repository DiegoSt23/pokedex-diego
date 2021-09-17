import "../styles/PokemonsGrid.css";
import { useState, useEffect } from "react";
import { searchType, searchAllPokemons } from "../services/petitions";
import { useParams, useHistory } from "react-router";
import Pokemons from "./Pokemons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const PokemonsGrid = () => {
  const history = useHistory();
  const {type} = useParams();
  const [results, setResults] = useState([]);
  const [pokemonType, setPokemonType] = useState([]);
  const [offset, setOffset] = useState(0);
  const [typeStatus, setTypeStatus] = useState();
  const [sliceParam1, setSliceParram1] = useState(0);
  const [sliceParam2, setSliceParram2] = useState(4);
  
  useEffect(() => { 
    const func = async () => {
      if (type === "all") {
        const res = await searchAllPokemons(offset)
        setTypeStatus(true)
        setResults(res.data.results)
      } else {
        const res = await searchType(type) 
        setTypeStatus(false)
        setPokemonType(res.data.pokemon)
      }                 
    }
    func()     
  }, [offset, type, typeStatus]);

  const next = () => {
    setOffset(prevState => prevState + 4)    
  };

  const prev = () => {
    if (offset > 0) {
      setOffset(prevState => prevState - 4)
    }   
  };

  const next2 = () => {
    if (sliceParam1 >= 0 && sliceParam2 >= 4) {
      setSliceParram1(prevState => prevState + 4)
      setSliceParram2(prevState => prevState + 4)
    }
  };

  const prev2 = () => {
    if (sliceParam1 > 0 && sliceParam2 > 4) {
      setSliceParram1(prevState => prevState - 4)
      setSliceParram2(prevState => prevState - 4)
    }
  };

  const list = results.map((item) => <Pokemons key={item.name} id={item.name} />);

  const list2 = pokemonType.map((item) => <Pokemons key={item.pokemon.name} id={item.pokemon.name} />)

  return (
    <div className="pokemons-container">
      <h2>{type.toUpperCase()}</h2>
      <div className="pokemons-sub-container">
      <div className="nav-buttons">
        {typeStatus
          ? <FontAwesomeIcon icon={faChevronLeft} className="icon" onClick={prev}/>
          : <FontAwesomeIcon icon={faChevronLeft} className="icon" onClick={prev2}/>
        }
      </div>
      <div className="grid">
        {typeStatus
          ? list
          : list2.slice(sliceParam1, sliceParam2)
        }
      </div>
      <div className="nav-buttons">
        {typeStatus
          ? <FontAwesomeIcon icon={faChevronRight} className="icon" onClick={next}/>
          : <FontAwesomeIcon icon={faChevronRight} className="icon" onClick={next2}/>
        }
      </div>
      </div>
      <button onClick={() => history.goBack()} className="back-button">Back</button>
    </div>
  )
};

export default PokemonsGrid