import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue'
import { mount } from '@vue/test-utils'

describe('<PokemonOpstions />', () => {
  const options = [
    { id: 1, name: 'Bulbasaur' },
    { id: 2, name: 'Ivisaur' },
    { id: 3, name: 'Venusaur' },
  ]

  test('should render buttons with correct text', () => {
    const wrapper = mount(PokemonOptions, {
      props: { options, blockSelection: false, correctAnswer: 1 },
    })
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(options.length)
  })
})
