<template>
  <main class="container">
    <div class="flex justify-between mt-40">
      <h1 class="self-center text-h1">xx xx</h1>
      <Link headless :href="MAIN_WEBSITE_LINK" title="XXX xx xx">
        <LogoSVG />
      </Link>
    </div>

    <p class="text-subtitle" style="width: 730px">
      xx xx xx xx xx xx xx xx xx xx xx
      xx xx. xx xx:
    </p>

    <div class="flex justify-between mt-48" style="width: 880px">
      <NuxtLink to="/login/individual" class="mr-33">
        <CardAuth class="hover:bg-purple border-purple" style="width: 415px">
          <template #image>
            <IndividualSVG
              class="text-purple group-hover:text-white transition-colors"
            />
          </template>

          <template #title>
            <span class="text-purple group-hover:text-white transition-colors">
              xx xx
            </span>
          </template>

          <template #description>
            xx xx xx xx xx xx xx xx
          </template>
        </CardAuth>
      </NuxtLink>

      <NuxtLink to="/login/legal">
        <CardAuth class="hover:bg-blue border-blue">
          <template #image>
            <LegalPersonSVG
              class="text-blue group-hover:text-white transition-colors"
            />
          </template>

          <template #title>
            <span class="text-blue group-hover:text-white transition-colors">
              xx xx
            </span>
          </template>

          <template #description>
            xx xx xx xx xx
          </template>
        </CardAuth>
      </NuxtLink>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import IndividualSVG from '~/assets/svg/login/individual.svg'
import LegalPersonSVG from '~/assets/svg/login/legal-person.svg'
import LogoSVG from '~/assets/svg/login/logo.svg'
import CardAuth from '~/components/CardAuth.vue'
import Link from '~/components/Link.vue'
import LoginPageCodeForm from '~/components/LoginPageCodeForm.vue'
import LoginPagePhoneForm from '~/components/LoginPagePhoneForm.vue'
import { MAIN_WEBSITE_LINK } from '~/logic/constants'

@Component({
  components: {
    CardAuth,
    Link,
    PhoneForm: LoginPagePhoneForm,
    CodeForm: LoginPageCodeForm,
    LogoSVG,
    IndividualSVG,
    LegalPersonSVG
  },

  head: {
    title: 'xx'
  },

  auth: 'guest',
  layout: 'footer-only',

  // TODO: delete redirect when INDIVIDUAL user version is done
  middleware({ redirect }) {
    return redirect('/login/legal')
  }
})
export default class LoginIndexPage extends Vue {
  MAIN_WEBSITE_LINK = MAIN_WEBSITE_LINK
}
</script>
