import { _ArticlesApi } from '~/logic/modules/articles/ArticlesApi'
import { _ArticlesService } from '~/logic/modules/articles/ArticlesService'
import { httpClient } from '~/logic/modules/container'

export const ArticlesModule = new _ArticlesService(
  new _ArticlesApi({ namespace: 'api/v1/stocks', httpClient })
)

export * from '~/logic/modules/articles/articles.types'
