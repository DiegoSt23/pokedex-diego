import "../styles/Header.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const handleSetPokemon = () => {
    if (value1) {
      history.push(`/pokemon/${value1}`)
    }
  };

  const handleSetType = () => {
    if (value2) {
      history.push(`/type/${value2}`)
    }
  };

  return (
    <div className="header">
      <div className="logo-container">
        <img
          src="https://i.imgur.com/VtvmFFL.png"
          alt="logo"
          className="logo"
        ></img>
      </div>
      <div className="search-container">
        <div>
          <input value={value1} onChange={e => {setValue1(e.target.value)}} placeholder="Name/ID(less than 898)"/>
            <button onClick={handleSetPokemon}>GO!</button>
        </div>
        
        <div>
        <select value={value2} onChange={e => {setValue2(e.target.value)}}>
          <option value="">Select a type</option>
          <option value="all">All</option>
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
