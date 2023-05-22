<template>
  <AppModal
    ref="modalControllerProvider"
    v-slot="{ closeWith }"
    @open="form.$initFields"
    @close="form.$reset"
  >
    <h1 class="text-h1">{{ title }}</h1>

    <p v-if="description" class="mt-16 text-main">{{ description }}</p>

    <form @submit.prevent="form.$handleSubmit(submitFn)">
      <div class="mt-32 space-y-8">
        <AppFormGroup
          v-for="(field, i) in fields"
          :key="i"
          v-slot="{ id }"
          :label="field.label"
          :no-label="field.noLabel"
          :description="field.description"
          :error-message="form[field.key].errorMessage"
        >
          <Component
            :is="field.component.is"
            :id="id"
            v-model="form[field.key].value"
            :invalid="form[field.key].invalid"
            v-bind="field.component.props"
          />
        </AppFormGroup>
      </div>

      <div class="mt-24 flex space-x-16">
        <AppButton variant="secondary" @click="closeWith(undefined)">
          {{ $t('cancel-0') }}
        </AppButton>

        <AppButton
          type="submit"
          :disabled="form.$anyError"
          :loading="form.$loading"
        >
          {{ $t('save') }}
        </AppButton>
      </div>
    </form>
  </AppModal>
</template>

<script>
import AppButton from '~/components/AppButton.vue'
import AppFormGroup from '~/components/AppFormGroup.vue'
import AppInput from '~/components/AppInput.vue'
import AppModal from '~/components/AppModal.vue'
import { FormMixin } from '~/logic/vue/mixins/form-mixin'
import { ModalMixin } from '~/logic/vue/mixins/modal-mixin'

export default {
  components: {
    AppModal,
    AppButton,
    AppFormGroup,
    AppInput
  },

  mixins: [
    ModalMixin('modalControllerProvider'),
    FormMixin(
      function () {
        return Object.fromEntries(
          this.fields.map(field => {
            return [
              field.key,
              {
                initialValue: field.initialValue,
                rules: field.rules
              }
            ]
          })
        )
      },
      { continueLoadingOnSuccess: true }
    )
  ],

  props: {
    fields: { type: Array, default: () => [] },
    title: { type: String, default: undefined },
    description: { type: String, default: undefined },
    submitFn: { type: Function, required: true }
  }
}
</script>
