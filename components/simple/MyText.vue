<template>
  <p :class="[textClass, textAlignmentClass, 'text-lg', 'leading-relaxed', 'bg-gradient-to-r', 'from-purple-500', 'to-blue-500', 'bg-clip-text']">
    <slot></slot>
  </p>
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
