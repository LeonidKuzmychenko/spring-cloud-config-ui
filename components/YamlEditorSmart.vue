<template>
  <div>
    <div ref="editor" id="editor"
         :class="{ 'editor editable': props.isEditable, 'editor readonly': !props.isEditable }"/>
  </div>
</template>

<script lang="ts" setup>
import {defineEmits, defineProps, onMounted, ref, watch} from 'vue';
import {basicSetup, EditorView} from 'codemirror';
import {yaml} from '@codemirror/lang-yaml';
import {keymap} from '@codemirror/view';
import {indentWithTab} from '@codemirror/commands';

const props = defineProps<{
  modelValue: string;
  isEditable: boolean;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const editorElement = ref<HTMLElement | null>(null);
const editorView = ref<EditorView | null>(null);


watch(() => props.modelValue, (newValue) => {
  if (editorView.value) {
    const currentValue = editorView.value.state.doc.toString();
    if (newValue !== currentValue) {
      editorView.value.dispatch({
        changes: {
          from: 0,
          to: currentValue.length,
          insert: newValue,
        },
      });
    }
  }
});

watch(() => props.isEditable, (newEditable) => {
  initializeEditor(newEditable)
})

function initializeEditor(isEditable: boolean) {
  editorElement.value = document.getElementById('editor');
  if (editorElement.value) {
    if (editorView.value) {
      editorView.value.destroy()
    }
    editorView.value = new EditorView({
      doc: props.modelValue,
      extensions: [
        basicSetup,
        yaml(),
        keymap.of([indentWithTab]),
        EditorView.editable.of(isEditable),
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            const content = editorView.value?.state.doc.toString();
            if (content && content !== props.modelValue) {
              emit('update:modelValue', content);
            }
          }
        }),
      ],
      parent: editorElement.value,
    });
  }
}

onMounted(() => {
  initializeEditor(props.isEditable)
});
</script>

<style>
.editor {
  max-height: 600px;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: auto;
  white-space: pre;
  width: 100%;
  font-size: 20px;
}

.editable {
  background-color: rgba(0, 255, 0, 0.045);
}

.readonly {
  background-color: rgba(128, 128, 128, 0.1);
}
</style>
