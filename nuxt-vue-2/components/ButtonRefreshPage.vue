<template>
  <button :title="$t('refresh-page')" class="rounded-6 p-10" @click="refresh">
    <SVGIcon40Reload />
  </button>
</template>

<script>
export default {
  methods: {
    refresh() {
      location.reload()
    }
  }
}
</script>
