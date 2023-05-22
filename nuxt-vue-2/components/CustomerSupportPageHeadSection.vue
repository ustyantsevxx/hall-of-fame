<template>
  <div class="flex items-center">
    <LinkBack :to="`/customers/${customer.id}`" class="ml-10" />
    <h1 class="ml-24 text-h1">{{ $t('support-manager-contacts') }}</h1>
  </div>
</template>

<script>
import LinkBack from '~/components/LinkBack.vue'

export default {
  components: {
    LinkBack
  },

  props: {
    customer: { type: Object, required: true }
  }
}
</script>
