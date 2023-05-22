<template>
  <div class="ql-editor" v-html="content"></div>
</template>

<script>
export default {
  props: {
    content: { type: String, default: '' }
  }
}
</script>

<style>
@import '~/assets/css/wysiwyg-editor.css';
</style>
