import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue'
import { mount } from '@vue/test-utils'

describe('<PokemonOptions />', () => {
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

    buttons.forEach((button, index) => {
      expect(button.text()).toBe(options[index].name)
    })
  })

  test('should emit seletedOption event when a button is clicked', async () => {
    const wrapper = mount(PokemonOptions, {
      props: { options, blockSelection: false, correctAnswer: 1 },
    }) //esto es para montar el componente
    const [b1, b2, b3] = wrapper.findAll('button') //que botones quiero hacer click
    await b1.trigger('click') //se dispara el click
    await b2.trigger('click')
    await b3.trigger('click')

    expect(wrapper.emitted().selectedOption).toBeTruthy() //que se haya emitido alguna vez
    expect(wrapper.emitted().selectedOption[0]).toEqual([1]) //que el selesctedOption en la posicion 0 haya sido emito con el valor de 1
    expect(wrapper.emitted().selectedOption[1]).toEqual([2])
    expect(wrapper.emitted().selectedOption[2]).toEqual([3])
  })

  //evaluar que los botones esten disabled
  test('should emit selectedOption event when a button is clicked', () => {
    const wrapper = mount(PokemonOptions, {
      props: { options, blockSelection: true, correctAnswer: 1 },
    })
    const buttons = wrapper.findAll('button') //buscamos todos los botones

    buttons.forEach((button) => {
      //vamos a barrer todos los botones
      const attrs = button.attributes()
      console.log(attrs)
      const attributes = Object.keys(button.attributes()) //tomamos todas las llaves que tengan ahi
      expect(attributes).toContain('disabled') //evaluamos si existe dentro de un arreglo la propiedad disabled
    })
  })

  test('should apply correct styling to buttons based on correct/incorrect answer', () => {
    const correctAnswer = 2
    const wrapper = mount(PokemonOptions, {
      props: { options, blockSelection: true, correctAnswer },
    })

    const buttons = wrapper.findAll('button')

    buttons.forEach((button, index) => {
      //evaluamos todos los botones
      if (options[index].id === correctAnswer) {
        //si la opcion que estoy iterando basado en el indice es exactamente igual al correct answer
        expect(button.classes()).toContain('correct')
      } else {
        expect(button.classes()).toContain('incorrect')
      }
    })
  })
})

//console.log(button.attributes()) con esto miramos todos los atributos del boton
//expect(button.attributes('disabled')).toBeTruthy() //si la propiedad disable existe, entonces verdadero
//pero vemos que nos muestra un string vacio "", y eso es falso
