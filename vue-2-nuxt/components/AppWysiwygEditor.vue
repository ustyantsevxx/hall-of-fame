<template>
  <QuillEditor
    :value="value"
    :options="quillOptions"
    @input="e => $emit('input', e)"
  />
</template>

<script>
import { quillEditor as QuillEditor } from 'vue-quill-editor'

import { twTheme } from '~/logic/constants/theme'

export default {
  components: {
    QuillEditor
  },

  props: {
    value: { type: String, default: '' }
  },

  computed: {
    quillOptions() {
      return {
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [
              {
                color: [
                  twTheme.colors.white,
                  'rgb(255,255,255,0.6)',
                  twTheme.colors.black,
                  twTheme.colors.cyan.DEFAULT,
                  twTheme.colors.green,
                  twTheme.colors.yellow,
                  twTheme.colors.orange,
                  twTheme.colors.red
                ]
              }
            ],
            [{ align: [] }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['link'],
            ['clean']
          ]
        }
      }
    }
  }
}
</script>

<style>
@import '~/assets/css/wysiwyg-editor.css';

.quill-editor {
  @apply flex grow flex-col !font-sans;
}

.ql-container {
  @apply overflow-hidden;
}

.ql-picker .ql-picker-label {
  @apply !rounded-4 !border-0 !transition;
}

.ql-picker-label::before,
.ql-picker-item::before {
  @apply !font-sans;
}

.ql-picker.ql-expanded .ql-picker-label {
  @apply !border-0 !bg-light-40;
}

.ql-picker-label {
  @apply !text-white;
}

.ql-stroke {
  @apply !stroke-white;
}

.ql-fill {
  @apply !fill-white;
}

.ql-toolbar {
  @apply space-x-14 divide-x-1 !divide-white/20 !rounded-t-6;
}

.ql-formats {
  @apply pl-14;
}

.ql-container {
  @apply h-auto grow rounded-b-6 !py-12 !pl-15 !pr-8;
}

.ql-editor {
  @apply !p-0 !ring-0;
}

.ql-picker-options {
  @apply !mt-4 rounded-6 !border-0 !bg-light-30 !px-14 !py-10 text-white;
}

.ql-picker-item {
  @apply !rounded-4;
}

.ql-picker-item {
  @apply transition hover:!text-white/60;
}

.ql-picker-item.ql-selected {
  @apply !text-cyan;
}

.ql-editor {
  @apply overflow-y-auto;
}

/* placeholder */
.ql-editor.ql-blank::before {
  @apply not-italic text-white/60;
}
</style>
