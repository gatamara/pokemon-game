import { onMounted, ref } from 'vue'
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces'
import { pokemonApi } from '../api/pokemonApi'

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing) //aqui vamos a tener 3 estados, donde mi estado inicial es Playing

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151')
    console.log(response.data)

    const pokemonsArray = response.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/')
      const id = urlParts[urlParts.length - 2] ?? 0 // si es nulo, que sea 0
      return {
        name: pokemon.name,
        id: +id, //este + es para asegurarme que sea number
      }
    })
    return pokemonsArray
  }

  onMounted(async () => {
    // hay mas control con esto, aun que sepamos que se va a ejecutar cuando se monta, cuando pase el script setup
    const pokemons = await getPokemons()
    console.log(pokemons)
  })

  return {
    gameStatus,
  }
}
