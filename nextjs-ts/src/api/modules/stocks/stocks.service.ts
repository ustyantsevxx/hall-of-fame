import { BaseService } from '../../shared/base.service'
import { Stock, StocksPaginatedResponse } from './stocks.types'

class StocksServiceClass extends BaseService {
  async getPaginatedStocks({ page }: { page: number }) {
    const { data: stocksPaginatedResponse } =
      await this.axios.get<StocksPaginatedResponse>(this.getPath('index'), {
        params: { page, per_page: 6 }
      })

    return stocksPaginatedResponse
  }

  async getStock(id: number) {
    const { data: stock } = await this.axios.get<Stock>(this.getPath('show'), {
      params: { id }
    })
    return stock
  }
}

export const StocksService = new StocksServiceClass('api/v1/stocks')
