<template>
  <div class="flex w-[256px] flex-col items-center justify-center">
    <h1 class="font-avenir text-h1">{{ $t('error') }}</h1>
    <div class="mt-5 text-center">
      <p>{{ description }}</p>
      <ButtonRefreshPage v-if="!hideRefreshButton" />
    </div>
  </div>
</template>

<script>
import ButtonRefreshPage from '~/components/ButtonRefreshPage.vue'

export default {
  components: {
    ButtonRefreshPage
  },

  props: {
    hideRefreshButton: { type: Boolean, default: false },
    description: {
      type: String,
      default() {
        return this.$t(
          'please-reload-the-page-or-check-your-internet-connection'
        )
      }
    }
  }
}
</script>
