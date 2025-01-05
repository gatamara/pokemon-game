<template>
  <section v-if="false" class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando pokemons</h3>
  </section>
  <section class="flex flex-col justify-center items-center w-screen h-screen">
    <h1>Quien es este Pokemon?</h1>
    <!-- pokemon picture -->
    <PokemonPicture />
    <!-- pokemon options -->
    <PokemonOptions />
  </section>
</template>

<script setup lang="ts">
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';

const { } = usePokemonGame()

</script>

<style scoped></style>
