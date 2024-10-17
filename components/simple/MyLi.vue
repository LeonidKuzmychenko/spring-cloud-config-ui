<template>
  <li
      :class="[
      'cursor-pointer p-4 transition-colors duration-200 ease-in-out hover:bg-gray-200 hover:text-black font-bold',
      isSelected ? 'bg-white text-black' : 'text-white'
    ]"
      @click="$emit('click')"
  >
  <slot></slot>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  isSelected: boolean;
}>();

defineEmits<{
  (e: 'click'): void;
}>();
</script>

