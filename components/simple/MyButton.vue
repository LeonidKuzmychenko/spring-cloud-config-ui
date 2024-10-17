<template>
  <button
      class="px-6 py-3 bg-black text-white border-2 border-black rounded-lg hover:bg-white hover:text-black transition-colors duration-300 ease-in-out"
      @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'click'): void;
}>();

const handleClick = (event: MouseEvent) => {
  emit('click');
};
</script>

<style scoped>
button {
  outline: none;
}
</style>
