import { BaseService } from '~/logic/core/BaseService'
import { _UsersApi } from '~/logic/modules/users/UsersApi'
import { handleServerResponse } from '~/logic/utils/api'
import { xDayjs } from '~/logic/utils/datetime'

import {
  UserProfileUpdateOptions,
  UserUpdateContactDataOptions,
  UserUpdatePasswordOptions
} from '.'

export class _UsersService extends BaseService<_UsersApi> {
  getContractName(options: { contractNumber: string; startDate: number }) {
    if (options.contractNumber && options.startDate) {
      return `№ ${options.contractNumber} xx ${xDayjs
        .unix(options.startDate)
        .format('DD.MM.YYYY')}`
    }
  }

  async updateProfile(options: UserProfileUpdateOptions) {
    const response = await this.api.update({
      first_name: options.firstName,
      last_name: options.lastName,
      patronymic: options.patronymic
    })

    return response.status === 200
      ? {
          success: true,
          user: response.data
        }
      : {
          success: false
        }
  }

  async updatePassword(options: UserUpdatePasswordOptions) {
    const response = await this.api.updatePassword({
      password_old: options.passwordOld,
      password_new: options.passwordNew,
      password_new_confirmation: options.passwordNewConfirmation
    })

    return handleServerResponse<{}>(response)
  }

  async updateContactData(options: UserUpdateContactDataOptions) {
    const response = await this.api.updateContactData({
      email: options.email,
      phone: options.phone,
      contact_person: options.contactPerson
    })

    return handleServerResponse<{}>(response)
  }
}
