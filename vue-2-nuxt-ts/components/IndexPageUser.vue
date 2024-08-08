<template>
  <section class="py-33 px-30 bg-light-blue bg-opacity-20 rounded-20 user-card">
    <p class="text-h2">{{ fullName }}</p>

    <div class="mt-29 space-y-6">
      <p class="block text-black text-opacity-50">
        xx xx: {{ dateOfBirthFormatted }}
      </p>
      <p class="block text-black text-opacity-50">
        xx: {{ phoneFormatted }}
      </p>
    </div>

    <div class="flex mt-33 space-x-21">
      <Link button to="/profile" class="px-20">xx</Link>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import Button from '~/components/Button.vue'
import Link from '~/components/Link.vue'
import { xDayjs } from '~/logic/utils/datetime'
import { formatPhone } from '~/logic/utils/phone'

@Component({
  components: {
    Button,
    Link
  }
})
export default class IndexPageUser extends Vue {
  get user() {
    return this.$auth.user
  }

  get fullName() {
    return this.$accessor?.fullName ?? '—'
  }

  get dateOfBirthFormatted() {
    return this.user?.birth_at
      ? xDayjs.unix(this.user?.birth_at as number).format('DD MMMM YYYY')
      : '—'
  }

  get phoneFormatted() {
    return this.user?.phone ? formatPhone(this.user.phone as string) : '—'
  }

  async logout() {
    await this.$auth.logout()
  }
}
</script>

<style>
.user-card {
  min-height: 320px;
}
</style>
