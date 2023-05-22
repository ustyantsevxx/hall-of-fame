import { NuxtOptionsRouter, NuxtRouteConfig } from '@nuxt/types/config/router'
import Vue from 'vue'
import type { NavigationGuard } from 'vue-router'
import Router from 'vue-router'

import { STRATEGIES } from '~/plugins/nuxt-auth'

Vue.use(Router)

const parseCookie = rawCookie => {
  const list = {}
  for (const cookie of rawCookie.split(';')) {
    const parts = cookie.split('=')
    list[parts.shift().trim()] = decodeURI(parts.join('='))
  }

  return list
}

const getDomainRoutes = (domain: string, defaultRoutes: NuxtRouteConfig[]) => {
  const domainRegex = new RegExp(`^${domain}.*`)

  const domainRoutes = defaultRoutes.filter(
    r => r.name && domainRegex.test(r.path)
  )
  return domainRoutes.map(r => ({ ...r, path: r.path.replace(domain, '') }))
}

const filterRoutesByAuthStrategy = (
  routes: NuxtRouteConfig[],
  strategy: string | undefined
) => {
  if (strategy === STRATEGIES.LEGAL || strategy === STRATEGIES.LEGAL_BY_TOKEN) {
    return [
      ...getDomainRoutes('/general', routes),
      ...getDomainRoutes('/legal', routes)
    ]
  }

  return [
    ...getDomainRoutes('/general', routes),
    ...getDomainRoutes('/individual', routes)
  ]
}

const routerTrailingSlash: NavigationGuard = (to, _from, next) => {
  const path = to.path
  const fullPath = to.fullPath

  if (
    path.length !== 1 &&
    fullPath.length !== 1 &&
    (path[path.length - 1] === '/' || fullPath[fullPath.length - 1] === '/')
  ) {
    const resultObj: any = {
      ...to,
      path: path.slice(0, Math.max(0, path.length - 1)),
      fullPath: fullPath.slice(0, Math.max(0, fullPath.length - 1))
    }
    return next(resultObj)
  }
  next()
}

export const createRouter = (
  ssrContext: any,
  createDefaultRouter,
  routerOptions: NuxtOptionsRouter
) => {
  const options =
    routerOptions ||
    (createDefaultRouter(ssrContext).options as NuxtOptionsRouter)

  const cookie = document.cookie
  const authStrategy = parseCookie(cookie || '')['auth.strategy'] as string

  const router = new Router({
    ...options,
    routes: filterRoutesByAuthStrategy(options?.routes as any, authStrategy)
  })

  router.beforeResolve(routerTrailingSlash)

  return router
}
