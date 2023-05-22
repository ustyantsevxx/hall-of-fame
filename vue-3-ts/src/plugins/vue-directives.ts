import { App } from 'vue'

import { ScrollClassDirective } from '@/core/directives/scroll-class'

export const registerGlobalDirectives = (app: App<Element>) => {
  app.directive('scroll-class', ScrollClassDirective)
}
