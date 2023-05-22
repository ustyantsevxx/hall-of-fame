<template>
  <div class="flex items-center">
    <LinkBack to="/customers" class="ml-10" />
    <h1 class="ml-24 text-h1">{{ $t('customer-settings') }}</h1>
  </div>
</template>

<script>
import LinkBack from '~/components/LinkBack.vue'

export default {
  components: {
    LinkBack
  }
}
</script>
