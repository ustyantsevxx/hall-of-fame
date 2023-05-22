<template>
  <header
    class="sticky inset-x-0 top-0 z-40 bg-light sm:static sm:h-auto sm:bg-transparent"
    :class="{ 'h-85': !hideMobileNavigation }"
  >
    <div>
      <div class="flex justify-between px-16 py-8 sm:p-0">
        <NuxtLink to="/" class="rounded-8">
          <figure class="h-32 w-32 select-none sm:h-72 sm:w-72">
            <img
              class="logo"
              width="100%"
              height="100%"
              src="~assets/images/logo.png"
              :alt="$t('logo')"
            />
          </figure>
        </NuxtLink>

        <div
          class="flex items-center justify-between bg-light sm:ml-12 sm:w-full sm:rounded-8"
        >
          <LinksNavigation
            class="ml-48 hidden h-full sm:block"
            link-class="pt-24"
            :links="links"
          >
            <template #logsLink="{ linkText }">
              <span class="flex items-center space-x-8">
                <span>{{ linkText }}</span>
                <span
                  v-if="completedTraceRequestsCount > 0"
                  v-tooltip="
                    $t('trace-requests-completed-count', {
                      count: completedTraceRequestsCount
                    })
                  "
                  class="rounded-4 bg-green px-4 pt-3 pb-2 text-light text-h3"
                >
                  {{ completedTraceRequestsCount }}
                </span>
              </span>
            </template>
          </LinksNavigation>

          <div class="flex items-center space-x-16 sm:mr-32">
            <p class="text-main sm:text-navigation">
              {{ userName }}
            </p>
            <ButtonIcon
              :title="$t('logout')"
              class="border p-3 sm:p-5"
              @click="logout"
            >
              <SVGIcon24SignOut />
            </ButtonIcon>
          </div>
        </div>
      </div>

      <LinksNavigation
        v-if="!hideMobileNavigation"
        class="border-y border-light-full sm:hidden"
        :links="links"
      />
    </div>

    <ModalConfirm
      ref="logoutModal"
      :title="$t('confirm-logout')"
      :subtitle="$t('you-really-want-to-logout-from-your-account')"
      :confirm-text="$t('logout-0')"
    />
  </header>
</template>

<script>
import ButtonIcon from '~/components/ButtonIcon.vue'
import LinksNavigation from '~/components/LinksNavigation.vue'
import ModalConfirm from '~/components/ModalConfirm.vue'
import { CustomersService } from '~/logic/modules/customers/customers.service'

export default {
  components: {
    ButtonIcon,
    LinksNavigation,
    ModalConfirm
  },

  props: {
    links: { type: Array, default: () => [] },
    hideMobileNavigation: { type: Boolean, default: false }
  },

  computed: {
    userName() {
      return CustomersService.formatCustomerName(this.$auth.user)
    },

    completedTraceRequestsCount() {
      return this.$store.state.completedTraceRequestsCount
    }
  },

  methods: {
    async logout() {
      const confirmed = await this.$refs.logoutModal.open()
      if (confirmed) {
        await this.$auth.logout()
        await this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>
.logo {
  max-width: 72px;
  max-height: 72px;
}
</style>
