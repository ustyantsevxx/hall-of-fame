<template>
  <DefaultLayout>
    <LayoutSection class="py-16 pl-28 pr-24">
      <div class="flex items-center justify-between">
        <h1 class="text-h1">{{ $t('add-battery-1') }}</h1>

        <div class="flex space-x-12">
          <AppButton to="/customers" variant="secondary">
            {{ $t('cancel-4') }}
          </AppButton>

          <AppButton
            :disabled="form.$anyError"
            :loading="form.$loading"
            @click="form.$handleSubmit(submit)"
          >
            {{ $t('add-battery-2') }}
          </AppButton>
        </div>
      </div>
    </LayoutSection>

    <LayoutSection class="mt-12 flex p-48 pr-40">
      <AppDropzone
        v-model="form.mediaId.value"
        class="h-[320px] w-[320px] shrink-0"
      />

      <div class="ml-40 grid w-full grid-cols-3 gap-x-24 gap-y-16">
        <InputSelectCustomer
          v-model="form.customerId.value"
          :invalid="form.customerId.invalid"
        />

        <InputSelectProject
          v-model="form.projectId.value"
          :invalid="form.projectId.invalid"
          :customer-id="form.customerId.value"
          @reset="form.projectId.reset"
        />

        <AppFormGroup
          v-slot="{ id }"
          :label="$t('api-key')"
          :error-message="form.apiKey.errorMessage"
        >
          <AppInput
            :id="id"
            v-model="form.apiKey.value"
            :invalid="form.apiKey.invalid"
            :placeholder="$t('fill-in-an-api-key')"
          />
        </AppFormGroup>

        <AppFormGroup
          v-slot="{ id }"
          :label="$t('msm-serial-number')"
          :error-message="form.serial.errorMessage"
        >
          <AppInput
            :id="id"
            v-model="form.serial.value"
            :invalid="form.serial.invalid"
            :placeholder="$t('fill-in-a-serial-number')"
          />
        </AppFormGroup>

        <AppFormGroup
          v-slot="{ id }"
          :label="$t('battery-name-2')"
          :error-message="form.name.errorMessage"
          :description="$t('max-count-symbols', { count: 20 })"
        >
          <AppInput
            :id="id"
            v-model="form.name.value"
            :invalid="form.name.invalid"
            :placeholder="$t('fill-in-a-battery-name')"
          />
        </AppFormGroup>

        <AppFormGroup
          v-slot="{ id }"
          :label="$t('location')"
          :error-message="form.location.errorMessage"
        >
          <AppInput
            :id="id"
            v-model="form.location.value"
            :invalid="form.location.invalid"
            :placeholder="$t('fill-in-a-location')"
          />
        </AppFormGroup>

        <InputBatterySscCount
          v-model="form.sscCount.value"
          :invalid="form.sscCount.invalid"
        />

        <InputBatteryModulePerSscCount
          v-model="form.modulePerSscCount.value"
          :invalid="form.modulePerSscCount.invalid"
        />

        <InputSelectChemistry
          v-model="form.chemistry.value"
          :invalid="form.chemistry.invalid"
        />

        <AppFormGroup
          v-slot="{ id }"
          class="col-span-3"
          :label="$t('description')"
          :error-message="form.description.errorMessage"
        >
          <AppTextarea
            :id="id"
            v-model="form.description.value"
            :invalid="form.description.invalid"
            :placeholder="$t('write-description')"
          />
        </AppFormGroup>
      </div>
    </LayoutSection>
  </DefaultLayout>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

import AppButton from '~/components/AppButton.vue'
import AppDropzone from '~/components/AppDropzone.vue'
import AppFormGroup from '~/components/AppFormGroup.vue'
import AppInput from '~/components/AppInput.vue'
import AppTextarea from '~/components/AppTextarea.vue'
import DefaultLayout from '~/components/DefaultLayout.vue'
import InputBatteryModulePerSscCount from '~/components/InputBatteryModulePerSscCount.vue'
import InputBatterySscCount from '~/components/InputBatterySscCount.vue'
import InputSelectChemistry from '~/components/InputSelectChemistry.vue'
import InputSelectCustomer from '~/components/InputSelectCustomer.vue'
import InputSelectProject from '~/components/InputSelectProject.vue'
import LayoutSection from '~/components/LayoutSection.vue'
import { MsmsService } from '~/logic/modules/msms/msms.service'
import { parseNumberOrNull } from '~/logic/utils'
import { FormMixin } from '~/logic/vue/mixins/form-mixin'
import { maxLengthValidator } from '~/logic/vue/mixins/form-mixin/validators'

export default {
  components: {
    LayoutSection,
    AppButton,
    AppDropzone,
    AppFormGroup,
    AppInput,
    AppTextarea,
    InputSelectCustomer,
    InputSelectProject,
    InputSelectChemistry,
    InputBatterySscCount,
    InputBatteryModulePerSscCount,
    DefaultLayout
  },

  mixins: [
    FormMixin(function () {
      return {
        mediaId: {
          initialValue: null
        },

        customerId: {
          initialValue: null,
          prefillValue: parseNumberOrNull(this.$route.query.customerId),
          rules: [required]
        },
        projectId: {
          initialValue: null,
          prefillValue: parseNumberOrNull(this.$route.query.projectId),
          rules: [required]
        },
        apiKey: {
          initialValue: '',
          rules: [required]
        },

        serial: {
          initialValue: '',
          rules: [required, maxLengthValidator(20)]
        },
        name: {
          initialValue: '',
          rules: [required, maxLengthValidator(20)]
        },
        location: {
          initialValue: '',
          rules: [required, maxLengthValidator(255)]
        },

        sscCount: {
          initialValue: null,
          rules: [required]
        },
        modulePerSscCount: {
          initialValue: null,
          rules: [required]
        },
        chemistry: {
          initialValue: null,
          rules: [required]
        },

        description: {
          initialValue: '',
          rules: [maxLengthValidator(1000)]
        }
      }
    })
  ],

  head() {
    return {
      title: this.$t('add-battery-3')
    }
  },

  methods: {
    async submit() {
      const { success, errors } = await MsmsService.createMsm({
        api_key: this.form.apiKey.value,
        location: this.form.location.value,
        serial: this.form.serial.value,
        description: this.form.description.value,
        project_id: this.form.projectId.value,
        modules_per_ssc_count: this.form.modulePerSscCount.value,
        sscs_count: this.form.sscCount.value,
        chemistry: this.form.chemistry.value,
        name: this.form.name.value,
        media_id: this.form.mediaId.value
      })

      if (success) {
        this.$router.push('/customers')
      }

      return { success, errors }
    }
  }
}
</script>
