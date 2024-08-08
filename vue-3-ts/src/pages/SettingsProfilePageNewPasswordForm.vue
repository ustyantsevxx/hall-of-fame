<template>
  <form @submit.prevent="submit">
    <div class="text-medium-15">xx xx</div>

    <Input
      v-model="currentPassword"
      :invalid="formMeta.touched && !!currentPasswordError"
      placeholder="xx xx"
      type="password"
      autocomplete="current-password"
      class="mt-12"
    />
    <Input
      v-model="newPassword"
      :invalid="formMeta.touched && !!newPasswordError"
      placeholder="xx xx"
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
      <span>xx</span>
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
  currentPassword: string().required('xx xx xx xx xx'),
  newPassword: string()
    .test(
      'onlyAllowedSymbols',
      'xx xx xx xx xx xx xx xx',
      (value: string | undefined) => AuthService.validatePassword(value || '')
    )
    .min(8, 'xx xx xx xx 8 xx')
    .max(20, 'xx xx xx xx 20 xx')
    .required('xx xx xx xx xx')
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
    // TODO xx xx xx xx
    await savePassword()
  } catch {
    actions.setFieldError('newPassword', 'xx-xx xx xx xx')
  }
})
</script>
