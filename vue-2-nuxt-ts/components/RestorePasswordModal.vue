<template>
  <ModalBase ref="modal" width="496px">
    <p class="mb-8 text-blue">
      xx xx xx xx xx xx xx
      <a :href="supportPhoneLink" class="">{{ SUPPORT_PHONE.DISPLAYED }}</a>
    </p>
    <p class="mb-57 text-description text-black opacity-50">
      xx xx xx xx, xx xx xx xx xx xx XXX
    </p>

    <Button gradient size="sm" @click="hide">xx</Button>
  </ModalBase>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import Button from '~/components/Button.vue'
import ModalBase from '~/components/ModalBase.vue'
import { SUPPORT_PHONE } from '~/logic/constants'

@Component({
  components: {
    ModalBase,
    Button
  }
})
export default class RestorePasswordModal extends Vue {
  SUPPORT_PHONE = SUPPORT_PHONE

  get supportPhoneLink() {
    return `tel:${SUPPORT_PHONE.PHONE}`
  }

  get modalRef(): ModalBase {
    return this.$refs.modal as ModalBase
  }

  show() {
    this.modalRef.show()
  }

  hide() {
    this.modalRef.hide()
  }
}
</script>
