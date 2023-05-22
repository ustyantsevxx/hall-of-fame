import { Component, Vue } from 'nuxt-property-decorator'

@Component
export class HandleServerResponseMixin extends Vue {
  serverValidationMessage: string | null = null

  get errorMessage() {
    if (this.serverValidationMessage) {
      return this.serverValidationMessage
    }
    return null
  }

  handleServerError(error: { status: number; message: string }) {
    this.serverValidationMessage =
      error.status !== 500
        ? error.message
        : 'Произошла ошибка. Обратитесь в службу поддержки'
  }

  resetServerValidationMessage() {
    this.serverValidationMessage &&= null
  }
}
