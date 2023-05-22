<template>
  <DefaultLayout wrapper-class="sm:overflow-hidden">
    <LinkBack class="-mt-8 ml-10 sm:mt-0" :to="backLink">
      {{ $t('back-3') }}
    </LinkBack>

    <BatteryViewPageToolbar
      :read-only="readOnly"
      :battery="battery"
      class="mt-8 shrink-0 sm:mt-12"
    />

    <div class="mt-12 grid grow grid-cols-12 gap-12 sm:overflow-hidden">
      <BatteryViewPageInfoSection
        class="col-span-12 sm:col-span-7 lg:col-span-9"
        :battery="battery"
        :editing.sync="infoSectionEditing"
        :read-only="readOnly"
        @info-updated="emitUpdated"
      />

      <BatteryViewPageSetupSection
        class="col-span-12 sm:col-span-5 lg:col-span-3"
        :battery="battery"
        :editing.sync="setupSectionEditing"
        :read-only="readOnly"
        @setup-updated="emitUpdated"
      />
    </div>
  </DefaultLayout>
</template>

<script>
import BatteryViewPageInfoSection from '~/components/BatteryViewPageInfoSection.vue'
import BatteryViewPageSetupSection from '~/components/BatteryViewPageSetupSection.vue'
import BatteryViewPageToolbar from '~/components/BatteryViewPageToolbar.vue'
import DefaultLayout from '~/components/DefaultLayout.vue'
import LinkBack from '~/components/LinkBack.vue'

export default {
  components: {
    LinkBack,
    BatteryViewPageToolbar,
    BatteryViewPageInfoSection,
    BatteryViewPageSetupSection,
    DefaultLayout
  },

  props: {
    battery: { type: Object, required: true },
    readOnly: { type: Boolean, default: false },
    backLink: { type: String, default: '/customers' }
  },

  data() {
    return {
      infoSectionEditing: false,
      setupSectionEditing: false
    }
  },

  watch: {
    battery: {
      deep: true,
      handler() {
        this.infoSectionEditing = false
        this.setupSectionEditing = false
      }
    }
  },

  methods: {
    emitUpdated() {
      this.$emit('updated')
    }
  }
}
</script>
