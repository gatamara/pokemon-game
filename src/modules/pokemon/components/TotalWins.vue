<template>
  <div class="counter-contain text-blue-700">
    <h3 class="text-xs md:text-base">Victorias </h3>
    <strong class="text-xs md:text-base"> {{ wins }} </strong>
  </div>
</template>

<script setup lang="ts">
interface Props {
  wins: number
}
defineProps<Props>()

</script>

<style>
.counter-contain {
  @apply bg-white p-2 flex flex-col justify-center items-center rounded-sm shadow-sm shadow-black/40
}
</style>
