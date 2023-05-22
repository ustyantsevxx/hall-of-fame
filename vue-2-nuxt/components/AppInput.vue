<template>
  <div
    class="relative rounded-6 border transition-colors"
    :class="{
      'border-white/40': disabled,
      'border-white focus-within:border-cyan': !invalid && !disabled,
      'border-red': invalid && !disabled
    }"
  >
    <slot name="start"></slot>

    <label :for="id || $uid" class="grow">
      <input
        :id="id || $uid"
        ref="input"
        v-model="localValue"
        v-mask="mask"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :enterkeyhint="enterkeyhint"
        :tabindex="tabindex"
        :type="type"
        class="w-full bg-transparent py-7 pl-12 outline-none !ring-0 text-input sm:py-11"
        :class="[
          inputClass,
          clearAllowed ? 'truncate pr-40' : 'pr-12',
          disabled
            ? 'text-white/40 placeholder-white/40'
            : 'placeholder-white/60'
        ]"
        :[$options.FOCUS_ON_SLASH_INPUT_ATTR]="focusOnSlash ? '' : false"
        @input="e => emitInput(e.target.value)"
        @blur="() => $emit('blur')"
        @keypress.esc="() => clearAllowed && clear()"
      />
    </label>

    <AppTransition>
      <button
        v-if="clearAllowed"
        type="button"
        :class="clearButtonClass"
        class="absolute top-1/2 right-10 -translate-y-1/2"
        @click="clear"
      >
        <SVGIcon24Close />
      </button>
    </AppTransition>

    <slot name="end"></slot>
  </div>
</template>

<script>
import AppTransition from '~/components/AppTransition.vue'
import { FOCUS_ON_SLASH_INPUT_ATTR } from '~/plugins/focus-on-slash'

export default {
  FOCUS_ON_SLASH_INPUT_ATTR,

  components: {
    AppTransition
  },

  props: {
    id: {
      type: String,
      default() {
        return this.$uid
      }
    },

    value: { type: String, default: '' },
    label: { type: String, default: '' },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    mask: { type: String, default: undefined },
    invalid: { type: Boolean, default: false },
    focusOnSlash: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
    clearButtonClass: { type: null, default: undefined },
    inputClass: { type: null, default: undefined },
    autocomplete: { type: String, default: undefined },
    name: { type: String, default: undefined },
    enterkeyhint: { type: String, default: undefined },
    tabindex: { type: [String, Number], default: undefined }
  },

  data() {
    return {
      localValue: this.value
    }
  },

  computed: {
    clearAllowed() {
      return this.clearable && this.localValue !== ''
    }
  },

  watch: {
    value(value) {
      this.localValue = value
    }
  },

  methods: {
    emitInput(value) {
      this.$emit('input', value)
    },

    clear() {
      this.localValue = ''
      this.$emit('clear')
    },

    focus() {
      this.$refs.input.focus()
    }
  }
}
</script>
