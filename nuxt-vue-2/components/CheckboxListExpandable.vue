<template>
  <div>
    <div
      class="relative z-10 flex items-center space-x-8"
      :class="buttonContainerClass"
    >
      <div
        class="button-pseudo flex flex-col items-center self-stretch"
        :class="{ 'button-pseudo--active': expanded }"
      >
        <ButtonCirclePlusMinus :expanded.sync="expanded" />
      </div>

      <!-- eslint-disable vuejs-accessibility/interactive-supports-focus -->
      <!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
      <div class="cursor-pointer select-none" @click="expanded = !expanded">
        <slot name="expand-button-label"></slot>
      </div>
      <!-- eslint-enable vuejs-accessibility/interactive-supports-focus -->
      <!-- eslint-enable vuejs-accessibility/click-events-have-key-events -->
    </div>

    <div>
      <div v-if="expanded" class="ml-9" :class="checkboxContainerClass">
        <div
          v-for="(item, i) in valueArray"
          :key="i"
          class="list-checkbox relative flex items-center border-l border-gray-border"
          :class="{
            'pt-14': i !== valueArray.length - 1,
            'py-14': i === valueArray.length - 2
          }"
        >
          <div
            :class="{
              [offsetClass]: true,
              'offset-el h-1 bg-gray-border': i !== valueArray.length - 1,
              'last-offset-el':
                i === valueArray.length - 1 && valueArray.length !== 1,
              'only-offset-el': valueArray.length === 1
            }"
          ></div>

          <AppCheckbox
            class="flex w-max flex-1 items-center text-main"
            :class="{
              'translate-y-7': valueArray.length === 1
            }"
            bg-color="#fff"
            check-color="#000"
            :array="targetArray"
            :array-value="item"
            @update:array="emitInput"
            @array-added="$emit('array-added', $event)"
          >
            <slot name="checkbox-label" :item="item"></slot>
          </AppCheckbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppCheckbox from '~/components/AppCheckbox.vue'
import ButtonCirclePlusMinus from '~/components/ButtonCirclePlusMinus.vue'

export default {
  components: {
    AppCheckbox,
    ButtonCirclePlusMinus
  },

  model: {
    prop: 'targetArray'
  },

  props: {
    targetArray: { type: Array, required: true },
    valueArray: { type: Array, required: true },
    buttonContainerClass: { type: String, default: '' },
    checkboxContainerClass: { type: String, default: '' },
    offsetClass: { type: String, default: 'w-16' }
  },

  data() {
    return {
      expanded: false
    }
  },

  methods: {
    emitInput(newArray) {
      this.$emit('input', newArray)
    }
  }
}
</script>

<style scoped>
.button-pseudo::before,
.button-pseudo::after {
  content: '';
  @apply w-1 grow;
}

.button-pseudo--active::after {
  @apply bg-gray-border;
}

.list-checkbox:last-child {
  border-left: none !important;
}

.last-offset-el {
  @apply -translate-y-1/2 self-stretch rounded-6 border border-gray-border !important;
  border-top-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
}

.only-offset-el {
  @apply transform self-stretch rounded-6 border border-gray-border !important;
  border-top-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
}
</style>
