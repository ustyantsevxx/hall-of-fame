<template>
  <LayoutSection class="flex flex-col py-32 px-28">
    <form
      class="flex h-full grow flex-col"
      @submit.prevent="form.$handleSubmit(updateCustomerNotes)"
    >
      <AppFormGroup
        v-slot="{ id }"
        :label="$t('customer-notes')"
        class="flex grow flex-col"
        input-wrapper-class="flex flex-col grow"
        :error-message="form.notes.errorMessage"
      >
        <AppTextarea
          :id="id"
          v-model="form.notes.value"
          :invalid="form.notes.invalid"
          class="grow resize-none"
          :placeholder="$t('text-area')"
        />
      </AppFormGroup>

      <FormSaveCancelButtons :form="form" />
    </form>
  </LayoutSection>
</template>

<script>
import AppFormGroup from '~/components/AppFormGroup.vue'
import AppTextarea from '~/components/AppTextarea.vue'
import FormSaveCancelButtons from '~/components/FormSaveCancelButtons.vue'
import LayoutSection from '~/components/LayoutSection.vue'
import { CustomersService } from '~/logic/modules/customers/customers.service'
import { FormMixin } from '~/logic/vue/mixins/form-mixin'
import { maxLengthValidator } from '~/logic/vue/mixins/form-mixin/validators'

export default {
  components: {
    LayoutSection,
    AppFormGroup,
    AppTextarea,
    FormSaveCancelButtons
  },

  mixins: [
    FormMixin(function () {
      return {
        notes: {
          initialValue: this.customer.customer_notes ?? '',
          rules: [maxLengthValidator(1500)]
        }
      }
    })
  ],

  props: {
    customer: { type: Object, required: true }
  },

  methods: {
    async updateCustomerNotes() {
      const { success, errors } = await CustomersService.updateCustomerNotes(
        this.customer.id,
        this.form.notes.value
      )

      if (success) {
        this.form.$applyNewValues()
        this.$emit('notes-updated')
      }

      return { success, errors }
    }
  }
}
</script>
