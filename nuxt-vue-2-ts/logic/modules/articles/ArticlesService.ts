import { BaseService } from '~/logic/core/BaseService'
import { _ArticlesApi } from '~/logic/modules/articles/ArticlesApi'

import { GetArticlesOptions } from '.'

export class _ArticlesService extends BaseService<_ArticlesApi> {
  async getIndexPageArticles() {
    const response = await this.api.getArticles({
      page: 1,
      per_page: 4
    })

    if (response.status === 200) {
      return response.data.data
    }
  }

  async getArticles(options: GetArticlesOptions) {
    const response = await this.api.getArticles({
      page: options.page,
      per_page: 9
    })

    if (response.status === 200) {
      return response.data
    }
  }

  async getById(id: number) {
    const response = await this.api.getById({
      id
    })

    if (response.status === 200) {
      return response.data
    }
  }
}
