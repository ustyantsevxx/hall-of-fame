<template>
  <div>
    <BannerUpgradeToPremium />

    <div class="mt-20">
      <Input
        :model-value="userStore.user.username"
        placeholder="xx xx"
        readonly
      />
      <Input
        :model-value="userStore.user.email"
        class="mt-10"
        placeholder="Email"
        readonly
      />

      <Button
        variant="stroke-cancel"
        class="mt-20 laptop:!px-22 laptop:!py-6"
        @click="logout"
      >
        <SvgLogout class="h-24 w-24" />
        <span class="ml-10">xx xx xx</span>
      </Button>

      <SettingsProfilePageNewPasswordForm class="mt-33" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQueryClient } from 'vue-query'
import { useRouter } from 'vue-router'

import { AuthService } from '@/api/modules/auth'
import BannerUpgradeToPremium from '@/components/BannerUpgradeToPremium.vue'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import SettingsProfilePageNewPasswordForm from '@/pages/SettingsProfilePageNewPasswordForm.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()
const queryClient = useQueryClient()

const logout = async () => {
  await AuthService.logout()
  queryClient.clear()
  userStore.user = undefined
  await router.push('/auth/login')
}
</script>
