<template>
  <h2 :class="[textClass, textAlignmentClass, 'text-3xl', 'font-bold', 'bg-gradient-to-r', 'from-teal-400', 'to-blue-600', 'bg-clip-text']">
    <slot></slot>
  </h2>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps<{
  textColor?: string;
  textAlignment?: 'left' | 'center' | 'right';
}>();

const textClass = computed(() => {
  return props.textColor ? `text-${props.textColor}` : 'text-black';
});


const textAlignmentClass = computed(() => {
  return props.textAlignment ? `text-${props.textAlignment}` : 'text-center';
});
</script>

<style scoped>
/* Добавьте дополнительные стили, если это необходимо */
</style>
