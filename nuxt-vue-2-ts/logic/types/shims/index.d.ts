import 'vue-js-modal/types'

import { Toasted } from 'vue-toasted'

import { accessorType } from '~/store'

declare module 'vue/types/vue' {
  interface Vue {
    $accessor: typeof accessorType
    $toasted: Toasted
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $accessor: typeof accessorType
  }

  interface Context {
    $accessor: typeof accessorType
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  interface Store<S> {
    $accessor: typeof accessorType
  }
}
