<template>
  <nav aria-label="Breadcrumb">
    <ol class="breadcrumb">
      <li v-if="items.length" v-for="(item, index) in items" :key="index" class="breadcrumb-item">
        {{ item }}
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  items: string[];
}>();
</script>

<style scoped>
.breadcrumb {
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
}

.breadcrumb-item {
  font-weight: bold;
  font-size: 32px;
  margin-right: 5px;
}

.breadcrumb-item:not(:last-child)::after {
  content: ">";
  margin-left: 5px;
}
</style>
