<template>
  <main class="container">
    <section class="flex justify-between mt-22">
      <div>
        <Link to="/support" class="flex items-center space-x-10 w-max">
          <SlimArrowRightSVG />
          <span>Служба поддержки</span>
        </Link>
        <h1 class="mt-25 text-h1">Обращение №{{ request.id }}</h1>
        <p class="mt-30 text-gray">
          <template v-if="request.station">
            {{ request.station.name }} ({{ request.station.address }})
          </template>
          <template v-else>Адрес АЗС не указан</template>
        </p>
      </div>

      <div>
        <SupportRequestStatusBadge
          v-slot="{ statusName }"
          :status-id="request.status.id"
          class="px-20 pt-12 pb-13 rounded-25"
        >
          {{ `${statusName} обращение` }}
        </SupportRequestStatusBadge>
      </div>
    </section>

    <section class="mt-63">
      <SupportChat :chat="request.chat" />
    </section>
  </main>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'

import ClipAngleSVG from '~/assets/svg/clip-angle.svg'
import SlimArrowRightSVG from '~/assets/svg/index/slim-arrow-left.svg'
import Button from '~/components/Button.vue'
import ChatMessageBox from '~/components/ChatMessageBox.vue'
import InputFile from '~/components/InputFile.vue'
import InputSelect from '~/components/InputSelect.vue'
import InputTextarea from '~/components/InputTextarea.vue'
import Link from '~/components/Link.vue'
import SupportChat from '~/components/SupportChat.vue'
import SupportRequestStatusBadge from '~/components/SupportRequestStatusBadge.vue'
import {
  Request,
  TechnicalSupportModule
} from '~/logic/modules/technical-support'

@Component({
  components: {
    SupportChat,
    ChatMessageBox,
    SupportRequestStatusBadge,
    InputFile,
    Button,
    InputTextarea,
    InputSelect,
    Link,
    SlimArrowRightSVG,
    ClipAngleSVG
  }
})
export default class extends Vue {
  request!: Request

  head() {
    return {
      title: `Обращение №${this.request?.id}` ?? undefined
    }
  }

  async asyncData({ route, error }: Context) {
    const throw404 = () => error({ statusCode: 404 })

    const requestId = +route.params.id

    if (Number.isNaN(requestId)) {
      return throw404()
    }

    const request = await TechnicalSupportModule.getRequestById(requestId)

    if (!request) {
      return throw404()
    }

    return {
      request
    }
  }
}
</script>
