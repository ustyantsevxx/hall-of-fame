<template>
  <NuxtLink
    v-if="msm.id"
    class="flex items-center space-x-8 rounded-6"
    :to="to"
    :title="$t('view-battery')"
  >
    <p class="truncate text-h1">{{ msm.serial }}</p>
    <ButtonIcon class="mb-1 border-0 bg-light-20 py-7 px-6" tabindex="-1">
      <SVGRightClassicArrow />
    </ButtonIcon>
  </NuxtLink>
</template>

<script>
import ButtonIcon from '~/components/ButtonIcon.vue'

export default {
  components: {
    ButtonIcon
  },

  props: {
    msm: { type: Object, required: true }
  },

  computed: {
    to() {
      return {
        path: `/batteries/${this.msm.id}`,
        query: {
          backTo: this.$route.fullPath
        }
      }
    }
  }
}
</script>
