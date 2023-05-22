<template>
  <TransitionRoot :show="opened" as="template">
    <Dialog @close="close">
      <TransitionChild
        as="template"
        enter="duration-500 ease-out"
        enter-from="opacity-0 "
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogOverlay
          class="fixed inset-0 bg-transparent lg:bg-black/30 xl:bg-transparent"
        />
      </TransitionChild>

      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0 translate-x-10"
        enter-to="opacity-100 translate-x-0"
        leave="duration-200 ease-in"
        leave-from="opacity-100 translate-x-0"
        leave-to="opacity-0 translate-x-10"
      >
        <div
          class="fixed top-0 right-0 left-[201px] flex h-screen grow flex-col overflow-hidden bg-white lg:left-auto lg:w-[415px] lg:rounded-tl-12 lg:shadow-xl xl:rounded-tl-0 xl:bg-main-light-gray xl:shadow-none"
        >
          <div class="flex items-center justify-between px-30 pt-27 pb-5">
            <DialogTitle
              class="text-main-primary text-medium-23 laptop:text-medium-16"
            >
              <slot name="title">
                <Transition name="fade" mode="out-in">
                  <span :key="title">{{ title }}</span>
                </Transition>
              </slot>
            </DialogTitle>

            <div class="flex">
              <slot name="before-close"></slot>
              <ButtonHeadless title="Закрыть" @click="close">
                <SvgClose class="h-24 w-24 text-main-primary" />
              </ButtonHeadless>
            </div>
          </div>

          <div
            v-scroll-class="{ offset: 20, class: 'border-black/5' }"
            class="overflow-x-hidden overflow-y-scroll border-t pl-35 pr-25 pb-35 transition-colors lg:pl-30 lg:pr-20"
          >
            <slot></slot>
          </div>
        </div>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue'
import { watch } from 'vue'

import ButtonHeadless from '@/components/ButtonHeadless.vue'
import { useAppStore } from '@/stores/app'
import { sleep } from '@/utils'

const props = defineProps({
  opened: { type: Boolean, default: false },
  title: { type: String, default: '' }
})

const emit = defineEmits<{
  (e: 'update:opened', v: boolean)
  (e: 'before-open')
  (e: 'opened')
  (e: 'before-close')
  (e: 'closed')
}>()

const appStore = useAppStore()

watch(
  () => props.opened,
  async opened => {
    appStore.drawerOpened = opened

    if (opened) {
      emit('before-open')
      await sleep(300)
      emit('opened')
    } else {
      emit('before-close')
      await sleep(200)
      emit('closed')
    }
  }
)

const close = async () => {
  emit('update:opened', false)
  await sleep(200)
  emit('closed')
}
</script>
