import { BaseApi } from '~/logic/core/BaseApi'

import {
  ProfileUpdateRequestPayload,
  ProfileUpdateResponse,
  UserUpdateContactDataPayload,
  UserUpdatePasswordPayload
} from '.'

export class _UsersApi extends BaseApi {
  update(options: ProfileUpdateRequestPayload) {
    return this.put<ProfileUpdateResponse>('update', options)
  }

  updatePassword(options: UserUpdatePasswordPayload) {
    return this.put<{}>('update/password', options)
  }

  updateContactData(options: UserUpdateContactDataPayload) {
    return this.put<{}>('update/contact', options)
  }
}
