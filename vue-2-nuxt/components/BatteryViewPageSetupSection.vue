<template>
  <LayoutSection class="sm:overflow-hidden">
    <CustomScrollbarWrapper class="h-full">
      <div class="p-16 lg:py-24 lg:px-28">
        <div class="flex h-35 items-center justify-between">
          <h2 class="text-h1-sm sm:text-h1">{{ $t('setup') }}</h2>

          <AppTransition>
            <AppButton
              v-if="!editing && !readOnly"
              size="sm"
              :disabled="!battery.is_editable"
              :title="editButtonTitle"
              @click="emitUpdateEditing(true)"
            >
              {{ $t('edit') }}
            </AppButton>
          </AppTransition>
        </div>

        <div
          class="relative transition-all"
          :class="editing ? 'h-[300px]' : 'h-[240px]'"
        >
          <AppTransition>
            <div v-if="!editing" class="absolute inset-0 mt-12 sm:mt-32">
              <BatteryViewPageSetupSectionInfoItem
                name="SSC"
                :value="battery.sscs_count"
                class="rounded-b-0 pt-16 pb-0 sm:pt-21"
              />
              <BatteryViewPageSetupSectionInfoItem
                :name="$t('modules-per-ssc-0')"
                :value="battery.modules_per_ssc_count"
                class="rounded-t-0 pb-16 pt-13 sm:pb-24"
              />

              <BatteryViewPageSetupSectionInfoItem
                :name="$t('chemistry-0')"
                :value="battery.chemistry"
                icon="SVGIcon24Chemistry"
                class="mt-12"
              />
            </div>

            <BatteryViewPageSetupSectionForm
              v-else
              :battery="battery"
              class="absolute inset-0 mt-32"
              @setup-updated="$emit('setup-updated')"
              @cancel="emitUpdateEditing(false)"
            />
          </AppTransition>
        </div>

        <!-- TODO: uncomment when backend ready -->

        <!-- <h2 class="text-h1">Statistics</h2>

        <BatteryViewPageSetupSectionInfoItem
          name="Charge level"
          value="23,0%"
          icon="SVGIcon24Battery1"
          class="mt-24"
        />

        <BatteryViewPageSetupSectionInfoItem
          name="Battery health"
          value="23,0%"
          icon="SVGIcon24Battery2"
          class="mt-12"
        />

        <div class="flex space-x-12">
          <BatteryViewPageSetupSectionInfoItem
            name="Saved diesel fuel"
            value="240,5 liters"
            icon="SVGIcon24Oil"
            class="mt-12"
            lg
          />
          <BatteryViewPageSetupSectionInfoItem
            name="Reducing CO2"
            value="682 ppm"
            icon="SVGIcon24Cloud"
            class="mt-12"
            lg
          />
        </div> -->

        <!-- TODO: uncomment when battery/status page is done -->
        <!-- <AppButton>{{ $t('open-status') }}</AppButton> -->
      </div>
    </CustomScrollbarWrapper>
  </LayoutSection>
</template>

<script>
import AppButton from '~/components/AppButton.vue'
import AppTransition from '~/components/AppTransition.vue'
import BatteryViewPageSetupSectionForm from '~/components/BatteryViewPageSetupSectionForm.vue'
import BatteryViewPageSetupSectionInfoItem from '~/components/BatteryViewPageSetupSectionInfoItem.vue'
import CustomScrollbarWrapper from '~/components/CustomScrollbarWrapper.vue'
import LayoutSection from '~/components/LayoutSection.vue'

export default {
  components: {
    AppButton,
    LayoutSection,
    BatteryViewPageSetupSectionInfoItem,
    BatteryViewPageSetupSectionForm,
    AppTransition,
    CustomScrollbarWrapper
  },

  props: {
    battery: { type: Object, required: true },
    editing: { type: Boolean, default: false },
    readOnly: { type: Boolean, default: false }
  },

  computed: {
    editButtonTitle() {
      return !this.battery.is_editable
        ? this.$t(
            'edit-is-not-available-because-its-customer-or-project-is-archived'
          )
        : this.$t('edit-battery-setup')
    }
  },

  methods: {
    emitUpdateEditing(value) {
      this.$emit('update:editing', value)
    }
  }
}
</script>
