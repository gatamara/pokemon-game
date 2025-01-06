<template>
  <div class="counter-contain text-red-700">
    <h3 class="text-xs md:text-base">Perdidas </h3>
    <strong class="text-xs md:text-base">{{ lost }}</strong>
  </div>
</template>

<script setup lang="ts">
interface Props {
  lost: number
}
defineProps<Props>()
</script>

<style scoped></style>
