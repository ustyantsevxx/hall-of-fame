<template>
  <AuthWrapper v-if="emailVerifyRequestSent" :title="blockContent.title">
    <p class="mt-10 pb-29 text-[15px] leading-[18px]">
      {{ blockContent.text }}
    </p>
  </AuthWrapper>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { AuthService } from '@/api/modules/auth'
import AuthWrapper from '@/components/AuthWrapper.vue'
import { axiosRuntimeSettings } from '@/core/settings'

const route = useRoute()

const emailVerifyRequestSent = ref(false)
const emailVerifyRequestSuccess = ref(false)

const blockContent = computed(() => {
  return emailVerifyRequestSuccess.value
    ? {
        title: 'xx!',
        text: ' xx xx xx xx, xx xx xx xx xx xx xx xx.'
      }
    : {
        title: 'xx!',
        text: 'xx xx xx xx! xx xx xx xx xx xx.'
      }
})

const tryVerifyEmail = async () => {
  const { id, hash, expires, signature } = route.query as {
    [key: string]: string
  }

  try {
    if (id && hash && expires && signature) {
      axiosRuntimeSettings.useBadTokenLogoutInterceptor = false
      emailVerifyRequestSuccess.value = await AuthService.verifyEmail({
        id,
        hash,
        expires,
        signature
      })
    }
  } finally {
    emailVerifyRequestSent.value = true
    axiosRuntimeSettings.useBadTokenLogoutInterceptor = true
  }
}

onMounted(async () => {
  await tryVerifyEmail()
})
</script>
