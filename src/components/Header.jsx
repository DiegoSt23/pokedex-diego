import "../styles/Header.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const history = useHistory();
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [menuStatus, setMenuStatus] = useState(false);

  const handleSetPokemon = () => {
    if (value1) {
      history.push(`/pokemon/${value1.toLowerCase()}`);
      setValue1("");
      setMenuStatus(false);
    }
  };

  const handleSetType = () => {
    if (value2) {
      history.push(`/type/${value2}`);
      setValue2("");
      setMenuStatus(false);
    }
  };

  const openCloseMenu = () => {
    setMenuStatus(!menuStatus)
  }

  return (
    <div className="header">
      <div className="logo-container">
        <img
          src="https://i.imgur.com/VtvmFFL.png"
          alt="logo"
          className="logo"
        ></img> 
        {menuStatus
        ? <FontAwesomeIcon icon={faTimes} className="search-icon" onClick={openCloseMenu}/>
        : <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={openCloseMenu}/>
        }       
      </div>           
      <div className="search-container1">
        <div>
          <input value={value1} onChange={e => {setValue1(e.target.value)}} placeholder="Name/ID"/>
            <button onClick={handleSetPokemon}>GO!</button>
        </div>        
        <div>
        <select value={value2} onChange={e => {setValue2(e.target.value)}}>
          <option value="">Select a type</option>
          <option value="normal">Normal</option>
          <option value="fighting">Fighting</option>
          <option value="flying">Flying</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="rock">Rock</option>
          <option value="bug">Bug</option>
          <option value="ghost">Ghost</option>
          <option value="steel">Steel</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="psychic">Psychic</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="fairy">Fairy</option>
        </select>
          <button onClick={handleSetType}>GO!</button>
        </div>
      </div>
      <div className="search-container2" style={{display: menuStatus ? "block" : "none" }}>
        <div>
          <input value={value1} onChange={e => {setValue1(e.target.value)}} placeholder="Name/ID"/>
          <button onClick={handleSetPokemon}>GO!</button>
        </div>        
        <div>
        <select value={value2} onChange={e => {setValue2(e.target.value)}}>
          <option value="">Select a type</option>
          <option value="normal">Normal</option>
          <option value="fighting">Fighting</option>
          <option value="flying">Flying</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="rock">Rock</option>
          <option value="bug">Bug</option>
          <option value="ghost">Ghost</option>
          <option value="steel">Steel</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="psychic">Psychic</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="fairy">Fairy</option>
        </select>
          <button onClick={handleSetType}>GO!</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
