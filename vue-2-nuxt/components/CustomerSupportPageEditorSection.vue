<template>
  <LayoutSection class="flex grow flex-col">
    <form
      class="flex h-full flex-col overflow-hidden px-28 py-32"
      @submit.prevent="form.$handleSubmit(updateSupportContacts)"
    >
      <AppWysiwygEditor v-model="form.content.value" class="overflow-hidden" />
      <FormSaveCancelButtons :form="form" class="mt-16" />
    </form>
  </LayoutSection>
</template>

<script>
import AppWysiwygEditor from '~/components/AppWysiwygEditor.vue'
import FormSaveCancelButtons from '~/components/FormSaveCancelButtons.vue'
import LayoutSection from '~/components/LayoutSection.vue'
import { CustomersService } from '~/logic/modules/customers/customers.service'
import { FormMixin } from '~/logic/vue/mixins/form-mixin'

export default {
  components: {
    LayoutSection,
    FormSaveCancelButtons,
    AppWysiwygEditor
  },

  mixins: [
    FormMixin(
      function () {
        return {
          content: {
            initialValue: this.customer.support_manager_contacts ?? ''
          }
        }
      },
      { checkAnyChangedOnlyOnce: true }
    )
  ],

  props: {
    customer: { type: Object, required: true }
  },

  methods: {
    async updateSupportContacts() {
      const { success } = await CustomersService.updateSupportContacts(
        this.customer.id,
        this.form.content.value
      )

      if (success) {
        this.form.$applyNewValues()
        this.$emit('updated')
      }

      return { success }
    }
  }
}
</script>
