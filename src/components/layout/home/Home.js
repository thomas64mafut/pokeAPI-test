import React, {useEffect, useState} from 'react'
import './home.css'
import axios from 'axios'
import { Card, Button } from 'react-bootstrap'

const Home = () => {
  const maxPokemon = 905;
  const [pokeCount, setPokeCount] = useState(maxPokemon);
  const [idToShow, setIdToShow] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isShiny, setIsShiny] = useState(false);
  const [pokemon, setPokemon] = useState({});
  
  useEffect(() => {
    console.log(idToShow);
    if(idToShow !== 0){
      handleGetPokemon();
    }
  }, [idToShow])
  
  const handleGetPokemon = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${idToShow}`);
      console.log(data.name);
      setPokemon(data);
      setIsLoading(false)
    } catch (error) {
      setIdToShow(Math.round(Math.random() * (pokeCount - 1) + 1)); 
      setIsLoading(false)
    }
  }

  const handleGetPokemonCount = async () => {
    setIdToShow(Math.round(Math.random() * (pokeCount - 1) + 1));
  }

  return (
    <div className='Home_container'>
      <Card className='Home_cardContainer'>
        <Card.Img></Card.Img>
        <Card.Title>{pokemon.name}</Card.Title>
        <Card.Body>asdasdsa</Card.Body>
      </Card>
      <Button 
        variant='danger' 
        className='Home_pokebutton' 
        onClick={handleGetPokemonCount}
        disabled={isLoading}
      >
        Atrapar Pokemon
      </Button>
    </div>
  )
}

export default Home