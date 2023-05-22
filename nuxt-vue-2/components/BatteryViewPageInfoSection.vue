<template>
  <LayoutSection class="sm:overflow-hidden">
    <CustomScrollbarWrapper class="h-full">
      <div class="p-16 lg:py-28 lg:px-28">
        <BatteryViewPageInfoSectionTitleBar
          :battery="battery"
          :editing="editing"
          :read-only="readOnly"
          @update:editing="newValue => emitUpdateEditing(newValue)"
        />

        <div class="relative mt-20 h-full sm:mt-14">
          <AppTransition>
            <BatteryViewPageInfoSectionInfo
              v-if="!editing"
              :battery="battery"
            />
            <BatteryViewPageInfoSectionForm
              v-else
              class="absolute inset-0 pb-24"
              :battery="battery"
              @info-updated="$emit('info-updated')"
              @cancel="emitUpdateEditing(false)"
            />
          </AppTransition>
        </div>
      </div>
    </CustomScrollbarWrapper>
  </LayoutSection>
</template>

<script>
import AppTransition from '~/components/AppTransition.vue'
import BatteryViewPageInfoSectionForm from '~/components/BatteryViewPageInfoSectionForm.vue'
import BatteryViewPageInfoSectionInfo from '~/components/BatteryViewPageInfoSectionInfo.vue'
import BatteryViewPageInfoSectionTitleBar from '~/components/BatteryViewPageInfoSectionTitleBar.vue'
import CustomScrollbarWrapper from '~/components/CustomScrollbarWrapper.vue'
import LayoutSection from '~/components/LayoutSection.vue'

export default {
  components: {
    LayoutSection,
    BatteryViewPageInfoSectionInfo,
    BatteryViewPageInfoSectionTitleBar,
    AppTransition,
    BatteryViewPageInfoSectionForm,
    CustomScrollbarWrapper
  },

  props: {
    battery: { type: Object, required: true },
    editing: { type: Boolean, default: false },
    readOnly: { type: Boolean, default: false }
  },

  methods: {
    emitUpdateEditing(value) {
      this.$emit('update:editing', value)
    }
  }
}
</script>
