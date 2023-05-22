import plural from 'plural-ru'

import { BaseService } from '../../shared/base.service'
import { User, UserProfileUpdateRequestParams } from './user.types'

class UserServiceClass extends BaseService {
  async getCurrentUser() {
    const { data } = await this.axios.get<User>(this.getPath('profile/show'))
    return data
  }

  async updatePersonalInfo(data: UserProfileUpdateRequestParams) {
    const response = await this.axios.patch(
      this.getPath('profile/update'),
      data
    )
    return response.data
  }

  getFormattedUserCoinCount(user: User) {
    return [
      user.coins_count ?? 0,
      plural(user.coins_count ?? 0, '', '', '')
    ].join(' ')
  }
}

export const UserService = new UserServiceClass('api/v1/user')
