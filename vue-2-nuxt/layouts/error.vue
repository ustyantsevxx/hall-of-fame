<template>
  <DefaultLayout>
    <div
      class="absolute inset-0 z-30 m-12 mt-96 flex grow items-center justify-center rounded-6 bg-light"
    >
      <Transition name="error-page-message" appear>
        <ErrorMessageOverlay
          :hide-refresh-button="error.statusCode === 404"
          :description="
            error.statusCode === 404 ? $t('page-not-found') : undefined
          "
        />
      </Transition>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '~/components/DefaultLayout.vue'
/* 
  This is the only exception of magic layout usage.
  `Though this file is placed in the layouts folder, it should be treated as a page.`
  See: https://nuxtjs.org/docs/directory-structure/layouts/#error-page
*/
import ErrorMessageOverlay from '~/components/ErrorMessageOverlay.vue'

export default {
  components: {
    ErrorMessageOverlay,
    DefaultLayout
  },

  // eslint-disable-next-line vue/require-prop-types
  props: ['error']
}
</script>

<style scoped>
.error-page-message-enter-active,
.error-page-message-leave-active {
  @apply !transition duration-[2000ms];
}

.error-page-message-leave-to,
.error-page-message-enter {
  @apply !opacity-0;
}
</style>
