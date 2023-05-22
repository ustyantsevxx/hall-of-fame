<template>
  <div class="flex h-35 items-center justify-between">
    <h2 class="text-h1-sm sm:text-h1">{{ $t('battery-info') }}</h2>

    <AppTransition>
      <AppButton
        v-if="!editing && !readOnly"
        :title="editButtonTitle"
        size="sm"
        :disabled="!battery.is_editable"
        @click="$emit('update:editing', !editing)"
      >
        {{ $t('edit-0') }}
      </AppButton>
    </AppTransition>
  </div>
</template>

<script>
import AppButton from '~/components/AppButton.vue'
import AppTransition from '~/components/AppTransition.vue'

export default {
  components: {
    AppTransition,
    AppButton
  },

  props: {
    editing: { type: Boolean, required: true },
    battery: { type: Object, required: true },
    readOnly: { type: Boolean, default: false }
  },

  computed: {
    editButtonTitle() {
      return !this.battery.is_editable
        ? this.$t(
            'edit-is-not-available-because-its-customer-or-project-is-archived'
          )
        : this.$t('edit-battery-info')
    }
  }
}
</script>
