import './home.css'
import React, {useEffect, useState} from 'react'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios'

const Home = () => {
  const maxPokemon = 905;
  const [pokeCount, setPokeCount] = useState(maxPokemon);
  const [idToShow, setIdToShow] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isShiny, setIsShiny] = useState(false);
  const [pokemon, setPokemon] = useState({});
  const [pokemonData, setPokemonData] = useState({});
  const [pokemonFlavorTextShow, setPokemonFlavorTextShow] = useState('');
  const [pokemonEvolutionChain, setPokemonEvolutionChain] = useState([]);

  useEffect(() => {
    if(idToShow !== 0){
      setIsLoading(true);
      handleGetPokemon();
    }
  }, [idToShow])
  
  useEffect(() => {
    if (Object.entries(pokemonData).length !== 0){
      handleGetFlavorText();
      handleGetEvolutionChain();
    }
  }, [pokemonData])
  
  useEffect(() => {
    if (pokemonEvolutionChain.length !== 0){
      console.log(pokemonEvolutionChain);
      setIsLoading(false);
    }
  }, [pokemonEvolutionChain])
  
  
  const handleIsShiny = () => {
    const odd = Math.round(Math.random () * 2) + 1;
    return odd === 1;
  }
  
  const handleGetFlavorText = () => {
    const flavorText = pokemonData.flavor_text_entries?.find((flavor) => flavor.language?.name === 'es');
    setPokemonFlavorTextShow(flavorText?.flavor_text);
  }

  const handleProcessEvolutionChain = (chain, chainToShow) => {
    const dataChain = Object.entries(chain);

    const pokemonFound = dataChain.find((prop) => (
      prop[0] === 'species'
    ));
    
    if (pokemonFound) 
      setPokemonEvolutionChain(current => [...current,parseInt(pokemonFound[1]?.url.split('pokemon-species/')[1].split('/')[0],10)]);
    
    const nextEvolveFound = dataChain.find((prop) => (
      prop[0] === 'evolves_to' && prop[1]?.length !== 0
    ));
    
    if (nextEvolveFound) {
      chain = nextEvolveFound[1][0];
      handleProcessEvolutionChain(chain);
    }
  }

  const handleGetEvolutionChain = async () => {
    setPokemonEvolutionChain([]);
    const evolutionChain = pokemonData.evolution_chain?.url;
    const { data } = await axios(evolutionChain);
    handleProcessEvolutionChain(data.chain);
  }

  const handleSetImgUrl = (id, shiny) => {
    if (!shiny) { 
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    }

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`;
  }
  
  const handleGetPokemonCount = () => {
    setIdToShow(Math.round(Math.random() * (pokeCount - 1) + 1));
    setIsShiny(handleIsShiny);
  }

  const handleGetPokemon = async () => {
    try {
      const pokemon = await axios(`https://pokeapi.co/api/v2/pokemon/${idToShow}`);
      setPokemon(pokemon.data);
      const pokemonSpecies  = await axios(`https://pokeapi.co/api/v2/pokemon-species/${idToShow}`);
      setPokemonData(pokemonSpecies.data);
    } catch (error) {
      setIdToShow(Math.round(Math.random() * (pokeCount - 1) + 1)); 
      setIsLoading(false);
    }
  }

  return (
    <div className='Home_container'>
      <Button 
        variant='danger' 
        className='Home_pokebutton' 
        onClick={handleGetPokemonCount}
        disabled={isLoading}
      >
        Atrapar Pokemon
      </Button>
      <Card className='Home_cardContainer'>
        <Card.Img src={handleSetImgUrl(idToShow, isShiny)} className="Card_img"/>
        <Card.Title>
          <h1>
            {isShiny ? 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill me-2 mt-2" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg>
              : 
                ''
            }
            {pokemon.name}
          </h1>
        </Card.Title>
        <Card.Body>
          <p>
            {pokemonFlavorTextShow}
          </p>
          <div className='d-flex justify-content-center align-items-center'>
            {
              pokemonEvolutionChain?.map((pokemon) =>(
                <div key={pokemon}>
                  {pokemon === idToShow ?
                    <img src={handleSetImgUrl(pokemon, isShiny)} alt="" className='bg-grey'/> : 
                    <img src={handleSetImgUrl(pokemon, isShiny)} alt="" />
                  }
                </div>
              ))
            }
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Home
