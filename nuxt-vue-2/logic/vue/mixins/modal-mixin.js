/** Use this mixin to create custom modals based on the `AppModal` component.
 * @param appModalRef {string} - Ref of the `AppModal` component.
 */
export const ModalMixin = appModalRef => ({
  methods: {
    close(result) {
      return this.$refs[appModalRef].close(result)
    },

    open() {
      return this.$refs[appModalRef].open()
    }
  }
})
