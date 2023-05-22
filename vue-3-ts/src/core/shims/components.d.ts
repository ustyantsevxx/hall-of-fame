declare module 'vue' {
  // monkey-patch missing `PluginFunction` to help `vue-masonry` pass ts-compile
  export type PluginFunction<_T> = (app: any, ...options: any[]) => any

  export type GlobalComponents = {
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
  }
}

export {}
