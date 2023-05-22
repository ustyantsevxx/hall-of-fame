<template>
  <div class="lg:flex">
    <div class="hidden h-[240px] w-[240px] shrink-0 sm:block">
      <img
        v-if="batteryImageSrc"
        :src="batteryImageSrc"
        :alt="`${battery.name}'s image`"
        class="h-full w-full shrink-0 rounded-6 border border-white/20 object-contain"
      />

      <p
        v-else
        class="flex h-full w-full shrink-0 items-center justify-center rounded-6 border border-white/60 text-white/60"
      >
        {{ $t('no-image') }}
      </p>
    </div>

    <div class="grid gap-24 sm:mt-24 sm:grid-cols-2 sm:gap-32 lg:mt-0 lg:ml-32">
      <AppTextGroup :label="$t('customer')" :value="formattedCustomerName" />
      <AppTextGroup
        :label="$t('msm-serial-number-1')"
        :value="battery.serial"
      />
      <AppTextGroup :label="$t('location-1')" :value="battery.location" />
      <AppTextGroup :label="$t('geoposition-0')" :value="battery.geo" />
      <AppTextGroup :label="$t('name-1')" :value="battery.name" />
      <AppTextGroup :label="$t('project')" :value="battery.project.name" />
      <AppTextGroup
        :label="$t('description-1')"
        class="transition-[height] sm:col-span-2"
        multiline-value
        :value-class="{
          'line-clamp-3 sm:line-clamp-none':
            battery.description &&
            battery.description.length > 200 &&
            !descriptionExpanded
        }"
        :value="battery.description"
      />

      <AppButton
        v-if="battery.description && battery.description.length > 200"
        class="w-full sm:hidden"
        size="sm"
        variant="secondary"
        @click="descriptionExpanded = !descriptionExpanded"
      >
        {{ descriptionExpanded ? $t('collapse') : $t('expand') }}
      </AppButton>
    </div>
  </div>
</template>

<script>
import AppButton from '~/components/AppButton.vue'
import AppTextGroup from '~/components/AppTextGroup.vue'
import { CustomersService } from '~/logic/modules/customers/customers.service'

export default {
  components: {
    AppTextGroup,
    AppButton
  },

  props: {
    battery: { type: Object, required: true }
  },

  data() {
    return {
      descriptionExpanded: false
    }
  },

  computed: {
    batteryImageSrc() {
      return this.battery.media?.url
    },

    formattedCustomerName() {
      return CustomersService.formatCustomerName(this.battery.customer)
    }
  }
}
</script>
