import { BaseApi } from '~/logic/core/BaseApi'
import {
  Article,
  ArticlesIndexRequestParams,
  ArticlesIndexResponse,
  ArticlesShowRequestParams
} from '~/logic/modules/articles'

export class _ArticlesApi extends BaseApi {
  getArticles(options: ArticlesIndexRequestParams) {
    return this.get<ArticlesIndexResponse>('index', options)
  }

  getById(options: ArticlesShowRequestParams) {
    return this.get<Article>('show', options)
  }
}
