<template>
  <div class="flex select-none items-center border-b border-black/10">
    <div
      tabindex="0"
      title="xx xx"
      class="group flex flex-grow cursor-pointer items-center overflow-x-hidden py-8"
      :class="{ 'pr-10': value }"
      @click="emit('edit')"
      @keydown.enter.space="emit('edit')"
    >
      <div
        class="flex flex-grow items-center rounded-5 py-5 transition-opacity group-hover:opacity-70 group-active:opacity-90"
      >
        <div v-if="$slots['icon']" class="h-24 w-24 text-main-primary">
          <slot name="icon"></slot>
        </div>

        <div class="truncate text-14" :class="{ 'ml-10': $slots['icon'] }">
          <span>{{ label }}</span>
          <template v-if="value">
            <span>:</span>
            <span class="ml-5">{{ value }}</span>
          </template>
        </div>

        <div
          class="h-24 w-24 text-main-placeholder transition-colors group-hover:text-black/30 group-active:text-black/50"
          :class="[value ? '!ml-3' : 'ml-auto']"
        >
          <SvgArrowRight24
            class="h-full w-full transition-all"
            :class="{
              'rotate-90': value
            }"
          />
        </div>
      </div>
    </div>

    <div v-if="value" class="ml-auto flex">
      <ButtonCircleClear title="xx xx" @click="emit('reset')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonCircleClear from '@/components/ButtonCircleClear.vue'

defineProps({
  label: { type: String, required: true },
  value: { type: String, default: undefined }
})
const emit = defineEmits<{
  (n: 'reset')
  (n: 'edit')
}>()
</script>
