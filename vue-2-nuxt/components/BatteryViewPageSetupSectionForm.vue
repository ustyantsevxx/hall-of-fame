<template>
  <form class="w-[270px]" @submit.prevent="form.$handleSubmit(submit)">
    <div class="grid grid-cols-2 gap-x-13">
      <InputBatterySscCount v-model="form.sscCount.value" />
      <InputBatteryModulePerSscCount v-model="form.modulePerSscCount.value" />
    </div>

    <InputSelectChemistry
      v-model="form.chemistry.value"
      :invalid="form.chemistry.invalid"
      class="mt-20"
    />

    <div class="mt-32 flex">
      <AppButton
        type="submit"
        :loading="form.$loading"
        :disabled="form.$anyError"
      >
        {{ $t('save-1') }}
      </AppButton>
      <AppButton
        variant="secondary"
        :disabled="form.$loading"
        class="ml-16"
        @click="$emit('cancel')"
      >
        {{ $t('cancel-2') }}
      </AppButton>
    </div>
  </form>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

import AppButton from '~/components/AppButton.vue'
import InputBatteryModulePerSscCount from '~/components/InputBatteryModulePerSscCount.vue'
import InputBatterySscCount from '~/components/InputBatterySscCount.vue'
import InputSelectChemistry from '~/components/InputSelectChemistry.vue'
import { MsmsService } from '~/logic/modules/msms/msms.service'
import { FormMixin } from '~/logic/vue/mixins/form-mixin'

export default {
  components: {
    AppButton,
    InputSelectChemistry,
    InputBatterySscCount,
    InputBatteryModulePerSscCount
  },

  mixins: [
    FormMixin(
      function () {
        return {
          sscCount: { initialValue: this.battery.sscs_count },
          modulePerSscCount: {
            initialValue: this.battery.modules_per_ssc_count
          },
          chemistry: {
            initialValue: this.battery.chemistry,
            rules: [{ validator: required }]
          }
        }
      },
      { continueLoadingOnSuccess: true }
    )
  ],

  props: {
    battery: { type: Object, required: true }
  },

  methods: {
    async submit() {
      const { success } = await MsmsService.updateMsmSetup(this.battery.id, {
        sscs_count: this.form.sscCount.value,
        modules_per_ssc_count: this.form.modulePerSscCount.value,
        chemistry: this.form.chemistry.value
      })

      if (success) {
        this.$emit('setup-updated')
      }

      return { success }
    }
  }
}
</script>
