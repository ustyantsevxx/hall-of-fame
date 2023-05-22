import { BaseService } from '~/logic/core/base.service'
import { joinNotEmpty } from '~/logic/utils/strings'

class _CustomersService extends BaseService {
  async getAllCustomers() {
    const response = await this.axios.get(this.getPath('all'))
    return response?.data
  }

  async getPaginatedCustomers({ page, q, show_archived } = {}) {
    const response = await this.axios.get(this.getPath(), {
      params: {
        page: page ?? 1,
        q: q || undefined,
        show_archived: show_archived ? 1 : 0
      }
    })
    return response?.data
  }

  async createCustomer({ name, surname, login, password }) {
    try {
      const { status, data } = await this.axios.post(this.getPath(), {
        name,
        surname,
        login,
        password
      })

      return {
        success: status === 201,
        data
      }
    } catch (error) {
      return {
        success: false,
        errors: error.response?.data?.errors
      }
    }
  }

  async updateCustomer(customerId, { name, surname, login, password }) {
    try {
      const { status, data } = await this.axios.put(this.getPath(customerId), {
        name,
        surname,
        login,
        password
      })

      return {
        success: status === 204,
        data
      }
    } catch (error) {
      return {
        success: false,
        errors: error.response?.data?.errors
      }
    }
  }

  async updateCustomerNotes(customerId, customerNotes) {
    try {
      const { status, data } = await this.axios.patch(
        this.getPath(customerId, 'customer-notes'),
        { customer_notes: customerNotes || null }
      )

      return {
        success: status === 204,
        data
      }
    } catch (error) {
      return {
        success: false,
        errors: error.response?.data?.errors
      }
    }
  }

  async updateSupportContacts(customerId, supportContacts) {
    try {
      const { status, data } = await this.axios.patch(
        this.getPath(customerId, 'support-manager-contacts'),
        { support_manager_contacts: supportContacts || null }
      )

      return {
        success: status === 204,
        data
      }
    } catch (error) {
      return {
        success: false,
        errors: error.response?.data?.errors
      }
    }
  }

  async getCustomerProjects(customerId) {
    const response = await this.axios.get(this.getPath(customerId, 'projects'))
    return response?.data
  }

  formatCustomerName(customer) {
    return joinNotEmpty(customer.name, customer.surname) || '—'
  }

  async getCustomerById(customerId) {
    const response = await this.axios.get(this.getPath(customerId))
    return {
      id: customerId,
      ...response?.data
    }
  }

  async archiveCustomer(customerId) {
    const { status } = await this.axios.post(
      this.getPath(customerId, 'archive')
    )

    return { success: status === 204 }
  }

  async unarchiveCustomer(customerId) {
    const { status } = await this.axios.post(
      this.getPath(customerId, 'restore')
    )

    return { success: status === 204 }
  }

  async deleteCustomer(customerId) {
    const { status } = await this.axios.post(this.getPath(customerId, 'delete'))
    return { success: status === 204 }
  }
}

export const CustomersService = new _CustomersService('api/v1/customers')
