import { BaseService } from '~/logic/core/base.service'

class _MsmsService extends BaseService {
  async getAllMsms() {
    const response = await this.axios.get(this.getPath('all'))
    return response?.data
  }

  async getMsmById(msmId) {
    const response = await this.axios.get(this.getPath(msmId))
    return response?.data
  }

  async getPaginatedMsms({
    page = 1,
    order_by = 'msm.name',
    order_direction = 'desc',
    q
  } = {}) {
    const response = await this.axios.get(this.getPath(), {
      params: { page, q, order_by, order_direction }
    })
    return response?.data
  }

  async createMsm(msmData) {
    try {
      const { status } = await this.axios.post(this.getPath(), msmData)
      return {
        success: status === 201 || status === 200
      }
    } catch (error) {
      return {
        success: false,
        errors: error.response?.data?.errors
      }
    }
  }

  async updateMsmSetup(msmId, newMsmSetupData) {
    try {
      const { status } = await this.axios.patch(
        this.getPath(msmId, 'setup'),
        newMsmSetupData
      )

      return {
        success: status === 204
      }
    } catch (error) {
      return {
        success: false,
        errors: error.response?.data?.errors
      }
    }
  }

  async updateMsmInfo(msmId, newMsmInfoData) {
    try {
      const { status } = await this.axios.patch(
        this.getPath(msmId, 'info'),
        newMsmInfoData
      )

      return {
        success: status === 204
      }
    } catch (error) {
      return {
        success: false,
        errors: error.response?.data?.errors
      }
    }
  }

  async updateMsmName(msmId, newName) {
    const { status } = await this.axios.patch(this.getPath(msmId), {
      name: newName
    })
    return { success: status === 204 }
  }
}

export const MsmsService = new _MsmsService('api/v1/msms')
