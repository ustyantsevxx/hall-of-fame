<template>
  <div class="flex h-full flex-col items-center justify-center pt-32 sm:pt-44">
    <div
      class="relative flex w-full flex-col items-center rounded-8 bg-light py-48 px-16 sm:w-[416px] sm:px-48 sm:pt-68"
    >
      <figure class="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
        <img
          src="~assets/images/logo.png"
          class="w-64 sm:w-88"
          :alt="$t('logo-0')"
        />
      </figure>

      <h1 class="mb-32 text-h1">{{ $t('log-in-system') }}</h1>
      <LoginPageForm class="w-full" :submit-fn="submit" />
    </div>
  </div>
</template>

<script>
import LoginPageForm from '~/components/LoginPageForm.vue'
import { STRATEGIES } from '~/plugins/nuxt/auth'

export default {
  components: {
    LoginPageForm
  },

  middleware: 'guest-only',

  head() {
    return {
      title: this.$t('log-in-0')
    }
  },

  methods: {
    async submit({ login, password }) {
      try {
        await this.$auth.loginWith(STRATEGIES.LOCAL, {
          data: {
            login,
            password
          }
        })

        if (this.$auth.loggedIn) {
          await this.$store.dispatch('fetchAuthenticatedUserData')
          await this.$router.push(this.$route.query.next ?? '/')
          return { success: true }
        }
      } catch (error) {
        if (error.response.status === 422) {
          return { success: false, errors: error.response.data.errors }
        }
      }
    }
  }
}
</script>
