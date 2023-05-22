import { AppContainer } from '~/logic/core/app-container'
import { BaseService } from '~/logic/core/base.service'
import {
  TRACE_REQUEST_ACTIONS,
  TRACE_REQUEST_ACTIONS_BY_STATUS,
  TRACE_REQUEST_COMPLEXITY_LEVELS
} from '~/logic/modules/trace-requests/trace-requests.constants'
import { downloadLogCSVFile } from '~/logic/utils/export'

const comeToTraceRequestCreateFormFromCookieKey =
  'x-come-to-create-trace-request-form-from'

const actionEndpoints = {
  [TRACE_REQUEST_ACTIONS.CANCEL]: 'cancel',
  [TRACE_REQUEST_ACTIONS.RETURN]: 'return',
  [TRACE_REQUEST_ACTIONS.UNARCHIVE]: 'unarchive'
}

class _TraceRequestsService extends BaseService {
  saveComeToCreateTraceRequestFormFrom(path) {
    AppContainer.cookies.set(comeToTraceRequestCreateFormFromCookieKey, path)
  }

  getComeToCreateTraceRequestFormFrom() {
    return AppContainer.cookies.get(comeToTraceRequestCreateFormFromCookieKey)
  }

  async getRequests({
    page,
    q,
    order_by,
    show_archived,
    order_direction,
    status
  } = {}) {
    const response = await this.axios.get(this.getPath(), {
      params: {
        page: page ?? 1,
        q: q || undefined,
        order_by: order_by ?? 'from',
        order_direction: order_direction ?? 'desc',
        show_archived: show_archived ? 1 : 0,
        status
      }
    })
    return response?.data
  }

  async getRequest(requestId) {
    const response = await this.axios.get(this.getPath(requestId))
    return response?.data
  }

  async getFilters(traceRequestId) {
    const response = await AppContainer.axios.get(
      this.getPath(traceRequestId, 'filters')
    )
    return response?.data
  }

  async deleteRequest(id) {
    const { status } = await this.axios.delete(this.getPath(id))
    return { success: status === 200 }
  }

  async archiveRequest(requestId) {
    const { data } = await this.axios.post(this.getPath(requestId, 'archive'))

    return { updatedRequest: data }
  }

  async callPrimaryActionByRequestStatus(requestId, status) {
    const postEndpoint = this.getPath(
      requestId,
      actionEndpoints[TRACE_REQUEST_ACTIONS_BY_STATUS[status].primary]
    )

    try {
      const { data } = await this.axios.post(postEndpoint)
      return { success: true, updatedRequest: data }
    } catch {
      return { success: false }
    }
  }

  async calculateComplexity(body) {
    if (body.variables.length === 0) {
      return { value: 0, level: TRACE_REQUEST_COMPLEXITY_LEVELS.LOW }
    }

    const { data } = await this.axios.post(this.getPath('complexity'), body)

    return {
      value: data.complexity,
      level: data.level
    }
  }

  async getChartData({ requestId, variables }) {
    const { data } = await this.axios.post(this.getPath(requestId), {
      data: variables
    })

    return data.data
  }

  async exportCSV(requestId, variables) {
    const response = await this.axios.post(this.getPath(requestId, 'export'), {
      data: variables
    })
    downloadLogCSVFile(`Trace_log_${requestId}`, response.data)
  }

  async createTraceRequest(requestData) {
    const { status, data } = await this.axios.post(this.getPath(), requestData)

    return {
      success: status === 201,
      errors: data
    }
  }
}

export const TraceRequestsService = new _TraceRequestsService(
  'api/v1/trace-requests'
)
