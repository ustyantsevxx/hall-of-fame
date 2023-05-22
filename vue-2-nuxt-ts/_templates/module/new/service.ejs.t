---
to: logic/modules/<%= moduleFolder %>/<%= name %>Service.ts
---
import { BaseService } from '~/logic/core/BaseService'
import { <%= name %>Api } from '~/logic/modules/<%= moduleFolder %>/<%= name %>Api'

export class <%= name %>Service extends BaseService<<%= name %>Api> {}
