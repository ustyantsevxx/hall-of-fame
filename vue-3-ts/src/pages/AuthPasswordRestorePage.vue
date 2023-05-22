<template>
  <AuthWrapper title="Забыли пароль?">
    <form
      v-if="!sendToEmail"
      class="mt-18 flex min-h-[618px] flex-col justify-between divide-y divide-white divide-opacity-20"
      @submit.prevent="onSubmit"
    >
      <div class="space-y-35">
        <p>Чтобы задать новый пароль, введите Email своего аккаунта xxx</p>

        <div class="space-y-15">
          <Input
            v-model="email"
            label="Email"
            placeholder="Email"
            type="email"
            variant="primary"
            data-test="email"
          />

          <ErrorList v-if="form.meta.value.touched" :errors="errorList" />

          <Button
            class="w-full"
            :loading="form.isSubmitting.value"
            :disabled="email === ''"
            :title="email === '' ? 'Введите email' : ''"
            data-test="submit-button"
          >
            Сбросить пароль
          </Button>
        </div>
      </div>

      <div class="mb-15 flex justify-center pt-35">
        <RouterLink to="/auth/login" class="underline">
          Войти в систему
        </RouterLink>
      </div>
    </form>

    <div v-else class="mt-10 divide-y divide-white divide-opacity-20">
      <p class="text-[15px] leading-[18px]">
        Ссылка для восстановления пароля отправлена
        <br />
        на ваш Email
      </p>

      <div class="mb-15 mt-30 flex justify-center pt-35">
        <RouterLink to="/auth/login" class="underline">
          Войти в систему
        </RouterLink>
      </div>
    </div>
  </AuthWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMutation } from 'vue-query'
import { useRoute } from 'vue-router'
import { string } from 'yup'

import { AuthService } from '@/api/modules/auth'
import AuthWrapper from '@/components/AuthWrapper.vue'
import Button from '@/components/Button.vue'
import ErrorList from '@/components/ErrorList.vue'
import Input from '@/components/Input.vue'
import { useValidation } from '@/hooks/useValidation'

const route = useRoute()

const sendToEmail = ref(false)

const { form, useFormField, onSubmit, errorList } = useValidation({
  validationSchema: {
    email: string()
      .email('Некорректный "E-mail"')
      .required('Вы не ввели "E-mail"')
  },
  submitCallback: () => restorePassword()
})
const { value: email } = useFormField<string>('email', {
  initialValue: (route.query.email as string) ?? ''
})

const { mutateAsync: restorePasswordMutation } = useMutation(
  'restorePassword',
  (email: string) => AuthService.restorePassword({ email })
)

const restorePassword = async () => {
  await restorePasswordMutation(email.value)

  sendToEmail.value = true
}
</script>
