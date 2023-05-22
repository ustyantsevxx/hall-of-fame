<template>
  <form @submit.prevent="form.$handleSubmit(submitUsingSubmitFn)">
    <AppFormGroup no-label :error-message="form.login.errorMessage">
      <!-- eslint-disable-next-line vuejs-accessibility/tabindex-no-positive -->
      <AppInput
        v-model="form.login.value"
        clearable
        :tabindex="1"
        enterkeyhint="send"
        :invalid="form.login.invalid"
        :placeholder="$t('login')"
      />
    </AppFormGroup>

    <AppFormGroup
      class="mt-8"
      no-label
      :error-message="form.password.errorMessage"
    >
      <!-- eslint-disable-next-line vuejs-accessibility/tabindex-no-positive -->
      <InputPassword
        v-model="form.password.value"
        enterkeyhint="send"
        :tabindex="2"
        clearable
        :invalid="form.password.invalid"
        :placeholder="$t('password')"
      />
    </AppFormGroup>

    <!-- eslint-disable-next-line vuejs-accessibility/tabindex-no-positive -->
    <AppButton
      class="mt-16 w-full"
      type="submit"
      :tabindex="3"
      :loading="form.$loading"
      :disabled="form.$anyError"
    >
      {{ $t('log-in') }}
    </AppButton>
  </form>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

import AppButton from '~/components/AppButton.vue'
import AppFormGroup from '~/components/AppFormGroup.vue'
import AppInput from '~/components/AppInput.vue'
import InputPassword from '~/components/InputPassword.vue'
import { FormMixin } from '~/logic/vue/mixins/form-mixin'

export default {
  components: {
    AppInput,
    AppButton,
    InputPassword,
    AppFormGroup
  },

  mixins: [
    FormMixin(
      function () {
        return {
          login: {
            initialValue: '',
            rules: [required]
          },
          password: {
            initialValue: '',
            rules: [required]
          }
        }
      },
      { continueLoadingOnSuccess: true }
    )
  ],

  props: {
    submitFn: { type: Function, required: true }
  },

  methods: {
    submitUsingSubmitFn() {
      return this.submitFn({
        login: this.form.login.value,
        password: this.form.password.value
      })
    }
  }
}
</script>
