---
to: logic/modules/<%= moduleFolder %>/index.ts
---
import { httpClient } from '~/logic/modules/container'
import { <%= name %>Api } from '~/logic/modules/<%= moduleFolder %>/<%= name %>Api'
import { <%= name %>Service } from '~/logic/modules/<%= moduleFolder %>/<%= name %>Service'

export const <%= name %>Module = new <%= name %>Service(
  new <%= name %>Api({ namespace: '<%= endpoint %>', httpClient })
)

// export * from '~/logic/modules/<%= moduleFolder %>/<%= moduleFolder %>.constants'
// export * from '~/logic/modules/<%= moduleFolder %>/<%= moduleFolder %>.types'
