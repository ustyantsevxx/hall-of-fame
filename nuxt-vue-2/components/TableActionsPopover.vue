<template>
  <div v-on-clickaway="close" class="relative text-white">
    <ButtonIcon
      :title="
        actions.length > 0 ? $t('open-actions') : $t('no-actions-available')
      "
      :disabled="actions.length === 0"
      class="relative border-0 px-12 py-10"
      :class="[
        buttonClass,
        {
          'bg-light-30': opened,
          'hover:bg-light-30': actions.length > 0
        }
      ]"
      @click="toggle"
    >
      <Component :is="buttonIcon" />
    </ButtonIcon>

    <AppTransition>
      <div
        v-if="opened && actions.length > 0"
        class="absolute top-0 z-[9] rounded-8 bg-light-30 p-8"
        :class="[!leftSide ? 'right-full mr-4' : 'left-full ml-4']"
      >
        <ul>
          <li v-for="action in actions" :key="action.id">
            <button
              v-if="action.type === $options.TABLE_ACTION_TYPES.BUTTON"
              class="flex w-full items-center space-x-12 whitespace-nowrap rounded-8 px-8 py-3 transition-colors text-input hover:bg-light-40"
              @click="() => fireCallbackIfExists(action)"
            >
              <Component :is="action.icon" />
              <span>{{ action.text }}</span>
            </button>
          </li>
        </ul>
      </div>
    </AppTransition>
  </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway'

import AppCheckbox from '~/components/AppCheckbox.vue'
import AppTransition from '~/components/AppTransition.vue'
import ButtonIcon from '~/components/ButtonIcon.vue'

export const TABLE_ACTION_TYPES = {
  BUTTON: 'button'
}

export default {
  TABLE_ACTION_TYPES,

  directives: {
    onClickaway
  },

  components: {
    ButtonIcon,
    AppCheckbox,
    AppTransition
  },

  props: {
    actions: { type: Array, required: true },
    callbackData: { type: Object, default: null },
    buttonClass: { type: [String, Object], default: undefined },
    buttonIcon: { type: String, default: 'SVGVerticalEllipsis' },
    leftSide: { type: Boolean, default: false }
  },

  data() {
    return {
      opened: false
    }
  },

  methods: {
    fireCallbackIfExists(action) {
      action?.callback?.(this.callbackData)
      this.opened = false
    },

    close() {
      this.opened = false
    },

    toggle() {
      this.opened = !this.opened
    }
  }
}
</script>
