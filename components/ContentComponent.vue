<!--Content-->
<template>

  <div class="py-8 grid grid-cols-5 gap-4" v-if="selectedFile">
    <div class="col-span-1"></div>
    <div class="col-span-3 flex flex-col gap-5">
      <Breadcrumb :items="breadcrumbItems">
        <span v-if="isChanged"> *</span>
      </Breadcrumb>
      <MyText text-alignment="left" class="hidden">SHA: {{ selectedFile.sha }}</MyText>
      <YamlEditorSmart v-model="selectedFile.content" :isEditable="isEdit"/>

      <div class="flex justify-between space-x-4">
        <div class="flex space-x-4">
          <MyButton @click="openFileDialog">Import</MyButton>
          <MyButton @click="exportFile">Export</MyButton>
          <MyButton @click="restore">Restore</MyButton>
        </div>
        <MyButton v-if="isEdit" @click="saveFile">Save</MyButton>
        <MyButton v-if="!isEdit" @click="editClick">Edit</MyButton>
      </div>
      <MyText text-alignment="left" v-if="status">{{ status }}</MyText>
    </div>
    <div class="col-span-1"></div>

    <input ref="fileInput" type="file" accept=".yml" @change="handleFileUpload" class="hidden"/>
  </div>
</template>

<script setup lang="ts">
import {getReasonPhrase} from "http-status-codes";
import type {Property} from "~/types/property";
import {apiService} from "~/services/apiService";
import MyH2 from "~/components/simple/MyH2.vue";
import MyText from "~/components/simple/MyText.vue";
import MyButton from "~/components/simple/MyButton.vue";
import Breadcrumb from "~/components/simple/Breadcrumb.vue";
import withProgressBar from '~/services/globalMethod';


const props = defineProps<{
  selectedFileName: String | null;
}>();

const {selectedFileName} = toRefs(props);
const selectedFile = ref<Property>()
const savedFileContent = ref<string>()
const isChanged = ref<boolean>(false);
const status = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const isEdit = ref<Boolean>(false);
const breadcrumbItems = ref<string[]>([]);


watch(selectedFileName, async (newVal, oldVal) => {
  withProgressBar(async () => {
    if (newVal !== oldVal && newVal != null) {
      let response = await apiService.getFile(newVal);
      let fileInfo: Property = response.data;
      selectedFile.value = fileInfo
      savedFileContent.value = fileInfo.content
      status.value = null;
      breadcrumbItems.value = ["app","configs", newVal as string]
    }
  })
});

watch(selectedFile, async (newValue) => {
  if (newValue) {
    savedFileContent.value = newValue.content
    isChanged.value = false;
    fileInput.value = null;
    isEdit.value = false;
    isChanged.value = false;
  }
});

watch(() => selectedFile.value?.content, async (newFileContent) => {
  if (savedFileContent) {
    isChanged.value = newFileContent != savedFileContent.value
  }
});

const saveFile = () => {
  withProgressBar(async () => {
    if (!selectedFile.value) {
      return
    }
    try {
      const response = await apiService.edit(
          selectedFile.value!.name,
          selectedFile.value!.content,
          selectedFile.value!.sha
      )
      selectedFile.value = response.data
      status.value = `Status: ${response.status} ${getReasonPhrase(response.status)}`
    } catch (error: any) {
      status.value = error.response
          ? `Status: ${error.response.status} ${getReasonPhrase(error.response.status)}`
          : "Network Error";
    }
  })
};

const exportFile = () => {
  if (selectedFile.value) {
    const blob = new Blob([selectedFile.value.content], {type: "text/plain"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = selectedFile.value.name;
    link.click();
    URL.revokeObjectURL(link.href);
  }
};

const openFileDialog = () => fileInput.value?.click();

const handleFileUpload = (event: Event) => {
  const readFile = (event.target as HTMLInputElement)?.files?.[0];
  if (readFile) {
    const reader = new FileReader();
    reader.onload = () => {
      if (selectedFile.value && reader.result) {
        selectedFile.value.content = reader.result as string;
      }
    };
    reader.readAsText(readFile);
  }
};

function restore() {
  if (selectedFile.value && savedFileContent.value) {
    selectedFile.value.content = savedFileContent.value;
    isChanged.value = false;
  }
}

function editClick() {
  isEdit.value = !isEdit.value
}

</script>
