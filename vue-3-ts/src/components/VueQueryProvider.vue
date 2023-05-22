<template>
  <slot></slot>

  <VueQueryDevTools
    v-bind="vueQueryDevToolsProps"
    ref="devtoolsRef"
    @click="saveOpenedState"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQueryProvider } from 'vue-query'
import { VueQueryDevTools } from 'vue-query/devtools'

const LOCAL_STORAGE_OPENED_STATE_KEY = 'vue-query-devtools-opened'

const saveOpenedState = () => {
  localStorage.setItem(
    LOCAL_STORAGE_OPENED_STATE_KEY,
    devtoolsRef.value?.isOpen || ''
  )
}

const devtoolsRef = ref<typeof VueQueryDevTools>()

const vueQueryDevToolsProps: any = {
  toggleButtonProps: {
    style: {
      position: 'absolute',
      top: '28px',
      left: '20px',
      width: '45px',
      height: '45px',
      opacity: '0'
    }
  },

  initialIsOpen: !!localStorage.getItem(LOCAL_STORAGE_OPENED_STATE_KEY),

  closeButtonProps: {
    style: {
      position: 'absolute',
      top: '18px',
      left: '11px',
      width: '45px',
      height: '45px',
      borderRadius: '12px',
      background: '#EA526Fdd',
      color: 'white',
      fontSize: '12px'
    }
  }
}

useQueryProvider()
</script>
