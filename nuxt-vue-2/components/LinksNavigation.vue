<template>
  <nav class="bg-dark">
    <ul class="flex h-full sm:space-x-40">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        v-slot="{ href, navigate, isActive }"
        :to="link.to"
        :exact="link.exact"
        custom
      >
        <li :class="liClass" class="flex-1 sm:flex-none">
          <a
            :href="href"
            class="block h-full select-none border-b-2 py-11 text-center transition text-main sm:border-b-3 sm:text-left sm:text-navigation"
            :class="[
              linkClass,
              isActive
                ? 'border-white text-white'
                : 'text-white/60 hover:border-white/40 hover:text-white/100'
            ]"
            @click="navigate"
          >
            <slot v-if="link.slot" :name="link.slot" :linkText="link.text">
              {{ link.text }}
            </slot>
            <template v-else>
              {{ link.text }}
            </template>
          </a>
        </li>
      </NuxtLink>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    links: { type: Array, required: true },
    liClass: { type: String, default: '' },
    linkClass: { type: String, default: '' }
  }
}
</script>
