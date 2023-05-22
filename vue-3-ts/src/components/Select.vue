<template>
  <Listbox
    v-slot="{ open }"
    :model-value="modelValue"
    :class="[variant]"
    class="app-select"
    as="div"
    @update:model-value="emitVModel"
  >
    <div class="relative">
      <ListboxButton
        class="app-select-button flex w-full items-center border-b border-black/10 pb-5 text-left text-19 laptop:text-14"
      >
        <span class="grow">
          <span v-if="selectedOption">
            <slot name="selected-option" :data="selectedOption">
              {{ selectedOptionTitle }}
            </slot>
          </span>
          <span v-else class="font-normal">{{ placeholder }}</span>
        </span>
        <SvgChevron
          class="h-24 w-24 text-main-placeholder transition-transform"
          :class="{ 'rotate-180': open }"
        />
      </ListboxButton>

      <Transition name="fade-slide-down">
        <ListboxOptions
          class="app-select-body no-default-ring absolute z-10 mt-10 w-full bg-white"
        >
          <ListboxOption
            v-for="option in options"
            :key="option[trackBy]"
            v-slot="{ selected, active }"
            :value="option[trackBy]"
            as="li"
          >
            <slot
              name="option"
              :data="option"
              :selected="selected"
              :active="active"
            >
              <div
                class="cursor-pointer p-15 transition-colors"
                :class="{
                  'bg-main-light-gray': selected || (active && !selected)
                }"
              >
                {{ option[titleBy] }}
              </div>
            </slot>
          </ListboxOption>
        </ListboxOptions>
      </Transition>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from '@headlessui/vue'
import { computed, PropType } from 'vue'

import { SelectVariant } from '@/components/Select.types'

const props = defineProps({
  modelValue: { type: null, default: null },
  options: { type: Array as PropType<any[]>, default: () => [] },
  trackBy: { type: String, default: 'value' },
  titleBy: { type: String, default: 'title' },
  variant: { type: String as PropType<SelectVariant>, default: 'regular' },
  placeholder: { type: String, default: undefined }
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: unknown)
}>()

const emitVModel = (value: unknown) => {
  emit('update:modelValue', value)
}

const selectedOption = computed(() => {
  return props.options.find(
    option => option[props.trackBy] === props.modelValue
  )
})

const selectedOptionTitle = computed<string>(() => {
  return selectedOption.value?.[props.titleBy]
})
</script>

<style>
.app-select {
  .app-select-body {
    @apply overflow-hidden;
    box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.15) !important;
  }

  &.regular {
  }

  &.elevated {
    .app-select-button {
      @apply rounded-10 border-none py-12 pl-15 pr-10 text-15 laptop:py-8;
      box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.04);
    }

    .app-select-body {
      @apply rounded-10;
    }
  }
}
</style>
