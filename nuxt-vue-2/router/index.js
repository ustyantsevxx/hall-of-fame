import Vue from 'vue'
import Router from 'vue-router'

import { CURRENT_ROLE, ROLES } from '~/logic/core/runtime'

Vue.use(Router)

const getDomainRoutes = (domain, defaultRoutes) => {
  const domainRegex = new RegExp(`^${domain}.*`)
  const domainRoutes = defaultRoutes.filter(
    route => route.name && domainRegex.test(route.path)
  )

  return domainRoutes.map(route => ({
    ...route,
    path: route.path.replace(domain, '')
  }))
}

export const createRouter = (
  ssrContext,
  createDefaultRouter,
  routerOptions
) => {
  const options = routerOptions || createDefaultRouter(ssrContext).options

  const sharedRoutes = getDomainRoutes('/shared', options.routes)

  const routesByRole =
    CURRENT_ROLE === ROLES.ENGINEER
      ? getDomainRoutes('/engineer', options.routes)
      : getDomainRoutes('/customer', options.routes)

  return new Router({
    ...options,
    routes: [...sharedRoutes, ...routesByRole]
  })
}
