import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame'
import { GameStatus } from '@/modules/pokemon/interfaces'
import PokemonGame from '@/modules/pokemon/pages/PokemonGame.vue'
import { mount } from '@vue/test-utils'
import type { Mock } from 'vitest'

vi.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
  usePokemonGame: vi.fn(),
}))

const pokemonsOptions = [
  {
    name: 'bulbasaur',
    id: 1,
  },
  {
    name: 'ivysaur',
    id: 2,
  },
  {
    name: 'venusaur',
    id: 3,
  },
  {
    name: 'charmander',
    id: 4,
  },
]

describe('<PokemonGame />', () => {
  test('should initialize with default values', () => {
    ;(usePokemonGame as Mock).mockReturnValueOnce({
      randomPokemon: undefined,
      isLoading: true,
      gameStatus: GameStatus.Playing,
      pokemonOptions: [],
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
      totalWin: 0,
      totalLost: 0,
    })

    const wrapper = mount(PokemonGame)

    expect(wrapper.get('h1').text()).toBe('Espere por favor')
    expect(wrapper.get('h1').classes()).toEqual(['text-3xl'])
    expect(wrapper.get('h3').text()).toBe('Cargando pokemons')
    expect(wrapper.get('h3').classes()).toEqual(['animate-pulse'])
  })

  test('should initialize with default values', () => {
    ;(usePokemonGame as Mock).mockReturnValueOnce({
      randomPokemon: pokemonsOptions.at(0),
      isLoading: false,
      gameStatus: GameStatus.Playing,
      pokemonOptions: pokemonsOptions,
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
      totalWin: 0,
      totalLost: 0,
    })

    const wrapper = mount(PokemonGame)

    // console.log(wrapper.html())

    const urlImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png`

    const pokemons = pokemonsOptions.map((p) => p.name)

    expect(wrapper.findAll('img')[1].attributes('src')).toBe(urlImage)

    const buttons = wrapper.findAll('.capitalize.disabled\\:shadow-none.disabled\\:bg-slate-100')

    expect(buttons.length).toBe(4)
    buttons.forEach((button) => {
      expect(pokemons).toContain(button.text())
    })
  })

  test('should render button for a new game', () => {
    ;(usePokemonGame as Mock).mockReturnValueOnce({
      randomPokemon: pokemonsOptions.at(0),
      isLoading: false,
      gameStatus: GameStatus.Won,
      pokemonOptions: pokemonsOptions,
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
      totalWin: 0,
      totalLost: 0,
    })

    const wrapper = mount(PokemonGame)

    const button = wrapper.find('button')

    console.log(button.text())
    expect(button.text()).toBe('Jugar de nuevo?')
    //console.log(wrapper.html())
  })

  // test('should call the getNextRound function when the button is clicked', async () => {
  //   const spyNextRound = vi
  //     .fn()

  //     (usePokemonGame as Mock)
  //     .mockReturnValueOnce({
  //       randomPokemon: pokemonsOptions.at(0),
  //       isLoading: false,
  //       gameStatus: GameStatus.Won,
  //       pokemonOptions: pokemonsOptions,
  //       checkAnswer: vi.fn(),
  //       getNextRound: spyNextRound,
  //       totalWin: 0,
  //       totalLost: 0,
  //     })

  //   const wrapper = mount(PokemonGame)

  //   const button = wrapper.find('button')

  //   await button.trigger('click')
  //   expect(spyNextRound).toHaveBeenCalled()
  //expect(spyNextRound).toHaveBeenCalledWith(4)

  //   //console.log(wrapper.html())
  // })
})
