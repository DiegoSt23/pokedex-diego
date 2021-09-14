import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import Pokemon from './Pokemon';
import PokemonsGrid from './PokemonsGrid';
import Error from './Error';

const Pokedex = () => { 
  return (
    <>
      <Router>
        <Header/>
        <div className="main-container">
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>             
            <Route exact path="/pokemon/:pokemon">
              <Pokemon/>
            </Route>
            <Route exact path="/type/:type" >
              <PokemonsGrid/>
            </Route>            
            <Route path="*" >
              <Error/>
            </Route>
          </Switch>
        </div>        
      </Router>
    </>
  )
};

export default Pokedex