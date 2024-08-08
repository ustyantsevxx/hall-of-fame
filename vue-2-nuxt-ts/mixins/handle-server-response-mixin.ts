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
        : 'xx xx. xx xx xx xx'
  }

  resetServerValidationMessage() {
    this.serverValidationMessage &&= null
  }
}
