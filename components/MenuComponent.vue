<!--Menu-->
<template>
  <div class="menu-box">
    <MyH2 class="menu-title" text-color="white">Properties</MyH2>
    <MyUl>
      <MyLi
          v-for="fileName in fileNames"
          :key="fileName"
          @click="selectProperty(fileName)"
          :isSelected="fileName === selectedFileName"
      >
      {{ fileName }}
      </MyLi>
    </MyUl>
  </div>
</template>

<style scoped>
.menu-box {
  min-width: 250px;
}

.menu-title {
  padding-top: 32px;
  padding-bottom: 32px;
}

.selected {
  background-color: #4a90e2;  /* Подсвечиваем выбранный элемент */
  color: white;
  font-weight: bold;
}
</style>

<script setup lang="ts">
import MyUl from "~/components/simple/MyUl.vue";
import MyLi from "~/components/simple/MyLi.vue";
import MyH2 from "~/components/simple/MyH2.vue";
import {apiService} from "~/services/apiService";
import withProgressBar from "~/services/globalMethod";
import {useLoadingStore} from "~/store/loadingStore";

defineProps<{
  selectedFileName: String | null;
}>();

const fileNames = ref<String[]>([]);

const emit = defineEmits<{
  (event: 'setSelectedFileName', property: String): void;
}>();

async function selectProperty(fileName: String) {
  emit('setSelectedFileName', fileName);
}

onMounted(async () => {
  await withProgressBar(async () => {
    const response = await apiService.getFiles();
    fileNames.value = response.data.map((item: { name: String }) => item.name);
  });
});
</script>