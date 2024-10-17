<template>
  <ul :class="`shadow-lg ${classes}`">
    <slot></slot>
  </ul>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  classes?: string;
}>();
</script>

<style scoped>
/* Дополнительные стили можно добавить, если необходимо */
</style>
