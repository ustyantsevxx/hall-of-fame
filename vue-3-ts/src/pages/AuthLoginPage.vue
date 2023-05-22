<template>
  <AuthWrapper v-if="!processingSocialCallback" title="Авторизация">
    <form class="mt-18" @submit.prevent="signIn">
      <AuthLoginPageSocialButtons />

      <AuthPageDivider class="mt-35 mb-40" />

      <div>
        <Input
          v-model="email"
          :invalid="!!errorMessage && errorOfInvalidCredentials"
          type="email"
          data-test="email"
          placeholder="Email"
          class="mb-14"
          variant="primary"
          @input="resetErrors"
        />

        <InputPassword
          v-model="password"
          :invalid="!!errorMessage && errorOfInvalidCredentials"
          placeholder="Пароль"
          data-test="password"
          variant="primary"
          @input="resetErrors"
        />

        <Error v-if="errorMessage" class="mt-14">{{ errorMessage }}</Error>

        <Button
          data-test="submit"
          class="mt-14 w-full"
          :loading="loading"
          :disabled="!submitAllowed"
          :title="!submitAllowed ? 'Введите email и пароль' : ''"
        >
          Войти
        </Button>

        <RouterLink
          :to="restorePageLinkWithEmail"
          class="mt-25 block w-max underline"
          data-test="restore-password-link"
        >
          Забыли пароль?
        </RouterLink>
      </div>

      <div class="mb-15 flex justify-center pt-35">
        <p>Нет аккаунта?</p>
        &nbsp;
        <RouterLink to="/auth/register" class="underline">
          Регистрация
        </RouterLink>
      </div>
    </form>
  </AuthWrapper>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { AuthService } from '@/api/modules/auth'
import AuthWrapper from '@/components/AuthWrapper.vue'
import Button from '@/components/Button.vue'
import Error from '@/components/Error.vue'
import Input from '@/components/Input.vue'
import InputPassword from '@/components/InputPassword.vue'
import { axiosRuntimeSettings } from '@/core/settings'
import AuthLoginPageSocialButtons from '@/pages/AuthLoginPageSocialButtons.vue'
import AuthPageDivider from '@/pages/AuthPageDivider.vue'
import { useUserStore } from '@/stores/user'

const { query } = useRoute()
const userStore = useUserStore()
const router = useRouter()

const processingSocialCallback = ref(false)
onBeforeMount(async () => {
  if (query.provider && query.code) {
    processingSocialCallback.value = true
    // disable response interceptor because if it fails
    // it drops 401 error code
    axiosRuntimeSettings.useBadTokenLogoutInterceptor = false

    const user = await AuthService.signInWithSocial({
      provider: query.provider.toString(),
      code: query.code.toString()
    })

    axiosRuntimeSettings.useBadTokenLogoutInterceptor = true

    if (user) {
      userStore.user = user
      await goNext()
    } else {
      processingSocialCallback.value = false
    }
  }
})

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const errorOfInvalidCredentials = ref(false)

const submitAllowed = computed(() => {
  return email.value !== ''
})

const resetErrors = () => {
  errorOfInvalidCredentials.value = false
  errorMessage.value = ''
}

const loading = ref(false)
const signIn = async () => {
  loading.value = true
  try {
    const user = await AuthService.signIn({
      email: email.value,
      password: password.value
    })

    if (!user.email_verified) {
      errorMessage.value = 'Email не подтвержден'
      return
    }

    if (user) {
      userStore.user = user
      await goNext()
    }
  } catch {
    errorOfInvalidCredentials.value = true
    errorMessage.value = 'Неверный логин или пароль'
  } finally {
    loading.value = false
  }
}

const goNext = async () => {
  await router.push({ path: query.next?.toString() ?? '/' })
}

const restorePageLinkWithEmail = computed(() => {
  return {
    path: `/auth/password/restore`,
    query: {
      email: email.value || undefined
    }
  }
})
</script>
