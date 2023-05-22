import { Component, Vue } from 'nuxt-property-decorator'

@Component
export class ShowToastMessageMixin extends Vue {
  showToastMessage(
    message: string,
    options?: {
      duration?: number
    }
  ) {
    this.$toasted.show(message, {
      containerClass: 'top-20 right-30',
      className: 'rounded-10',
      closeOnSwipe: true,
      duration: options?.duration || 3000
    })
  }
}
