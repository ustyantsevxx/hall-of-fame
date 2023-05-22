<template>
  <ModalForm
    ref="modalFormRef"
    :title="$t('add-new-customer-0')"
    :fields="fields"
    :submit-fn="submitFn"
  />
</template>

<script>
import { required } from 'vuelidate/lib/validators'

import ModalForm from '~/components/ModalForm.vue'
import { CustomersService } from '~/logic/modules/customers/customers.service'
import {
  minLengthValidator,
  strongPasswordValidator
} from '~/logic/vue/mixins/form-mixin/validators'
import { ModalMixin } from '~/logic/vue/mixins/modal-mixin'

export default {
  components: {
    ModalForm
  },

  mixins: [ModalMixin('modalFormRef')],

  props: {
    customer: { type: Object, default: undefined }
  },

  computed: {
    fields() {
      return [
        {
          key: 'name',
          label: this.$t('first-name'),
          initialValue: this.customer?.name ?? '',
          component: {
            is: () => import('~/components/AppInput.vue'),
            props: {
              placeholder: this.$t('name-0')
            }
          },

          rules: [required]
        },

        {
          key: 'surname',
          label: this.$t('customer-surname'),
          initialValue: this.customer?.surname ?? '',
          component: {
            is: () => import('~/components/AppInput.vue'),
            props: {
              placeholder: this.$t('surname')
            }
          },

          rules: [required]
        },

        {
          key: 'login',
          label: this.$t('login-in-system'),
          initialValue: this.customer?.login ?? '',
          component: {
            is: () => import('~/components/AppInput.vue'),
            props: {
              placeholder: this.$t('login-0')
            }
          },

          rules: [minLengthValidator(6)]
        },

        {
          key: 'password',
          label: this.$t('password-in-system'),
          initialValue: '',
          description: this.customer
            ? this.$t('leave-the-field-blank-to-keep-the-current-password')
            : undefined,

          component: {
            is: () => import('~/components/AppInput.vue'),
            props: {
              placeholder: this.$t('password-1')
            }
          },

          rules: [minLengthValidator(8), strongPasswordValidator()]
        }
      ]
    }
  },

  methods: {
    async submitFn(customerData) {
      const { success, data, errors } = this.customer
        ? await CustomersService.updateCustomer(this.customer.id, customerData)
        : await CustomersService.createCustomer(customerData)

      if (success) {
        this.close(data.id ?? true)
      }

      return { success, errors }
    }
  }
}
</script>
