import axios from "axios"

const searchType = async (type) => {
  const promise = await axios ({
    method: "GET",
    url: `https://pokeapi.co/api/v2/type/${type}`,
  })
  return promise
};

const searchAllPokemons = async (offset) => {
  const promise = await axios ({
    method: "GET",
    url: `https://pokeapi.co/api/v2/pokemon/?limit=4&offset=${offset}`,
  })
  return promise
};

const searchPokemon = async (id) => {
  const promise = await axios ({
    method: "GET",
    url: `https://pokeapi.co/api/v2/pokemon/${id}`,
  })
  return promise
};

export {searchPokemon, searchType, searchAllPokemons}