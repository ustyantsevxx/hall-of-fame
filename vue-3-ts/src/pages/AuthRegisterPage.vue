<template>
  <AuthWrapper title="xx">
    <form v-if="!registered" class="mt-25" @submit.prevent="onSubmit">
      <AuthLoginPageSocialButtons />

      <AuthLoginPageDivider class="mt-34 mb-32 h-1 bg-white/20" />

      <div>
        <div class="space-y-15">
          <Input
            :model-value="email"
            :invalid="emailInvalid"
            label="Email"
            placeholder="Email"
            type="email"
            variant="primary"
            data-test="email-input"
            @update:model-value="updateEmailDebounced"
          />

          <InputPassword
            v-model="password"
            :invalid="passwordInvalid"
            placeholder="xx"
            autocomplete="new-password"
            variant="primary"
            data-test="password-input"
          />

          <ErrorList v-if="form.meta.value.touched" :errors="errorList" />

          <Button
            :loading="form.isSubmitting.value || registered"
            :disabled="!submitAllowed"
            class="w-full"
            data-test="submit-button"
          >
            xx
          </Button>

          <p class="!font-sans text-[15px] leading-[18px] text-white/80">
            xx «xx xx Facebook/Google/Apple/Email», xx&nbsp;xx xx&nbsp;
            <RouterLink to="#" class="underline">xx xx</RouterLink>
            xx&nbsp;
            <RouterLink to="#" class="underline">xx xx xx</RouterLink>
          </p>
        </div>
      </div>

      <div class="mb-15 flex justify-center pt-35">
        <p>xx xx?</p>
        &nbsp;
        <RouterLink to="/auth/login" class="underline">xx xx xx</RouterLink>
      </div>
    </form>

    <div v-else class="mt-10 divide-y divide-white divide-opacity-20">
      <p class="text-[15px] leading-[18px]">
        xx xx xx xx xx
        <br />
        xx xx Email
      </p>

      <div class="mb-15 mt-30 flex justify-center pt-35">
        <RouterLink to="/auth/login" class="underline">xx xx xx</RouterLink>
      </div>
    </div>
  </AuthWrapper>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/shared'
import { computed, ref } from 'vue'

import { AuthService } from '@/api/modules/auth'
import AuthWrapper from '@/components/AuthWrapper.vue'
import Button from '@/components/Button.vue'
import ErrorList from '@/components/ErrorList.vue'
import Input from '@/components/Input.vue'
import InputPassword from '@/components/InputPassword.vue'
import { useAuthValidation } from '@/hooks/useAuthValidation'
import { useValidation } from '@/hooks/useValidation'
import AuthLoginPageSocialButtons from '@/pages/AuthLoginPageSocialButtons.vue'
import AuthLoginPageDivider from '@/pages/AuthPageDivider.vue'

const registered = ref(false)

const { getPasswordRules, getEmailForRegistrationRules } = useAuthValidation()

const rules = {
  email: getEmailForRegistrationRules(),
  password: getPasswordRules()
}

const { form, useFormField, onSubmit, errorList } = useValidation({
  validationSchema: rules,
  submitCallback: async () => {
    const user = await AuthService.signUp({
      email: email.value,
      password: password.value
    })
    if (user) {
      registered.value = true
    }
  }
})

const { value: email, invalid: emailInvalid } = useFormField<string>('email')
const { value: password, invalid: passwordInvalid } =
  useFormField<string>('password')

const updateEmailDebounced = useDebounceFn(value => {
  email.value = value
}, 300)

const submitAllowed = computed(() => {
  return email.value !== '' && password.value !== ''
})
</script>
