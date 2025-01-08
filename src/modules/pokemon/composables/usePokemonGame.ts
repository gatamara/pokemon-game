import { computed, onMounted, ref } from 'vue'
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces'
import { pokemonApi } from '../api/pokemonApi'
import confetti from 'canvas-confetti'

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing) //aqui vamos a tener 3 estados, donde mi estado inicial es Playing
  const pokemons = ref<Pokemon[]>([])
  const pokemonOptions = ref<Pokemon[]>([])
  const totalWin = ref<number>(0)
  const totalLost = ref<number>(0)

  const randomPokemon = computed(() => {
    const randomIndex = Math.floor(Math.random() * pokemonOptions.value.length)
    return pokemonOptions.value[randomIndex]
  })

  const isLoading = computed(() => pokemons.value.length === 0)

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=251')

    const pokemonsArray = response.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/')
      const id = urlParts[urlParts.length - 2] ?? 0 // si es nulo, que sea 0
      return {
        name: pokemon.name,
        id: +id, //este + es para asegurarme que sea number
      }
    })
    return pokemonsArray.sort(() => Math.random() - 0.5) //los desordeno para el juego con sort que esta esperando un true o un false y Math.random
  }

  const getNextRound = (howMany: number = 4) => {
    //tengo que tomar los primeros 4 elementos de mi arreglo, por que ya estan mezclados
    gameStatus.value = GameStatus.Playing
    pokemonOptions.value = pokemons.value.slice(0, howMany) //slice para cortar del arreglo de la pos 0 a howmany, almaceno los primeros 4, no modifica el arreglo
    pokemons.value = pokemons.value.slice(howMany) //elimino los 4 y se almacenan todos los que quedan despues de eliminar los 4
  }

  const checkAnswer = (id: number) => {
    const haswon = randomPokemon.value.id === id
    if (haswon) {
      gameStatus.value = GameStatus.Won
      confetti({
        particleCount: 600,
        spread: 150,
        origin: { y: 0.6 },
      })
      totalWin.value++
      return
    } else {
      totalLost.value++
    }
    gameStatus.value = GameStatus.Lost
  }

  onMounted(async () => {
    // hay mas control con esto, aun que sepamos que se va a ejecutar cuando se monta, cuando pase el script setup
    pokemons.value = await getPokemons()
    getNextRound()
  })

  return {
    gameStatus,
    isLoading,
    pokemonOptions,
    randomPokemon,
    totalWin,
    totalLost,
    //Methos
    getNextRound,
    checkAnswer,
  }
}
