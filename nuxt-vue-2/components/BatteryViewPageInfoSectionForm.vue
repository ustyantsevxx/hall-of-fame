<template>
  <form
    class="grid h-max auto-rows-max gap-32"
    style="grid-template-columns: auto 1fr"
    @submit.prevent="form.$handleSubmit(submit)"
  >
    <AppDropzone
      v-model="form.mediaId.value"
      :src="form.mediaUrl.value"
      class="h-[240px] w-[240px]"
    />

    <div>
      <div class="grid w-full grid-cols-2 gap-x-24 gap-y-16">
        <InputSelectCustomer
          v-model="form.customerId.value"
          :invalid="form.customerId.invalid"
        />

        <AppFormGroup
          v-slot="{ id }"
          :label="$t('msm-serial-number-0')"
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
          :label="$t('location-0')"
          :error-message="form.location.errorMessage"
        >
          <AppInput
            :id="id"
            v-model="form.location.value"
            :invalid="form.location.invalid"
            :placeholder="$t('fill-in-a-location-0')"
          />
        </AppFormGroup>

        <AppFormGroup
          v-slot="{ id }"
          :label="$t('geoposition')"
          :error-message="form.geo.errorMessage"
        >
          <AppInput
            :id="id"
            v-model="form.geo.value"
            :invalid="form.geo.invalid"
            :placeholder="$t('fill-in-a-geoposition')"
          />
        </AppFormGroup>

        <AppFormGroup
          v-slot="{ id }"
          :label="$t('battery-name-3')"
          :error-message="form.name.errorMessage"
        >
          <AppInput
            :id="id"
            v-model="form.name.value"
            :invalid="form.name.invalid"
            :placeholder="$t('fill-in-a-battery-name-0')"
          />
        </AppFormGroup>

        <InputSelectProject
          v-model="form.projectId.value"
          :invalid="form.projectId.invalid"
          :customer-id="form.customerId.value"
          @reset="form.projectId.reset"
        />

        <AppFormGroup
          v-slot="{ id }"
          class="col-span-2"
          :label="$t('description-0')"
          :error-message="form.description.errorMessage"
        >
          <AppTextarea
            :id="id"
            v-model="form.description.value"
            :invalid="form.description.invalid"
            :placeholder="$t('write-description-0')"
          />
        </AppFormGroup>
      </div>

      <div class="mt-24 flex items-start space-x-16">
        <AppButton
          :loading="form.$loading"
          type="submit"
          :disabled="form.$anyError"
        >
          {{ $t('save-0') }}
        </AppButton>
        <AppButton
          variant="secondary"
          :disabled="form.$loading"
          @click="showConfirmCancelModalIfEdited"
        >
          {{ $t('cancel-1') }}
        </AppButton>
      </div>
    </div>

    <ModalConfirm
      ref="confirmCancelModal"
      title-class="text-center"
      content-class="flex flex-col items-center"
      :title="$t('do-you-want-to-discard-changes')"
      subtitle=""
      button-colors-inverted
      :confirm-text="$t('yes-0')"
      :cancel-text="$t('no')"
    />
  </form>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

import AppButton from '~/components/AppButton.vue'
import AppDropzone from '~/components/AppDropzone.vue'
import AppFormGroup from '~/components/AppFormGroup.vue'
import AppInput from '~/components/AppInput.vue'
import AppTextarea from '~/components/AppTextarea.vue'
import InputSelectCustomer from '~/components/InputSelectCustomer.vue'
import InputSelectProject from '~/components/InputSelectProject.vue'
import ModalConfirm from '~/components/ModalConfirm.vue'
import { MsmsService } from '~/logic/modules/msms/msms.service'
import { FormMixin } from '~/logic/vue/mixins/form-mixin'
import { maxLengthValidator } from '~/logic/vue/mixins/form-mixin/validators'

export default {
  components: {
    AppFormGroup,
    AppInput,
    AppButton,
    AppTextarea,
    AppDropzone,
    ModalConfirm,
    InputSelectCustomer,
    InputSelectProject
  },

  mixins: [
    FormMixin(
      function () {
        return {
          name: {
            initialValue: this.battery.name,
            rules: [required, maxLengthValidator(20)]
          },
          serial: {
            initialValue: this.battery.serial,
            rules: [required, maxLengthValidator(20)]
          },
          mediaUrl: {
            initialValue: this.battery.media?.url
          },
          mediaId: {
            initialValue: this.battery.media?.id
          },
          description: {
            initialValue: this.battery.description,
            rules: [maxLengthValidator(1000)]
          },
          location: {
            initialValue: this.battery.location,
            rules: [required, maxLengthValidator(255)]
          },
          geo: {
            initialValue: this.battery.geo,
            rules: [required, maxLengthValidator(255)]
          },
          projectId: {
            initialValue: this.battery.project.id,
            rules: [required]
          },
          customerId: {
            initialValue: this.battery.customer.id,
            rules: [required]
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
    async showConfirmCancelModalIfEdited() {
      if (!this.form.$anyChanged) {
        this.$emit('cancel')
        return
      }

      const sureCancel = await this.$refs.confirmCancelModal.open()
      if (sureCancel) {
        this.$emit('cancel')
      }
    },

    async submit() {
      const { success, errors } = await MsmsService.updateMsmInfo(
        this.battery.id,
        {
          media_id: this.form.mediaId.value,
          serial: this.form.serial.value,
          description: this.form.description.value,
          name: this.form.name.value,
          location: this.form.location.value,
          geo: this.form.geo.value,
          project_id: this.form.projectId.value
        }
      )

      if (success) {
        this.$emit('info-updated')
        this.$store.dispatch('serverCache/clearMsmList')
      }

      return { success, errors }
    }
  }
}
</script>
