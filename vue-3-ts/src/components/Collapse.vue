<template>
  <Disclosure v-slot="{ open }">
    <DisclosureButton
      tabindex="0"
      class="group relative w-full cursor-pointer"
      as="div"
    >
      <slot name="activator-content" :open="open"></slot>
    </DisclosureButton>

    <DisclosurePanel class="!mt-0">
      <slot :open="open"></slot>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
</script>
