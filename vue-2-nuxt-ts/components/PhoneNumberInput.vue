<template>
  <input
    type="tel"
    name="phone"
    placeholder="Номер телефона"
    @input="onPhoneInput"
    @keydown="onPhoneKeyDown"
    @paste="onPhonePaste"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import InputDefault from '~/components/InputDefault.vue'

@Component({
  components: {
    InputDefault
  }
})
export default class Link extends Vue {
  phone = ''

  getInputNumbersValue(input) {
    // Return stripped input value — just numbers
    return input.value.replace(/\D/g, '')
  }

  onPhonePaste(e) {
    const input = e.target
    const inputNumbersValue = this.getInputNumbersValue(input)
    const pasted = e.clipboardData || (window as any)?.clipboardData
    if (pasted) {
      const pastedText = pasted.getData('Text')
      if (/\D/g.test(pastedText)) {
        // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
        // formatting will be in onPhoneInput handler
        input.value = inputNumbersValue
      }
    }
  }

  onPhoneInput(e) {
    const input = e.target
    let inputNumbersValue = this.getInputNumbersValue(input)
    const selectionStart = input.selectionStart
    let formattedInputValue = ''

    if (!inputNumbersValue) {
      return (input.value = '')
    }

    if (input.value.length !== selectionStart) {
      // Editing in the middle of input, not last symbol
      if (e.data && /\D/g.test(e.data)) {
        // Attempt to input non-numeric symbol
        input.value = inputNumbersValue
      }
      return
    }

    if (['7', '8', '9'].includes(inputNumbersValue[0])) {
      if (inputNumbersValue[0] === '9') {
        inputNumbersValue = '7' + inputNumbersValue
      }
      const firstSymbols = inputNumbersValue[0] === '8' ? '8' : '+7'
      formattedInputValue = input.value = firstSymbols + ' '
      if (inputNumbersValue.length > 1) {
        formattedInputValue += '(' + inputNumbersValue.slice(1, 4)
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ') ' + inputNumbersValue.slice(4, 7)
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += '-' + inputNumbersValue.slice(7, 9)
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += '-' + inputNumbersValue.slice(9, 11)
      }
    } else {
      formattedInputValue = '+' + inputNumbersValue.slice(0, 16)
    }
    input.value = formattedInputValue
  }

  onPhoneKeyDown(e) {
    // Clear input after remove last symbol
    const inputValue = e.target.value.replace(/\D/g, '')
    if (e.keyCode === 8 && inputValue.length === 1) {
      e.target.value = ''
    }
  }
}
</script>
