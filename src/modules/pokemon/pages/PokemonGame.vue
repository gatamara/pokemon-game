<template>
  <section v-if="isLoading || randomPokemon.id === null"
    class="flex flex-col justify-center items-center w-screen min-h-screen">
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando pokemons</h3>
  </section>
  <section v-else class="flex flex-col justify-center items-center w-screen min-h-screen">
    <img class="h-20" src="../../../assets/quienes.png" alt="">
    <!-- <h1 class="text-2xl mb-4">Quien es este Pokemon?</h1> -->
    <button v-if="gameStatus !== GameStatus.Playing" class="btn" @click="getNextRound(4)">Jugar de nuevo?</button>

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
  @apply bg-indigo-400 rounded-md p-2 cursor-pointer text-center transition-all hover:bg-indigo-500 mb-4
}
</style>
