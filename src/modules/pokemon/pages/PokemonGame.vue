<template>
  <section v-if="isLoading || randomPokemon.id === null"
    class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando pokemons</h3>
  </section>
  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="text-2xl m-5">Quien es este Pokemon?</h1>
    <div class="h-20">
      <button v-if="gameStatus !== GameStatus.Playing" class="btn" @click="getNextRound(4)">Jugar de nuevo?</button>
    </div>

    <!-- pokemon picture -->
    <PokemonPicture :pokemon-id="randomPokemon.id" :show-pokemon="gameStatus !== GameStatus.Playing" />
    <!-- pokemon options -->
    <PokemonOptions :options="pokemonOptions" :block-selection="gameStatus !== GameStatus.Playing"
      :correct-answer="randomPokemon.id" @selected-option="checkAnswer" />
  </section>
</template>

<script setup lang="ts">
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const { randomPokemon, isLoading, gameStatus, pokemonOptions, checkAnswer, getNextRound } = usePokemonGame()


</script>

<style scoped>
.btn {
  @apply bg-cyan-500 rounded-md p-2 cursor-pointer text-center transition-all hover:bg-gray-100
}
</style>
