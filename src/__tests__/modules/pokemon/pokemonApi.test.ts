import { pokemonApi } from '@/modules/pokemon/api/pokemonApi'

describe('pokemonApi', () => {
  test('should be configured as expected', () => {
    const expectedValue = 'https://pokeapi.co/api/v2/pokemon'
    const result = pokemonApi.defaults.baseURL
    expect(result).toBe(expectedValue)
  })
})
