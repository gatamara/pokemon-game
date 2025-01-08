import { withSetup } from '@/__tests__/utils/with-setup'
import MockAdapter from 'axios-mock-adapter'
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame'
import { GameStatus } from '@/modules/pokemon/interfaces/game-status.enum'
import { flushPromises } from '@vue/test-utils'
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi'
import { pokemonListFace } from '../../data/fake-pokemons'
import confetti from 'canvas-confetti'

const mockPokemonAPi = new MockAdapter(pokemonApi)

mockPokemonAPi.onGet('/?limit=251').reply(200, {
  results: pokemonListFace,
})

vi.mock('canvas-confetti', () => ({
  default: vi.fn(), // exportacion por defecto de un vi.function
  //es decir una funcion que me va a permitir saber si fue llamada, etc
}))

describe('usePokemonGame', () => {
  test('should initialize with the correct default values', async () => {
    const [results] = withSetup(usePokemonGame)

    //estamos probando los valores por defecto
    expect(results.gameStatus.value).toBe(GameStatus.Playing)
    expect(results.isLoading.value).toBe(true)
    expect(results.pokemonOptions.value).toEqual([]) //cuando evaluamos obj no puede ser toBe
    expect(results.randomPokemon.value).toBe(undefined)

    //await new Promise((r) => setTimeout(r, 1000))

    await flushPromises() //se asegura que todas las proimesas que estan pendientes se terminen de ejecutar

    expect(results.isLoading.value).toBe(false)
    expect(results.pokemonOptions.value.length).toBe(4)
    expect(results.randomPokemon.value).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
    })
  })

  test('should correctly handle getnextRound', async () => {
    const [results] = withSetup(usePokemonGame)

    await flushPromises() //para probvar esta funcion tengo que esperar que tenga pokemones ya cargados

    results.gameStatus.value = GameStatus.Won
    console.log(results.gameStatus.value)
    //estimulo

    results.getNextRound(5)

    expect(results.gameStatus.value).toBe(GameStatus.Playing)
    expect(results.pokemonOptions.value).toHaveLength(5)
  })

  test('should correctly handle getnextRound ands return diferrent pokemons', async () => {
    const [results] = withSetup(usePokemonGame)
    await flushPromises() //para probvar esta funcion tengo que esperar que tenga pokemones ya cargados

    const firstOptions = [...results.pokemonOptions.value].map((p) => p.name)
    console.log(firstOptions)

    results.getNextRound()

    const secondOptions = [...results.pokemonOptions.value]

    secondOptions.forEach((pokemon) => {
      expect(firstOptions).not.toContain(pokemon.name)
    })
  })

  test('should correctly handle a incorrect answer', async () => {
    const [results] = withSetup(usePokemonGame)
    await flushPromises()

    const { checkAnswer, gameStatus } = results

    expect(gameStatus.value).toBe(GameStatus.Playing)

    checkAnswer(100000000000) //pokemon id no existe

    expect(gameStatus.value).toBe(GameStatus.Lost)
  })

  test('should correctly handle a correct answer', async () => {
    const [results] = withSetup(usePokemonGame)
    await flushPromises()

    const { checkAnswer, gameStatus, randomPokemon } = results

    expect(gameStatus.value).toBe(GameStatus.Playing)

    checkAnswer(randomPokemon.value.id) //pokemon id no existe

    expect(confetti).toHaveBeenCalled()
    expect(confetti).toHaveBeenCalledWith({
      particleCount: 600,
      spread: 150,
      origin: { y: 0.6 },
    })
    expect(gameStatus.value).toBe(GameStatus.Won)
  })
})

//cuando queremos trabajar con ciclos de vida de un componente en un composable
//por que el siclo de vida de los componentes de vue solo se van a disparar si estamos en un componente de vue
//hay que preparar un ambiente para poner el composable en un componente y poder montarlo o desmontarlo

//estamos porbando los valores por defecto
