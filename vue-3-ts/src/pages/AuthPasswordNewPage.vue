<template>
  <AuthWrapper title="xx xx">
    <form
      v-if="!passwordChanged"
      class="mt-18 flex min-h-[618px] flex-col justify-between divide-y divide-white divide-opacity-20"
      @submit.prevent="onSubmit"
    >
      <div class="space-y-35">
        <p>xx xx xx xx xx</p>

        <div class="space-y-15">
          <InputPassword
            v-model="password"
            v-model:password-revealed="passwordRevealed"
            placeholder="xx xx"
            autocomplete="new-password"
            filled
          />

          <InputPassword
            v-model="passwordConfirmation"
            v-model:password-revealed="passwordRevealed"
            placeholder="xx xx"
            autocomplete="confirm-password"
            filled
          />

          <ErrorList v-if="form.meta.value.touched" :errors="errorList" />

          <Button :loading="form.isSubmitting.value" class="w-full">xx</Button>
        </div>
      </div>

      <div class="mb-15 flex justify-center pt-35">
        <RouterLink to="/auth/login" class="underline">xx xx xx</RouterLink>
      </div>
    </form>

    <div v-else class="mt-10 divide-y divide-white divide-opacity-20">
      <p>xx xx xx xx</p>
      <div class="mb-15 mt-30 flex justify-center pt-35">
        <RouterLink to="/auth/login" class="underline">xx xx xx</RouterLink>
      </div>
    </div>
  </AuthWrapper>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { useMutation } from 'vue-query'
import { useRoute, useRouter } from 'vue-router'
import { ref as ruleRef, string } from 'yup'

import { AuthService } from '@/api/modules/auth'
import AuthWrapper from '@/components/AuthWrapper.vue'
import Button from '@/components/Button.vue'
import ErrorList from '@/components/ErrorList.vue'
import InputPassword from '@/components/InputPassword.vue'
import { useAuthValidation } from '@/hooks/useAuthValidation'
import { useValidation } from '@/hooks/useValidation'
import { validateEmail } from '@/utils/validation'

const router = useRouter()
const route = useRoute()

const accountData = computed(() => {
  const { email, token } = route.query
  return { email, token } as { email?: string; token?: string }
})

onBeforeMount(() => {
  const emailIsValid =
    typeof accountData.value.email === 'string' &&
    validateEmail(accountData.value.email)

  if (!emailIsValid || typeof accountData.value.token !== 'string') {
    router.push({ path: '/auth/login', query: undefined })
  }
})

const passwordChanged = ref(false)
const passwordRevealed = ref(false)

const { getPasswordRules } = useAuthValidation()

const rules = {
  password: getPasswordRules(),
  passwordConfirmation: string().oneOf([ruleRef('password')], 'xx xx xx')
}

const { form, useFormField, errorList, onSubmit } = useValidation({
  validationSchema: rules,
  submitCallback: () => updatePassword()
})

const { value: password } = useFormField<string>('password')
const { value: passwordConfirmation } = useFormField<string>(
  'passwordConfirmation'
)

const { mutateAsync: mutateUpdatePassword } = useMutation(
  'resetPassword',
  async () => {
    if (accountData.value.email && accountData.value.token) {
      await AuthService.resetPassword({
        email: accountData.value.email,
        token: accountData.value.token,
        password: password.value,
        password_confirmation: passwordConfirmation.value
      })
    }
  }
)

const updatePassword = async () => {
  await mutateUpdatePassword()
  passwordChanged.value = true
  await router.push('/auth/login')
}
</script>
