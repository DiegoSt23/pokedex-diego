import "./styles/Global.css";
import Pokedex from "./components/Pokedex";
import FavoritesProvider from "./context/favorites/FavoritesProvider";

function App() {
  return (
    <>
      <FavoritesProvider>
        <Pokedex/>
      </FavoritesProvider>              
    </>
  );
}

export default App;
