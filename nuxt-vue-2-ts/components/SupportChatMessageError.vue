<template>
  <div class="flex items-center space-x-10">
    <button
      type="button"
      class="flex items-center"
      @click="toggleActionsVisible"
    >
      <ErrorCircledSVG />
      <span class="ml-10 text-description text-red">
        {{
          actionsVisible
            ? 'Сообщение не отправлено:'
            : 'Сообщение не отправлено'
        }}
      </span>
    </button>

    <div v-if="actionsVisible">
      <button
        class="py-2 px-10 text-description text-blue rounded-18 border border-blue"
        @click="deleteErroredMessage"
      >
        Удалить
      </button>
      <button
        class="py-2 px-10 text-description text-blue rounded-18 border border-blue"
        @click="sendErroredAgain"
      >
        Повторить отправку
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import ErrorCircledSVG from '~/assets/svg/error-circled.svg'

@Component({
  components: {
    ErrorCircledSVG
  }
})
export default class SupportChatMessageError extends Vue {
  actionsVisible = false

  toggleActionsVisible() {
    this.actionsVisible = !this.actionsVisible
  }

  deleteErroredMessage() {
    this.actionsVisible = false
    this.$emit('delete')
  }

  sendErroredAgain() {
    this.actionsVisible = false
    this.$emit('send-again')
  }
}
</script>
