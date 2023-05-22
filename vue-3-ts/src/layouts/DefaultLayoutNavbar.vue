<template>
  <aside
    class="flex flex-col border-r border-black/5 bg-main-light-gray pt-50 pb-20 xl:pt-27"
  >
    <nav class="flex grow flex-col">
      <div class="flex items-center px-20">
        <SvgLogo class="h-34 w-34 laptop:h-32 laptop:w-32 2xl:h-44 2xl:w-44" />
        <span
          class="ml-6 text-[18px] leading-[23px] text-main-primary 2xl:ml-8 2xl:text-medium-23"
        >
          xxx
        </span>
        <span class="ml-12" title="Синхронизация выключена">
          <SvgCloudSubtract
            class="h-19 w-19 text-main-light-blue 2xl:h-24 2xl:w-24"
          />
        </span>
      </div>

      <DefaultLayoutNavbarUserBlock class="mt-22" />

      <ul class="mt-25 w-full px-20 laptop:mt-22">
        <li v-for="link in links" :key="link.path">
          <RouterLink
            :to="link.path"
            :title="link.title"
            active-class="!text-white bg-main-primary cursor-default"
            class="navbar-link group block rounded-13 py-8 pr-16 pl-10 text-black transition-colors hover:text-black/60 active:text-black/80 laptop:py-6"
          >
            <div class="flex items-center">
              <Component
                :is="link.icon"
                class="h-28 w-28 laptop:h-24 laptop:w-24"
              />
              <span class="ml-10 text-15 laptop:text-14">
                {{ link.title }}
              </span>
            </div>
          </RouterLink>
        </li>
      </ul>

      <BannerSyncData class="mx-20 mt-35" />
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import SvgTabBarDaylog from '@/assets/svg/components/Svg/TabBar/Daylog.svg'
import SvgTabBarSettings from '@/assets/svg/components/Svg/TabBar/Settings.svg'
import SvgTabBarStats from '@/assets/svg/components/Svg/TabBar/Stats.svg'
import SvgTabBarTasks from '@/assets/svg/components/Svg/TabBar/Tasks.svg'
import SvgTabBarTimer from '@/assets/svg/components/Svg/TabBar/Timer.svg'
import BannerSyncData from '@/components/BannerSyncData.vue'
import DefaultLayoutNavbarUserBlock from '@/layouts/DefaultLayoutNavbarUserBlock.vue'

const links = computed(() => [
  { path: '/', title: 'Таймеры', icon: SvgTabBarTimer },
  { path: '/daylog', title: 'Журнал дня', icon: SvgTabBarDaylog },
  { path: '/tasks', title: 'Задачи', icon: SvgTabBarTasks },
  { path: '/stats', title: 'Статистика', icon: SvgTabBarStats },
  { path: '/settings', title: 'Настройки', icon: SvgTabBarSettings }
])
</script>

<style>
.navbar-link.router-link-exact-active * {
  @apply opacity-100 !important;
}
</style>
