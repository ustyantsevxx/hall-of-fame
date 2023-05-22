<template>
  <form @submit.prevent="submit">
    <div class="text-medium-15">Изменить пароль</div>

    <Input
      v-model="currentPassword"
      :invalid="formMeta.touched && !!currentPasswordError"
      placeholder="Старый пароль"
      type="password"
      autocomplete="current-password"
      class="mt-12"
    />
    <Input
      v-model="newPassword"
      :invalid="formMeta.touched && !!newPasswordError"
      placeholder="Новый пароль"
      type="password"
      autocomplete="new-password"
      class="mt-10"
    />

    <ErrorList v-if="formMeta.touched" :errors="errorList" class="mt-10" />

    <Button
      variant="primary"
      class="mt-20 !px-50 laptop:!px-60 laptop:!py-8"
      :loading="isSubmitting"
      :disabled="buttonDisabled"
    >
      <span>Сохранить</span>
    </Button>
  </form>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { computed } from 'vue'
import { object, string } from 'yup'

import { AuthService } from '@/api/modules/auth'
import Button from '@/components/Button.vue'
import ErrorList from '@/components/ErrorList.vue'
import Input from '@/components/Input.vue'

const schema = object({
  currentPassword: string().required('Вы не ввели старый пароль'),
  newPassword: string()
    .test(
      'onlyAllowedSymbols',
      'Пароль может содержать только латинские буквы и спецсимволы',
      (value: string | undefined) => AuthService.validatePassword(value || '')
    )
    .min(8, 'Минимальная длина нового пароля 8 символов')
    .max(20, 'Максимальная длина нового пароля 20 символов')
    .required('Вы не ввели новый пароль')
})

const {
  errors,
  validate,
  handleSubmit,
  isSubmitting,
  meta: formMeta
} = useForm({
  validationSchema: schema
})

const { value: currentPassword, errorMessage: currentPasswordError } =
  useField<string>('currentPassword')
const { value: newPassword, errorMessage: newPasswordError } =
  useField<string>('newPassword')

const savePassword = async () =>
  AuthService.changePassword({
    password: currentPassword.value,
    password_confirmation: newPassword.value
  })

const errorList = computed(() => Object.values(errors.value))
const buttonDisabled = computed(() => {
  return !currentPassword.value || !newPassword.value
})

const submit = handleSubmit(async (values, actions) => {
  const { valid } = await validate()
  if (!valid) {
    return
  }

  try {
    // TODO проверить когда сделают бэк
    await savePassword()
  } catch {
    actions.setFieldError('newPassword', 'Что-то пошло не так')
  }
})
</script>
