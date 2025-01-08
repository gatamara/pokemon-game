import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue'
import { mount } from '@vue/test-utils'

describe('<PokemonPicture />', () => {
  test('should render the hidden image when showPokemons prop is false', () => {
    const pokemonId = 25

    const wrapper = mount(PokemonPicture, {
      props: { pokemonId, showPokemon: false },
    })
    const imgeSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
    const image = wrapper.find('img')
    console.log(wrapper.html())
    // expect(image.attributes('src')).toBe(imgeSource)
    const attributes = image.attributes()

    expect(attributes).toEqual(
      expect.objectContaining({
        class: 'brightness-0 h-[200px]',
        src: imgeSource,
      }),
    )
  })

  test('should render the  image when showPokemons prop is true', () => {
    const pokemonId = 25

    const wrapper = mount(PokemonPicture, {
      props: { pokemonId, showPokemon: true },
    })
    const imgeSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
    const image = wrapper.find('img')
    console.log(wrapper.html())
    // expect(image.attributes('src')).toBe(imgeSource)
    const attributes = image.attributes()

    expect(attributes).toEqual(
      expect.objectContaining({
        class: 'fade-in h-[200px]',
        src: imgeSource,
      }),
    )
  })
})
