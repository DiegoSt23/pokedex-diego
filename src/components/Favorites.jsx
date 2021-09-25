import "../styles/Favorites.css";
import useFavorites from "../context/favorites/useFavorites";
import Favorite from "./Favorite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react/cjs/react.development";

const Favorites = () => {
  const {favorites} = useFavorites();
  const [lengthStatus, setLengthStatus] = useState(false);
  const [slice1, setSlice1] = useState(0);
  const [slice2, setSlice2] = useState(4);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (favorites.length === 0) {
      setLengthStatus(true)
    } else {
      setLengthStatus(false)
    }
  }, [favorites]);

  const prev = () => {
    if (slice1 > 0 && slice2 > 4) {
      setSlice1(prevState => prevState - 4);
      setSlice2(prevState => prevState - 4);
      setPageNumber(prevState => prevState - 1);
    }
  };

  const next = () => {
    if (slice1 < favorites.length - 4 && slice2 < favorites.length) {
      setSlice1(prevState => prevState + 4);
      setSlice2(prevState => prevState + 4);
      setPageNumber(prevState => prevState + 1);
    }
  };
  
  const list = favorites.map((item, index) => <Favorite id={item} key={index}/>)

  return (
    <div className="favorites">
      <div className="favorites-main-container">
        <div className="nav">
          {lengthStatus
            ? <p></p>
            : <FontAwesomeIcon icon={faChevronLeft} style={{color: "yellow", fontSize: "1.5rem", cursor: "pointer"}} onClick={prev}/>
          }       
        </div>
        <div className="favorites-container">
          <h2>Favorites</h2>
          {lengthStatus
            ? <p></p>
            : <p>{pageNumber}</p>}
          <div className="favorites-sub-container">
            {lengthStatus
              ? <p>So empty :C. You can add your favorite pokemons (up to 20) with the <FontAwesomeIcon icon={faStar} style={{color: "yellow"}}/> icon.</p>
              : list.slice(slice1,slice2)
            }       
          </div>
        </div>
        <div className="nav">
          {lengthStatus
            ? <p></p>
            : <FontAwesomeIcon icon={faChevronRight} style={{color: "yellow", fontSize: "1.5rem", cursor: "pointer"}} onClick={next}/>
          }
        </div>     
      </div>
    </div>
  )
};

export default Favorites