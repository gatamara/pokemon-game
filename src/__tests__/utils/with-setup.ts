//vamos a crear una funcion aca que va a simular el ambiente donde nuestro composable va a correr

import { createApp } from 'vue'

export const withSetup = (composable: () => any) => {
  let result: any

  const app = createApp({
    setup() {
      result = composable()

      return () => {}
    },
  })

  app.mount(document.createElement('div'))

  return [result, app] as const
}

//este es un entorno de ejecucion para nuestros composables
