<template>
  <ModalBase ref="modal" width="496px">
    <p class="mb-8 text-blue">
      Для восстановления пароля обратитесь в службу поддержки
      <a :href="supportPhoneLink" class="">{{ SUPPORT_PHONE.DISPLAYED }}</a>
    </p>
    <p class="mb-57 text-description text-black opacity-50">
      Будьте готовы назвать ИНН, название организации и номер договора с XXX
    </p>

    <Button gradient size="sm" @click="hide">Понятно</Button>
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
