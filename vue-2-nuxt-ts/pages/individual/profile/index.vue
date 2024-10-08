<template>
  <main class="container">
    <PageHeader>
      <template #title>xx xx</template>
      <template #subtitle>
        xx xx xx xx, xx xx xx. xx xx xx
        xx xx xx xx xx xx
        <Link to="/support">xx xx.</Link>
      </template>
    </PageHeader>

    <section class="mt-78">
      <form @submit.prevent="submit">
        <div class="grid grid-cols-3 gap-x-30 gap-y-34">
          <InputDefault
            v-model="$v.editData.firstName.$model"
            label="xx"
            :invalid="$v.editData.firstName.$error"
          />
          <InputDefault
            v-model="$v.editData.lastName.$model"
            label="xx"
            :invalid="$v.editData.lastName.$error"
          />
          <InputDefault v-model="editData.patronymic" label="xx" />

          <div>
            <p class="mb-3 text-description text-gray">xx</p>
            <p class="text-subtitle">{{ phoneFormatted }}</p>
          </div>

          <div>
            <p class="mb-3 text-description text-gray">xx xx</p>
            <p>{{ dateOfBirthFormatted }}</p>
          </div>
        </div>

        <Button gradient class="mt-92" :disabled="!submitAvailable">
          xx
        </Button>
      </form>
    </section>
  </main>
</template>

<script lang="ts">
import { isEqual } from 'lodash-es'
import { Component, Vue } from 'nuxt-property-decorator'
import { required } from 'vuelidate/lib/validators'

import Button from '~/components/Button.vue'
import InputDefault from '~/components/InputDefault.vue'
import Link from '~/components/Link.vue'
import PageHeader from '~/components/PageHeader.vue'
import { Users } from '~/logic/modules/users'
import { xDayjs } from '~/logic/utils/datetime'
import { formatPhone } from '~/logic/utils/phone'

@Component({
  components: {
    Link,
    Button,
    InputDefault,
    PageHeader
  },

  head: {
    title: 'xx xx'
  },

  validations: {
    editData: {
      firstName: { required },
      lastName: { required }
    }
  }
})
export default class extends Vue {
  editData = {
    firstName: '',
    lastName: '',
    patronymic: ''
  }

  copiedUserData = {}

  created() {
    this.editData.firstName = this.user?.first_name as string
    this.editData.lastName = this.user?.last_name as string
    this.editData.patronymic = (this.user?.patronymic as string) ?? ''
    this.copyUserData()
  }

  get user() {
    return this.$auth.user
  }

  get phoneFormatted() {
    return this.user?.phone ? formatPhone(this.user.phone as string) : '—'
  }

  get dateOfBirthFormatted() {
    return this.user?.birth_at
      ? xDayjs.unix(this.user?.birth_at as number).format('DD MMMM YYYY')
      : '—'
  }

  get copiedDataEqualsActual() {
    return isEqual(this.editData, this.copiedUserData)
  }

  get submitAvailable() {
    return !this.copiedDataEqualsActual && !this.$v.$invalid
  }

  copyUserData() {
    this.copiedUserData = { ...this.editData }
  }

  async submit() {
    const { success, user } = await Users.updateProfile({
      firstName: this.editData.firstName,
      lastName: this.editData.lastName,
      patronymic: this.editData.patronymic
    })

    if (success) {
      this.$auth.setUser(user)
      this.copyUserData()
    }
  }
}
</script>
