<!--index-->
<template>
  <div class="page-container">
    <MenuComponent
        class="menu-container bg-black"
        :selectedFileName="selectedFileName"
    @setSelectedFileName="setSelectedFileName"
    />
    <ContentComponent
        class="content-container bg-white"
        :selectedFileName="selectedFileName"
    />
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  min-height: 100vh;
}

.content-container {
  flex-grow: 1;
  padding: 32px;
}
</style>

<script setup lang="ts">
const selectedFileName = ref<String | null>(null);
const setSelectedFileName = (fileName: String) => {
  selectedFileName.value = fileName;
};
</script>
