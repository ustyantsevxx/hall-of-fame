<template>
  <button
    class="pointer-events-auto flex h-30 w-30 items-center justify-center rounded-full border-2 border-main-primary/10 text-main-primary transition-colors hover:border-main-primary/20 hover:bg-main-primary/10 active:bg-main-primary/20"
    type="button"
  >
    <span class="block h-12">
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts"></script>
