<template>
  <LayoutSection class="px-28 py-24">
    <div class="flex items-center justify-between">
      <h2 class="text-h2">{{ $t('profile') }}</h2>

      <div class="flex">
        <AppButton size="sm" :to="`/customers/${customer.id}/support`">
          {{ $t('edit-support-manager-contacts') }}
        </AppButton>

        <AppButton size="sm" class="ml-16" @click="editProfile">
          {{ $t('edit-profile') }}
        </AppButton>
      </div>
    </div>

    <div class="mt-16 flex space-x-32">
      <CustomerViewPageTextGroup :label="$t('name-3')" :value="customer.name" />
      <CustomerViewPageTextGroup
        :label="$t('surname-0')"
        :value="customer.surname"
      />
      <CustomerViewPageTextGroup
        :label="$t('login-1')"
        :value="customer.login"
      />
      <CustomerViewPageTextGroup
        :label="$t('password-2')"
        value-class="!text-[8px]"
        value="●●●●●●●●"
      />
    </div>

    <ModalCustomer ref="ModalCustomer" :customer="customer" />
  </LayoutSection>
</template>

<script>
import AppButton from '~/components/AppButton.vue'
import CustomerViewPageTextGroup from '~/components/CustomerViewPageTextGroup.vue'
import LayoutSection from '~/components/LayoutSection.vue'
import ModalCustomer from '~/components/ModalCustomer.vue'

export default {
  components: {
    LayoutSection,
    AppButton,
    CustomerViewPageTextGroup,
    ModalCustomer
  },

  props: {
    customer: { type: Object, required: true }
  },

  methods: {
    async editProfile() {
      const editSuccess = await this.$refs.ModalCustomer.open()
      if (editSuccess) {
        this.$emit('profile-updated')
      }
    }
  }
}
</script>
